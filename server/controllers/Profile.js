const User=require("../models/User");
const Profile=require("../models/Profile");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile=async (req,res) =>{
    try{
    //   fetch data 
     const {dateOfBirth="",about="",contactNumber,gender}=req.body;
    //fetch userId 
    const id=req.user.id;
    // validation 
    if(!contactNumber||!about||!id)
    {
        return res.status(401).json({
            success:false,
            message:" All fields are required"
        })
    }
    // find profile
    const userDetails= await User.findById(id);
    const profileId=userDetails.additionalDetails;
    // update profile
    const profileDetails= await Profile.findById(profileId);
    profileDetails.dateOfBirth=dateOfBirth;
    profileDetails.contactNumber=contactNumber;
    profileDetails.about=about;
    profileDetails.gender=gender;

    await profileDetails.save();
    // return response
    return res.status(201).json({
        success:true,
        message:"Profile updated successfuly",
        profileDetails
    })
    } catch(error){
       return res.status(500).json({
        success:false,
        message:"profile creation unsuccessful"
       })
    }
}

// delete Account 

exports.deleteAccount = async (req,res) =>{
    try{
        // get id 
        const id=req.user.id;
        // validation 
        const userDetails= await User.findById(id);

        if(!userDetails)
        {
            return res.status(400).json({
                success:false,
                message:" User not found "
            })
        }
        // profile delete

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
                // TODO: unenroll user from all enrolled course
          const allCourseId=userDetails.courses;

          allCourseId.forEach(async  course => {
           const res= await Course.findByIdAndUpdate(course,{$pull:{courseEnrolled:id}})
          });
        // delete User
        await User.findByIdAndDelete(id);

        // rteurn res
        return res.status(201).json({
            success:true,
            message:"User is deleted successfully"
        })
        
    } catch(error){
        
        return res.status(500).json({
            success:false,
            message:" Deletion unsuccessfull"
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
     console.log(displayPicture,userId);
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image.secure_url);
      console.log("HEMLO")

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getAllUserDetails= async (req,res) =>{
    try{
        //   fetch data 
         const id=req.user.id;
        //  validtae
        const userDetails=await User.findById(id).populate("additionalDetails").exec();

        if(!userDetails)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid User"
            })
        }
        // return res
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userDetails
        })
    } catch(error){
       
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};