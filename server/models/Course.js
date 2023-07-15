const mongoose=require("mongoose");
const Section = require("./Section");
const RatingAndReview = require("./RatingAndReview");
const Category = require("./Category");
const User = require("./User");

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String
    },
    // timeDuration:{
    //     type:String, 
    //     required:true
    // },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    tag: {
        type:[String],
        required:true
    },
    category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
     studentsEnrolled:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        ],
        instructions: {
            type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
    

});

module.exports= mongoose.model("Course",courseSchema);