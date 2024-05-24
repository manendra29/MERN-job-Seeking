import express from "express";
import { isAutheroized } from "../middlewares/auth.js";
import { employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications, postApplication } from "../controllers/applicationController.js";

const router=express.Router();

router.get("/employer/getAll",isAutheroized,employerGetAllApplications);
router.get("/jobSeeker/getAll",isAutheroized,jobSeekerGetAllApplications);
router.delete("/deleteApplication/:id",isAutheroized,jobSeekerDeleteApplication);
router.post("/post",isAutheroized,postApplication);
export default router;