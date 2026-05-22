import {wrapAsync} from "../middlewere/wrapAsync.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewere/error.js";
import {v2 as cloudinary} from "cloudinary";
import {sendToken} from "../utils/jwtToken.js";
import dotenv from "dotenv";
//for register user
export const registerUser = wrapAsync(async (req, res, next) => {
    try{
        const {
      name,
      email,
      phone,
      address,
      password,
      role,
      firstNiche,
      secondNiche,
      thirdNiche,
      coverLetter,
    } = req.body;
     
     if (!name || !email || !phone || !address || !password || !role) {
      return next(new ErrorHandler( 400,"All fileds are required."));
    }
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
      return next(
        new ErrorHandler( 400,"Please provide your preferred job niches.")
      );
    }
      const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler( 400,"Email is already registered."));
    }
     
    const userData = {
      name,
      email,
      phone,
      address,
      password,
      role,
      niches: {
        firstNiche,
        secondNiche,
        thirdNiche,
      },
      coverLetter,
    };
         
     if (req.files && req.files.resume) {
      const { resume } = req.files;
      if (resume) {
        try {
            console.log(resume.tempFilePath);
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
          userData.resume = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          };
        } catch (error) {
            
          return next(new ErrorHandler(500,"Failed to upload resume"));
        }
      }
    }
    const user = await User.create(userData);
    
    sendToken(user, 201, res, "User registered successfully");
    
    



    }catch(error){
        next(error);
    }
});


// for login user
export const loginUser = wrapAsync(async (req, res, next) => {
    try{
       const {email,role,password}=req.body;
       if(!email || !password || !role){
        return next(new ErrorHandler(400,"All fileds are required."));
       }
        const user= await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler(401,"Invalid email or password from email"));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler(401,"Invalid email or password from password"));
        }
        if(user.role !== role){
            return next(new ErrorHandler(401,"Invalid role selected"));
        }
        sendToken(user, 200, res, "User logged in successfully");

    }catch(error){
        next(error);
    }
  });

  //for logout user
export const logoutUser = wrapAsync(async (req, res, next) => {
    try{

      res.status(200).cookie("token","", {
        expires: new Date(Date.now()),
        httpOnly: true,
      }).json({
        success: true,
        message: "User logged out successfully",
      });
    }catch(error){
        next(error);
    }
  });


  //get alluser

  export const getAllUsers = wrapAsync(async (req, res, next) => {
    try{
     const user = req.user;
     res.status(200).json({
        success: true,
        user,
     });
      
    }catch(error){
        next(error);
    }
  });

  //for update user details
  export const updateUserDetails = wrapAsync(async (req, res, next) => {
    try{
       const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        coverLetter: req.body.coverLetter,
        niches: {
            firstNiche: req.body.firstNiche,
            secondNiche: req.body.secondNiche,
            thirdNiche: req.body.thirdNiche,
        }
       }
       const {firstNiche,secondNiche,thirdNiche}=newUserData.niches;
       if(req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)){
        return next(new ErrorHandler(400,"Please provide your preferred job niches."));
       }
       if(req.files){
        const {resume}=req.files;
        if(resume){
          const currentResumeId = req.user.resume?.public_id;
          if(currentResumeId){
            await cloudinary.uploader.destroy(currentResumeId);
          }
          const newCloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: "Job_Resume",
            resource_type: "auto",
          });
          newUserData.resume = {
            public_id: newCloudinaryResponse.public_id,
            url: newCloudinaryResponse.secure_url,
          };
        }
       }
        
      const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        user,
        message: "User details updated successfully",
      });

    }catch(error){
        next(error);
    }
  });


  //for update password

  export const updatePassword = wrapAsync(async (req, res, next) => {
    try{
      const user = await User.findById(req.user._id).select("+password");
      const {oldPassword,newPassword,confirmPassword}=req.body;
      if(!oldPassword || !newPassword || !confirmPassword){
        return next(new ErrorHandler(400,"All fileds are required."));
      }
      if(newPassword !== confirmPassword){
        return next(new ErrorHandler(400,"New password and confirm password do not match."));
      }
      const isPasswordMatched = await user.comparePassword(oldPassword);
      if(!isPasswordMatched){
        return next(new ErrorHandler(401,"Old password is incorrect"));
      }
      user.password = newPassword;
      await user.save();
      sendToken(user, 200, res, "Password updated successfully");
      

    }catch(error){
        next(error);
    }
  });


  //for forget password

  export const forgetPassword = wrapAsync(async (req, res, next) => {
    try{
      const {email}=req.body;
      if(!email){
        return next(new ErrorHandler(400,"Please provide your registered email."));
      }
      const user = await User.findOne({email});
      if(!user){
        return next(new ErrorHandler(404,"User with this email does not exist."));
      }
      // Here you would typically generate a password reset token and send an email to the user with instructions on how to reset their password. For simplicity, we will just return a success message.
      res.status(200).json({
        success: true,
        message: "Password reset instructions have been sent to your email (functionality not implemented in this example).",
      });
    }catch(error){
        next(error);
    } 
  });
