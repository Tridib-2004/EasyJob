import express from "express";
import {registerUser,loginUser,logoutUser,getAllUsers,updateUserDetails,updatePassword} from "../controllers/userController.js";
import {isAuthenticated} from "../middlewere/auth.js";
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",isAuthenticated,logoutUser);
router.get("/getallusers",isAuthenticated,getAllUsers);
router.put("/updateuser",isAuthenticated,updateUserDetails);
router.put("/updatepassword",isAuthenticated,updatePassword);
export default router;