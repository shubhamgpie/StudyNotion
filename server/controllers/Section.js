const Section= require("../models/Section");
const Course=require("../models/Course");

exports.createSection= async (req,res) =>{
    try{
        //  data fetch   
        const {sectionName,courseId}=req.body;
        // data validation 

        if(!sectionName||!courseId)
        {
            return res.status(401).json({
                success:false,
                message:"Missing properties"
            })
        }

        // validate if course is valid or not
        const validateCourse=await Course.findById(courseId);
        if(!validateCourse){
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }
        // create section 
        const newSection=await Section.create({sectionName});
    // update course with section OjectId
      const updatedCourse= await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},
        {new:true}).populate("courseContent").exec();

        // return res

        return res.status(201).json({
            success:true,
            message:"Section created successfully",
            updatedCourse
        })

    } catch(error){
  
            console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error while creating sub-section "
        })
    }
}

exports.updateSection= async (req,res)=>{
    try{
        // fetch data 
        const {sectionName,sectionId}=req.body;
        // validarte it 
        if(!sectionName||!sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"Missing details"
            })
        }
        // find and update 
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
       
        // return res

        return res.status(201).json({
            success:true,
            message:"Section updated successfully",
            section
        })
   
    } catch(error)
    {
         return res.status(500).json({
            success:false,
            message:"Section updation failed"
         })
    }
}
exports.deleteSection= async (req,res)=>{
    try{
        // fetch data
        const {sectionId}=req.body;
        // find by id and delete 
          const section=await Section.findByIdAndDelete(sectionId);
        // return res

        return res.status(201).json({
            success:true,
            message: " Section deleted successfully",

        })

    } catch(error){
     console.error(error);
     return res.status(500).json({
        success:false,
        message: " Section deletion unsuccessful",

    })
    }
}