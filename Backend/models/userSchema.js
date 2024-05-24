import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide your name"],
        minLength : [2,"Name should contain atleast 2 Character"],
        maxLength : [20,"Name should not exceed 20 Character"],
    },
    email :{
        type : String,
        required :[true,"Please provide your email"],
        validate :[validator.isEmail,"Please provide valid email"],
    },
    phone :{
        type:Number,
        required :[true,"Please provide your number"],
    },
    password : {
        type : String,
        required :[true,"Please provide your password"],
        minLength:[8,"Password Should contain atleast 8 Character"],
        maxLength:[32,"Password should contain atmost 32 Character"],
        select :false
    },
    role :{
        type :String,
        required :[true,"Please provide your role"],
        enum :["Job Seeker","Employer"],
    },
    createdAt :{
        type:Date,
        default :Date.now,
    }
});

//Hasing the password.

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//Comparing the saved and entered password for login.

userSchema.methods.comparePassword= async function(enteredPassword){
    // console.log(typeof(enteredPassword));
    // console.log(typeof(this.password));
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id : this._id},process.env.jwt_secret_key,{
        expiresIn: process.env.jwt_expire ,
    });
}

//we are creating a user model here.
export const User=mongoose.model("user",userSchema);
