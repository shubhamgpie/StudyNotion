const { default: mongoose } = require("mongoose");
const {instance}= require("../config/razorpay");
const Course= require("../models/Course");
const User= require("../models/User");
const mailSender= require("../utils/mailSender");
// template exports is left

// capture the payment and initaitae the rzorpay order

exports.capturePayment= async (req,res) =>{
    // fetch id 
    const {course_id}= req.body;
    const userId=req.user.id;
    // validaton 
    // valid course ID
    if(!course_id){
        return res.status(400).json({
            success:false,
            message:"Please Provide valid course ID"
        })
    }
    let course;
    // valid Course Details 

    try{
        course= await Course.findById(course_id);
        if(!course)
         return res.status(401).json({
            success:false,
            message:"Could not find the course"
         })
           // Validate if user is already enrolled 

         const uid=new mongoose.Types.ObjectId(userId);
       
         if(course.studentsEnrolled.includes(uid)){

            return res.status(400).json({
                success:false,
                message:"Student is already enrolled ",
            })
         }

    } catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
            
    }

    // order create
    const amount=course.price;
    const currency="INR";

    const options={
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId
        }
    }

    try{
        // initiate the payment using razorpay
        const paymentResponse= await instance.orders.create(options);

        // return response 
        return res.status(201).json({
            success:true,
            courseName:course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        })

    } catch(error){
      return res.status(500).json({
        success:false,
        message:"Could not initiate order",
   

      })
    }
    //  return response 
}


// verify signature of razorpay and server 

exports.verifySignature= async (req,res) =>{
    // jo server pe secret h and jo response se aaya h , we have to match both of them 
    const webhookSecret ="12345678";
    const signature = req.headers["x-razorpay-signature"];
    
    const shaSum = crypto.createHmac("sha256",webhookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("Hex");

    if(signature===digest)
    {
        console.log("Payment is authorized");

        const {courseId,userId}= req.body.payload.payment.entity.notes;
        try{
            // fulfill the action 

            // find the course and enroll the student in it 
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},{
                    $push:{studentsEnrolled:userId}
                },{new:true}
            );

            if(!enrolledCourse)
            {
                return res.sttaus(500).json({
                    success:false,
                    message:'Course bnot found'
                })
            };

            console.log(enrolledCourse);

            // find the student and add course in the courses 
            const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{
                $push:{courses:courseId}
            }, {new:true});

            console.log(enrolledStudent);

            // Now we have to email the student 
              const emailResponse=await mailSender(enrolledStudent.email,"Congrats from codehelp","Congrats you are onboared into new code help Course")
              
            //   return response 
            return res.status(200).json({
                success:true,
                message:"signature Verified and course added"
            })
        } catch(error){
             console.error(error);

             return res.status(500).json({
                success:false,
                message:error.message
             })
        }
    } 

    else{

        return res.status(400).json({
            success:false,
            message:"Invalid signature"
        })
    }
}
