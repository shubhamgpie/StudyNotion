const Course=require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const User= require("../models/User");
// create rating 

exports.createRating= async(req,res) =>{
    try{
        // get user Id
        const userId=req.user.id;
        // fetch data of course , review, rating 
        const { rating,review, courseId}= req.body;
        // validate whether student is enrolled or not
        const courseDetails = await   Course.findOne({_id:course_id,
                         studentsEnrolled:{$elemMatch : {$eq : userId}}}) ;

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Student not enrolled"
            })
        }

        const alreadyReviewed=await  RatingAndReview.findOne({
            user:userId,
            course:courseId
        });
                // check if user already reviewed the course 


        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"Rating is already given "
            })
        }
        //  create a review and rating 

        const ratingReview=await RatingAndReview.create({
            rating,review, course:courseId,
            user:userId
        })
        // attach this on course 
        await Course.findByIdAndUpdate(courseID,{$push:{
            ratingAndReviews:ratingReview._id
        }},{new:true});

        // return response 
        return res.status(200).json({
            success:true,
            message:"Course rated successfully",
            ratingReview
        })

    } catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// get average rating 
exports.getAverageRating= async(req,res) =>{
        try{
    //  get CourseId
    const courseId=req.body.courseId;
    // calculate Avg rating 

    const result= await RatingAndReview.aggregate([
        {
            $match:{
                course: new mongoose.Types.ObjectId(courseId),
            }
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"}
            }
        }
    ])

    // return
    if(result.length>0){

        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating
        })
    }

    return res.status(200).json({
        success:true,
        message:"Average rating is 0, no rating is given"
    })

        }catch(error){
            
            console.error(error);
            return res.status(500).json({
                succes:false,
                message:error.message
            })
        }
}

// get all ratings-> not course specific
exports.getAllRating= async(req,res) =>{
    try{
        const allReviews=await RatingAndReview.find({}).sort({rating :"desc"})
                                                             .populate({
                                                                path:"user",
                                                                select:"firstName lastName email image "
                                                             })
                                                             .populate({
                                                                path:"course",
                                                                select:"courseName"
                                                             }).exec();
         return res.status(200).json({
            success:true,
            allReviews
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            succes:false,
            message:error.message
        })
    }
}