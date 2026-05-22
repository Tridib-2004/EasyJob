import express from "express";
import {postJob, getAllJobs, getASingleJob, getMyJobs, deleteJob} from "../controllers/jobController.js";
import {isAuthenticated,isAuthorized} from "../middlewere/auth.js";

const router=express.Router();

router.post("/postjob",isAuthenticated,isAuthorized("Employer"),postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/get/:id", getASingleJob)



export default router;