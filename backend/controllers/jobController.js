import {wrapAsync} from "../middlewere/wrapAsync.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewere/error.js";
import {Job} from "../models/jobSchema.js";

//post a job
export const postJob = wrapAsync(async (req, res, next) => {
   try {
      const{
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobNiche,
    newsLettersSent,
      } =req.body;

      if (
     !title ||
    !jobType ||
    !location ||
    !companyName ||
    !introduction ||
    !responsibilities ||
    !qualifications ||
    !salary ||
    !jobNiche
  ) {
    return next(new ErrorHandler(400,"Please provide full job details."));
  }
    if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (!personalWebsiteTitle && personalWebsiteUrl)
  ) {
    return next(
      new ErrorHandler(
        400,"Provide both the website url and title, or leave both blank."
      )
    );
  }
   const postedBy = req.user._id;
   const job = new Job({
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualifications,
    offers,
    salary,
    hiringMultipleCandidates,
    personalWebsite: {
      title: personalWebsiteTitle,
      url: personalWebsiteUrl
    },
    jobNiche,
    newsLettersSent,
    postedBy
   });

   await job.save();
   res.status(201).json({
      success: true,
        message: "Job posted successfully",
        job,
   });
 } catch (error) {
      next(error);
   }

});


//for get all jobs

export const getAllJobs = wrapAsync(async (req, res, next) => {
  const { city, niche, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = city;
  }
  if (niche) {
    query.jobNiche = niche;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
      { introduction: { $regex: searchKeyword, $options: "i" } },
    ];
  }
  console.log("Query for fetching jobs:", query);
  const jobs = await Job.find(query);
  console.log("Fetched jobs:", jobs);
  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});


// getMyJobs 

export const getMyJobs = wrapAsync(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

//for delete job
export const deleteJob = wrapAsync(async (req, res, next) => {
  const {id} = req.params;
  const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler(404, "Job not found"));
    }
    if (job.postedBy.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler(403, "You are not authorized to delete this job"));
    }
    await job.remove();
    res.status(200).json({
        success: true,
        message: "Job deleted successfully",
    });
});

//get a single job
export const getASingleJob  = wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler(404, "Job not found"));
    }
    res.status(200).json({
        success: true,
        job,
    });
});
