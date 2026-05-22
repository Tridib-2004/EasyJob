import {wrapAsync} from "../middlewere/wrapAsync.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewere/error.js";
import {Job} from "../models/jobSchema.js";
import {Application} from "../models/applicationSchema.js";
import{v2 as cloudinary} from "cloudinary";


//apply for a jop
export const postApplication=wrapAsync(async(req,res,next)=>{
    try{
   const {id}=req.params;
   const{name,email,phone,address,coverLetter}=req.body;
    if(!name || !email || !phone || !address || !coverLetter){
        return next(new ErrorHandler(400,"Please provide all required fields."))
    }
    
    const jobSeekerInfo={
        id:req.user._id,
        name,
        email,
        phone,
        address,
        coverLetter,
        role:"Job Seeker"
    };

    const jobDetails=await Job.findById(id);
    if(!jobDetails){
        return next(new ErrorHandler(404,"Job not found."));
    }
    const isAlreadyApplied=await Application.findOne({
        "jobSeekerInfo.id":req.user._id,
        "jobInfo.jobId":id
    });
    if(isAlreadyApplied){
        return next(new ErrorHandler(400,"You have already applied for this job."));
    }
    if(req.file && req.file.resume){
        const{resume}=req.file;
        try{
            const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
                 folder: "Job_Resume",
                resource_type: "auto",
            }
          );
         
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              new ErrorHandler(500,"Failed to upload resume to cloud.")
            );
          }
          jobSeekerInfo.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        }catch(error){
            return next(new ErrorHandler(500,"Failed to upload resume. Please try again later."));
        }

    }else{
        if(!req.user.resume || !req.user.resume.url){
            return next(new ErrorHandler(400,"Resume is required to apply for a job. Please upload your resume."));
        }
        jobSeekerInfo.resume={
            public_id:req.user.resume.public_id,
            url:req.user.resume.url
        }
    }

    const employerInfo={
        id:jobDetails.postedBy,
        role:"Employer"
    };
    const jobInfo={
        jobId:jobDetails._id,
        jobTitle:jobDetails.title
    };
    
    const application=new Application({
        jobSeekerInfo,
        employerInfo,
        jobInfo
    });
    await application.save();
    res.status(201).json({
        success:true,
        message:"Application submitted successfully."
    });




}catch(error){
    return next(error);
}

});

//get applications for employer
export const employerGetApplication=wrapAsync(async(req,res,next)=>{
  try{
    const {_id}=req.user;
    const applications=await Application.find({"employerInfo.id":_id, "deletedBy.employer": false,});
    res.status(200).json({
        success:true,
        applications
    });

  }catch(error){
    return next(error);
  }  
});


//get applications for job seeker
export const jobSeekerGetApplication=wrapAsync(async(req,res,next)=>{

     try{

    const {_id}=req.user;
    const applications=await Application.find({"jobSeekerInfo.id":_id, "deletedBy.jobSeeker": false,});
    res.status(200).json({
        success:true,
        applications
    });
  }catch(error){
    return next(error);
  } 
});


//delete application
export const deleteApplication=wrapAsync(async(req,res,next)=>{
     try{

    const {id}=req.params;
    const application=await Application.findById(id);
    if(!application){
        return next(new ErrorHandler(404,"Application not found."));
    }
    const {role, _id}=req.user;
    switch (role) {
    case "Job Seeker":
      application.deletedBy.jobSeeker = true;
      await application.save();
      break;
    case "Employer":
      application.deletedBy.employer = true;
      await application.save();
      break;

    default:
      console.log("Default case for application delete function.");
      break;
  }
  if (application.deletedBy.jobSeeker && application.deletedBy.employer) {
    await Application.findByIdAndDelete(id);
    }
    res.status(200).json({
        success:true,
        message:"Application deleted successfully."
    });
  }catch(error){
    return next(error);
  } 
});