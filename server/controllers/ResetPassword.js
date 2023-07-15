const User=require("../models/User");
const mailSender= require("../utils/mailSender");
const bcrypt= require("bcrypt");
const crypto=require("crypto")

// resetPasswordToken ->mail send karne ka tokn 

exports.resetPasswordToken= async (req,res) =>{

    try{
         // get email from req ki body
    const email=req.body.email;
    //  check user for this email , email user
    const user= await User.findOne({email:email});

    if(!user){
        return res.json({success:false,
        message:'Your Email is not registered with us '})
    }
    // generate Token
    const token= crypto.randomUUID()
    // update user by adding token and expiration time 
    const updatedDetails= await User.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires: Date.now() + 5*60*1000
    },{new:true});

    // create link for frontend 
    const url=`http://localhost:3000/update-password/${token}`;
    // send email containing link  
    await mailSender(email," Password reset Link",
              `Password Reset link : ${url}`);

     return res.status(201).json({
        success:true,
        message:"Email sent successfully"
     })      
 
    } catch(error){
         
        console.log(error);

        return res.staus(500).json({
            success:false,
            message:"Something went wrong while reseting the password"
        })
    }
  

}

// reset password->jo DB me entry karenge 

exports.resetPassword= async (req,res)=>{
  try{
    // data fetch  
    const {password, confirmPassword, token }= req.body;

    // validation  
    if(password!==confirmPassword)
    {

        return res.status(401).json({
            success:false,
            message:'Password not matching'
        })
    };
    // get userDetails from db using token 

    const userDetails=await User.findOne({token:token});

    // if no entry-> invalid token 
    if(!userDetails){
        return res.json({
            success:false,
            message:"Token is invalid"
        })
    }
    //  check whether time is alright or not 
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.status(401).json({
            success:false,
            message:" token is expired, pls regenerate your token "
        })
    }
    // hash pwd
    const hashedPasswrd=await bcrypt.hash(password,10);
    // password update 
    await User.findOneAndUpdate({token:token},{password:hashedPasswrd},{new:true});
    //send response  
    return res.status(200).json({
        success:true,
        message:'Password reset successful'
    })

  } catch(error){
    return res.status(500).json({
        success:false ,
        message:'Password reset unsuccessful'
    })

  }
     
} 