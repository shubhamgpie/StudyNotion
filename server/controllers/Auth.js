const User=require("../models/User");
const OTP= require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
require("dotenv").config();
// sendOTP

exports.sendOTP= async (req,res)=>{
   try{    
          //    fetch email from req ki body
    const {email}=req.body;

    // check if user is already present

    const checkUserPresent= await User.findOne({email});

    // if user already exist, send a response 
    if(checkUserPresent)
    {
        return res.status(400).json({
            success:false,
            message:"the user already exist"
        })         
    }


    // generate otp
    let otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    });

    let result=await OTP.findOne({otp:otp});
    
    while(result)
    {
         otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
    
        // more optimized way can be used 
         result=await OTP.findOne({otp:otp});
    }

    // now we get an otp that is uniqu in our db 
    
    const otpPayload={email,otp};
    
    const otpBody= await OTP.create(otpPayload);

    // return response 

    res.status(200).json({
        success:true,
        message:"Otp created successfully",
        otp
    })
   } catch(error){
       console.log(error)
    res.status(400).json({
        success:false,
        message:"Otp creation unsuccessful",
        error_message:error.message
    })
   }

}
// signUp
exports.signUp= async (req,res)=>{
    // data fetch from req body
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType, active,
            status,
            contactNumber,otp
          }= req.body;
    
        // validate data
         
        if(!firstName||!lastName||!email||!password||!confirmPassword||!otp)
        {
            return res.status(403).json({
                success:false,
                message:"all fields are not filled"
            })
        }
        // 2 password ko match  karlo
        if(password!==confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"password and confirm password do not match please try again "
            })
        }
        // check if user exist or not 
        const existingUser=await User.findOne({email});
    
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }
    
        // find most recent otp for the user 
        const recentOtp= await OTP.find({email:email}).sort({createdAt:-1}).limit(1)  ;
        // it is possible that we gt multiple entry
        // we weant to get the recent entry 
        console.log(recentOtp.otp)
     
        // validate otp
           if(recentOtp.length==0)
           {
            // otp not found 
    
            return res.status(400).json({
                success:false,
                message:"Otp not found "
            })
           }
          console.log(recentOtp);

            if(otp!=recentOtp[0].otp)
           {
            // invalid otp
    
            return res.status(400).json({
                success:false,
                message:"otp does not match ",otp
            })
           }
        // hash password 
    
        const hashedPassword=await bcrypt.hash(password,10);
    
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
        // entry created in db 
    
        
        const profileDetails=await Profile.create({gender:null,dateOfBirth:null,about:null,contactNumber:null});
        // creating entry
        
        const user= await User.create({
            firstName,
            lastName,
            email,
            active,
            status,
            password:hashedPassword,
            accountType,
            contactNumber,additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
         });
        // return successful response 
        res.status(200).json({
            success:true,
           user,
            message:"Message is registered succesfully"
        })
    } catch(error)
    {
            console.log(error);

            res.status(400).json({
                success:false,
                message:"User was not able to be registered successfully"
            })
    }
      
}

// login

exports.login= async (req,res)=>{
    try{
        //  get data from req body 

        const { email, password}=req.body;

        //  validate data
    if(!email||!password){
        return res.status(403).json({
            success:false,
            message:'All fields are required , pls try again '
        })
    }
        // user check if it exist or not 
        const user= await User.findOne({email:email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:" User is not registered,pls register"
            })
        }
 
        // check password
        if(await bcrypt.compare(password,user.password)){

            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
                const token=jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn:"2h"});
                user.token=token;
                user.password=undefined;

                // create a cookie 
                          const options={
                            expires: new Date(Date.now()+ 3*24*60*60*1000),
                            httpOnly:true,
                          }
                res.cookie("token",token,options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"Token loaded successfully"

                })
        }

        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

        // ab agar sab sahi h toh token generate kardo 
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failure "
        })

    }
}
// ChangePassword
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};

