 
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import errorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications= catchAsyncError ( async(req,res,next) =>{
const {role} =req.user;
if(role === "Job Seeker"){
    return next(new errorHandler("Job Seeker are not applicable for accessing this resources !",400));
}
const { _id}=req.user;
const application=await Application.find({"employerId.user": _id});
res.status(200).json({
    success : true,
    application
})
});

export const jobSeekerGetAllApplications= catchAsyncError ( async(req,res,next) =>{
    const {role} =req.user;
    if(role === "Employer"){
        return next(new errorHandler("Employer are not applicable for accessing this resources !",400));
    }
    const { _id}=req.user;
    const application=await Application.find({"applicantId.user": _id});
    res.status(200).json({
        success : true,
        application
    })
    });

export const jobSeekerDeleteApplication=catchAsyncError(async(req,res,next) =>{
    const {role} =req.user;
    if(role === "Employer"){
        return next(new errorHandler("Employer are not allowed for accessing this resources !",400));
    }
    const id=req.params;
    const application=await Application.findById(id);
    if(!application){
        return next(new errorHandler("Oops ,application is not found"));
    }
    await application.deleteOne();
    res.status(200).json({
        success :true,
        message :"Deletion Successfull"
    });

});

export const postApplication=catchAsyncError(async(req,res,next) =>{
    const { role } =req.user; 
    if(role === "Employer")
    {
        return next(new errorHandler("Employers are not allowed to access this resources !"));
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new errorHandler("Enter your resume !"));
    }
    const { resume }=req.files;
    const allowedFormats=["image/png","image/jpeg","image/webp"];
    if(!allowedFormats.includes(resume.mimetype)){
        return next (new errorHandler("Enter your resume in Png ,jpg or webp formate"));
    }
    console.log("Reached at this plcae");
    console.log(resume.tempFilePath);
    
    const cloudinaryResponse=await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    console.log('not this');
    
    
    if(!cloudinaryResponse || cloudinaryResponse.error){
       
        console.error("cloudinary Error",cloudinaryResponse.error || "Unknown cloudinary Error");
        return next(new errorHandler("Failed to upload file !",500));
    }
    const {name ,email ,coverLetter,phone ,address,jobId}=req.body;
    const applicantId={
        user :req.user._id,
        role :"Job Seeker"
    }
    if(!jobId){
        return next(new errorHandler("Oops,Job not found",404));
    }
    const jobDetails=await Job.findById(jobId);
    if(!jobDetails){
        return next(new errorHandler("Oops,Job not found",404));
    }
    const employerId={
        user:jobDetails.postedBy,
        role : "Employer"
    }
    
if(!name || !email || !phone || !address || !applicantId || !employerId || !coverLetter || !resume){
    return next(new errorHandler("Fill the form Completely",400));
}
const application=await Application.create({
name,
email,
coverLetter,
phone,
address,
applicantId,
employerId,
resume :{
    public_id :cloudinaryResponse.public_id,
    URL :cloudinaryResponse.secure_url
}
})
 res.status(200).json({
    success :true,
    message :"Application is suucessfully submitted !",
    application
 });
})
