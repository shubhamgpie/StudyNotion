const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

// auth
exports.auth=async (req,res,next)=>{
    try{
    //     we will verify json web token for auth
    const token=req.cookies.token||req.body.token||req.header("Authorisation").replace("Bearer ","");

    // if token missing , return response
    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:"Token is missing"
        })
    }

    // verify token 
     try{
         const decode= jwt.verify(token,process.env.JWT_SECRET);
         console.log(decode);
         req.user=decode;
     } catch(err){
            // verification - isssue 
            return res.status(401).json({
                success:false,
                message:'token is invalid '
            }) 
     }
        next();

    } catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating token  '
        }) 

    }
}

// isStudent

exports.isStudent= async (req,res,next)=>{

    //  we already have a role in our req bcoz we have passed it at some point of time in our code 
    try{
        
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for student only'
            })
        }
        next();


    } catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified'
        }) 
    }
}

// isInstructor
exports.isInstructor= async (req,res,next)=>{

    //  we already have a role in our req bcoz we have passed it at some point of time in our code 
    try{
        
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for instructor only'
            })
        }
        next();


    } catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified'
        }) 
    }
}

// isAdmin
exports.isAdmin= async (req,res,next)=>{

    //  we already have a role in our req bcoz we have passed it at some point of time in our code 
    try{
        
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only'
            })
        }
        next();

    } catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified'
        }) 
    }
}