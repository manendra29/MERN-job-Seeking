import mongoose from "mongoose";

const jobSchema= new mongoose.Schema({
    title : {
        type :String,
        required : [true,"Enter the title of job!"],
        minLength :[3,"Title should contain atleast 3 characters"],
        maxLength :[30,"Title should not exceed 30 characters"],
    },
    description :{
        type :String,
        required : [true,"Enter the job description"],
        minLength :[50,"Job description should contain atleast 50 characters"],
        maxLength :[350,"Job description should not exceed 350 character"],
    },
    category : {
        type : String,
        required : [true,"Enter the job category"],
    },
    country : {
        type :String,
        required : [true,"Enter the country of the job"],
    },
    city :{
        type :String,
        required :[true,"Enter the city of job place"],
    },
    location : {
        type :String,
        required : [true,"Enter the exact location of the job place"],
        minLength : [50,"Location must contains 50 character"],
    },
    fixedSalary : {
        type : Number,
        minLength :[4,"Salary must conatains atleast 4 digits"],
        maxLength : [9,"Salary must not exceed 9 digits"],
    },
    salaryFrom : {
        type : Number,
        minLength :[4,"Salary must conatains atleast 4 digits"],
        maxLength : [9,"Salary must not exceed 9 digits"],
    },
    salaryTo :{
        type : Number,
        minLength :[4,"Salary must conatains atleast 4 digits"],
        maxLength : [9,"Salary must not exceed 9 digits"],
    },
    expired :{
        type:Boolean,
        default :false,
    },
    createdOn :{
        type: Date,
        default : Date.now,
    },
    postedBy :{
        type :mongoose.Schema.ObjectId,
        ref : "User",
        required :true
    }
});

export const Job=new mongoose.model("Job",jobSchema);