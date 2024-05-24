import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import errorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
export const register=catchAsyncError( async(req,res,next) =>{
    const {name,email,phone,role,password}=req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new errorHandler("Fill the complete form!"));
    }
    const isEmail =await User.findOne({email});
    if(isEmail){
        return next(new errorHandler("Email already Exists"));
    }
    const user=await User.create({
        name,
        email,
        phone,
        role,
        password,
    });
   sendToken(user,200,res,"User Registered Successfully");
});


export const login=catchAsyncError(async (req,res,next) =>{
    const {email ,password,role}=req.body;
    if(!email || !password || !role){
        return next(new errorHandler("please provide email ,password, role"));
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new errorHandler("invalid email or password!",400));
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new errorHandler("invalid email or password",400));
    }
    if(user.role !== role){
        return next(new errorHandler("No user is found of this role"));
    }
    sendToken(user,200,res,"User Login Successfully");
});

export const logout=catchAsyncError(async (req,res,next) =>{
    res.status(201).cookie("token","",{
        httpOnly: true,
        expires :new Date(Date.now()),
    }).json({
        success : true,
        message : "User logged out Successfully!"
    })
})


export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });