const mongoose=require("mongoose");
const Profile = require("./Profile");
const Course = require("./Course");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true,
    },
     additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
     },
     courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
     ],
     token:{
        type:String
     },
     resetPasswordExpires:{
        type:Date
     }, 
     image:{

        type:String,
        requuired:true
     },
     courseProgress:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }  
        ]


},{timestamps: true});

module.exports= mongoose.model("User",userSchema);