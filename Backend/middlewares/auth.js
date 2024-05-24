import { catchAsyncError } from "./catchAsyncError.js";
import errorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAutheroized=catchAsyncError(async (req,res,next) =>{
    const {token}=req.cookies;
    if(!token){
        return next(new errorHandler("User is not Authorized",400));
    }
    const decode=jwt.verify(token,process.env.jwt_secret_key);

    req.user=await User.findById(decode.id);
    next();
})