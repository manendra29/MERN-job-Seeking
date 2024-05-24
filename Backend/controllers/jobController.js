import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Job } from "../models/jobSchema.js"
import errorHandler from "../middlewares/error.js"

export const getAllJobs= catchAsyncError(async (req,res,next) =>{
   const jobs=await Job.find({expired : false});
   res.status(200).json({
    success :true,
    jobs,
   });
});

export const post=catchAsyncError(async(req,res,next) =>{
   const {role}=req.user;
   if(role === "Job Seeker"){
      return next(new errorHandler("This role is not applicable for this resources!"));
   }
   const {title,description, category ,country,city,location,fixedSalary,salaryFrom,salaryTo,expired,createdOn}=req.body;
   if(!title || !description || !country || !city || !location || !category ){
      return next(new errorHandler("Fill the required form"));
   }
   if((!salaryFrom || !salaryTo) && !fixedSalary){
      return next(new errorHandler("Provide either fixedSalary or ranged Salary"));
   }
   if(salaryFrom && salaryTo && fixedSalary){
      return next(new errorHandler("Don't provide both fixedSalary and ranged Salary together"));
   }
   const postedBy= req.user._id;
   const job=await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      expired,
      createdOn,
      postedBy
   });

   res.status(200).json({
      success :true,
      message : "Job has been posted successfully!",
      job,
   })
});


export const getMyJobs=catchAsyncError(async(req,res,next) =>{
   const {role} =req.user;
   if(role === "Job Seeker"){
      return next(new errorHandler("This role is not applicable for this resources!"));
   }
   const myJobs=await Job.find({postedBy : req.user._id});
   res.status(200).json({
      success :true,
      myJobs
   });
});

export const update=catchAsyncError(async (req,res,next) =>{
   const {role} =req.user;
   if(role === "Job Seeker"){
      return next(new errorHandler("This role is not applicable for this resources!"));
   }
   const {id} =req.params    //params is used to access the parameter given on the router for selecting          indivisual person.
   let job=await Job.findById(id);
   if(!job){
      return next(new errorHandler("Oops,Job not found!",404));
   }
   job=await Job.findByIdAndUpdate(id,req.body,{
      new :true,
      runValidators :true,
      useFindAndModify :false
   });
   res.status(200).json({
      success :true,
      job,
      message : "Job updated Successfully!"
   })
})

export const deleteJob=catchAsyncError(async (req,res,next) =>{
   const {role} ="req.user.role";
   if(role == "Job Seeker")
   return next (new errorHandler("This role is not applicable for this resources!",404));
   const {id}=req.params;
   let job=await Job.findById(id);
   if(!job){
      return next(new errorHandler("Oops, No Job is found!",404));
   }
   await job.deleteOne();
   res.status(200).json({
      success :true,
      message :"Post is deleted!"
   })
})

export const getSingleJob=catchAsyncError(async(req,res,next) =>{
   const {id}=req.params;
   try {
      const job=await Job.findById(id);
      if(!job){
         return next(new errorHandler("Job not found",404));
      }
      res.status(200).json({
         success:true,
         job,
      });
   } catch (error) {
      return next(new errorHandler("Invalid Id/CastError",400));
   }
})