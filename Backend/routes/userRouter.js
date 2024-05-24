import express from "express";
import { getUser, logout, register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { isAutheroized } from "../middlewares/auth.js";

const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAutheroized,logout);
router.get("/getUser",isAutheroized,getUser);

export default router;