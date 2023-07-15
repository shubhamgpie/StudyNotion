const Course=require("../models/Course");
const Category = require("../models/Category");
const User= require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

// create courses

exports.createCourse= async(req,res) =>{
    try{

    // fetch all data 
    const {courseName, courseDescription,whatYouWillLearn, price , category }=req.body;
    // get thumbnail
    const thumbnail= req.files.thumbnailImage;

    // validation 
    if(!courseName||!courseDescription||!whatYouWillLearn||!category||!price||!thumbnail)
    {
        return res.status(400).json({
            success:false,
            message:"All fields arer required"
        })
    }

    // if (!status || status === undefined) {
    //     status = "Draft";
    // }

    // check for instructor 
     const userId=req.user.id;

     const instructorDetails=await User.findById(userId);
    //  now we will get user details 
    console.log("Instructor Details",instructorDetails);

    if(!instructorDetails)
    {
        res.status(404).json({
            success:false,
            message:"Instructor details not found "
        })
    }

    // check given category is valid or not 
    const categoryDetails=await Category.findById(category);
     
    if(!categoryDetails){
        return res.status(404).json({
            sucess:false,
            message:"Category details not found "
        })
    }

    // upload image to cloudinary 

    const thumbnailimage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
       
    //  create an entry for new course 
    const newCourse =await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn,
        price,
        category,
        thumbnail:thumbnailimage.secure_url
    });
    
    // Now add the new course to user schema of instructor
   const addTouser= await User.findByIdAndUpdate(userId,{$push:{courses:newCourse._id}}, {new:true});

        // Add the new course to the Categories
	const updation=	await Category.findByIdAndUpdate(
			 category ,
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

    return res.status(201).json({
        success:true,
        message:"Course Created successfully",
        data:newCourse
    })
    } catch(error){
        console.error(error);
       return res.status(500).json({
        success:false,
        message:"Failed to Create a course"
    })
    }
}

// get all course handler func
exports.getAllCourses =async (req,res)=>{
    try{

        const allCourses=await Course.find({},{ courseName:true,
        price:true,
    thumbnail:true,
    instructor:true,
    ratingAndReviews:true,
    studentsEnrolled:true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses found successfully"
            , allCourses
        })
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data ",
            error:error.message
        })
    }
}

// get all course details ->entire details ->subsection ->section ->no object id

exports.getCourseDetails=async(req,res)=>{
    try{
        // get course id 
        const {courseId}= req.body;
        
            // find course details and we have to populate 

        const courseDetails=await Course.find({_id:courseId})
                                             .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                }

                                             }).populate("category")
                                             .populate("ratingAndReviews")
                                             .populate({
                                                    path:"courseContent",
                                                    populate:
                                                        {
                                                            path:"subSection",
                                                        }
                                             }).exec(); 
        
        // validation 
        if(!courseDetails){
           return res.status(500).json({
            success:false,
            message:`Could not find the course with ${courseId}`
           })
        }   
        
        //success
        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            courseDetails
        })
                                             

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
           })

    }
}

// exports.deleteCourse  = async(req,res) =>{

// }
