const Category=require("../models/Category");

// create tags handler funcn 

exports.createCategory= async (req,res)=>{
            try{
                
                // fetch data
                const {name,description}=req.body;
        // validation
        if(!name||!description)
        {
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }

        // create entry in db 

        const categoryDetails=await Category.create({name:name,description:description});
        console.log(categoryDetails);

        // return response 

        return res.status(200).json({
            success:true,
            message:"Category creatd sucessfully"
        })

            } catch(error){
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
}

exports.showAllcatgeories=async (req,res)=>{
    try{
        // imp method for taking only those entries that have both name and description are compulsory
          const allCategory= await Category.find({},{name:true,description:true});

          res.status(200).json({
            success:true,
            message:"All tags returned successfully"
            , allCategory

          })
    } catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}