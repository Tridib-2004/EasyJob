import express from "express";
import {postApplication, employerGetApplication, jobSeekerGetApplication, deleteApplication} from "../controllers/applicationController.js";
import {isAuthenticated,isAuthorized} from "../middlewere/auth.js";

const router=express.Router();

router.post("/post/:id", isAuthenticated, isAuthorized("Job Seeker"), postApplication);
router.get("/employerget", isAuthenticated, isAuthorized("Employer"), employerGetApplication);
router.get("/job-seekerget", isAuthenticated, isAuthorized("Job Seeker"), jobSeekerGetApplication);
router.delete("/delete/:id", isAuthenticated,  deleteApplication);

export default router;