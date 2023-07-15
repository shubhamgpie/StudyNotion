const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

// create subsection 
exports.createSubSection=async (req,res)=>{
    try{
    //    fetch data from body
    const {title,timeDuration,description,sectionId}=req.body;
    // extract video/file
   const video=req.files.video;
    // validate data 
    if(!sectionId||!timeDuration||!title||!description||!video)
    {
        return res.status(400).json({
            success:false,
            message:"Missing fields"

        })
    }
    const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);


    // create sub secton 
    const SubSectionDetails=await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        videourl:uploadDetails.secure_url,
        description:description
    })
    console.log("Creation of sub Sectiron success",SubSectionDetails)
    // add subsection to section 
    const updatedSection=await Section.findByIdAndUpdate(sectionId,{$push:{subSection:SubSectionDetails._id}},{new:true});
    // TODO : log updated section here after adding populate query
    // return res   
    return res.status(200).json({
        success:true,
        message:"Sub section created successfully ",
        updatedSection
    });
    }catch(error)
    {
           return res.status(500).json({
            success:false,
            message:"SUB Section creation failed"
           })
    }
}


// Update subSection 
exports.updateSubSection=async (req,res)=>{
    try{
    //    fetch data from body
    const {title,timeDuration,description,subSectionId}=req.body;
    // extract video/file
    const video=req.files.video;
    // validate data 

    if(!subSectionId||!timeDuration||!title||!description||!video)
    {
        return res.status(400).json({
            success:false,
            message:"Missing fields"

        })
    }
    // upload to cloudinary  and get link 
    const uploadDetails= await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
    // create sub secton 
    const SubSectionDetails=await SubSection.findByIdAndUpdate(subSectionId,{
        title:title,
        timeDuration:timeDuration,
        videourl:uploadDetails.secure_url,
        description:description
    })
    
    return res.status(200).json({
        success:true,
        message:"Sub section updated successfully ",
    });
    }catch(error)
    {
           return res.status(500).json({
            success:false,
            message:"Section updation failed"
           })
    }
}


// delete SubSection 
exports.deleteSubSection=async (req,res)=>{
    try{
    //    fetch data from body
    const {subSectionId}=req.body;
    
    if(!subSectionId)
    {
        return res.status(400).json({
            success:false,
            message:"Missing fields"

        })
    }

    const SubSectionDetails=await SubSection.findByIdAndDelete(subSectionId)
   
    return res.status(200).json({
        success:true,
        message:"Sub section deleted successfully ",
        
    });
    }catch(error)
    {
           return res.status(500).json({
            success:false,
            message:"Section deletion failed"
           })
    }
}
