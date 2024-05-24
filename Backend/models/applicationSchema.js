import mongoose from "mongoose";
import validator from "validator";

const applicationSchema=new mongoose.Schema({
    name : {
        type :String,
        required : [true,"Enter your name !"],
        minLength :[3,"name should contain 3 character atleast"],
        maxLength :[30,"name should not exceed more than 30 charactrers !"],
    },
    email :{
        type :String,
        required :true,
        validator :[validator.isEmail,"Enter valid email"],
    },
    coverLetter : {
        type :String,
        required :[true,"Enter the valid cover Letter"]
    },
    phone : {
        type :Number,
        required :[true,"Please provide your phone number!"],
    },
    address :{
        type :String,
        required : [true,"Please provide your address"]
    },
    resume :{
       public_id :{
        type :String,
        required : true
       },
       URL :{
        type:String,
        required : true
       }
    },
    applicantId :{
        user :{
            type : mongoose.Schema.Types.ObjectId,
            required :true
        },
        role :{
            type :String,
            enum :["Job Seeker"],
            required :true,
        }
    },
    employerId :{
        user :{
            type : mongoose.Schema.Types.ObjectId,
            required :true
        },
        role :{
            type :String,
            enum :["Employer"],
            required :true,
        }
    }
});

export const Application=new mongoose.model("Application",applicationSchema);