import express from "express";
import { deleteJob, getAllJobs, getMyJobs, getSingleJob, post, update } from "../controllers/jobController.js";
import {isAutheroized} from "../middlewares/auth.js"
const router=express.Router();
router.get("/getAllJobs",getAllJobs);
router.post("/post",isAutheroized,post);
router.get("/getMyJobs",isAutheroized,getMyJobs);
router.put("/update/:id",isAutheroized,update);
router.delete("/delete/:id",isAutheroized,deleteJob);
router.get("/:id",isAutheroized,getSingleJob);

export default router;