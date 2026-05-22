import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
   
  },
  reducers: {
    requestForAllApplications(state, action) {
        state.loading = true;
        state.error = null;
    },
    successForAllApplications(state, action) {
        state.loading = false;
        state.applications = action.payload;
        state.error = null;
    },
    failureForAllApplications(state, action) {
        state.loading = false;
        state.error = action.payload;
    },

    requestForMyApplications(state, action) {
        state.loading = true;
        state.error = null;
    },
    successForMyApplications(state, action) {
        state.loading = false;
        state.applications = action.payload;
        state.error = null;
    },
    failureForMyApplications(state, action) {
        state.loading = false;
        state.error = action.payload;
     },
     requestForPostApplication(state, action) {
        state.loading = true;
        state.error = null;
        state.message = null;
    },
    successForPostApplication(state, action) {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
    },
    failureForPostApplication(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
     },
      requestForDeleteApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllError(state, action) {
        state.error = null;
        state.applications = state.applications;
    },
    resetApplicationSlice(state, action) {
        state.error = null;
        state.applications = state.applications;
        state.loading = false;
        state.message = null;
        state.myApplications = state.myApplications;
    }
  }


});


//for post the application

export const postApplication=(data,jobId)=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestForPostApplication());
   try{
    const response=await axios.post(`https://easyjob-vcsa.onrender.com/application/post/${jobId}`,data,{withCredentials: true,headers: {
        "Content-Type": "multipart/form-data",
      }});
     dispatch(applicationSlice.actions.successForPostApplication(response.data.message));
     dispatch(applicationSlice.actions.clearAllError());
   }catch(error){
    dispatch(applicationSlice.actions.failureForPostApplication(error.response.data.message));
   }
};

//for get all applications for jobseeker
export const fetchMyApplications=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestForMyApplications());
    try{
        const response=await axios.get("https://easyjob-vcsa.onrender.com/application/job-seekerget",{withCredentials: true});
        dispatch(applicationSlice.actions.successForMyApplications(response.data.applications));
        dispatch(applicationSlice.actions.clearAllError());
    }catch(error){
        dispatch(applicationSlice.actions.failureForMyApplications(error.response.data.message));
    }   
};

//for get all applications for employee

export const fetchEmployerApplications=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.requestForAllApplications());
    try{
        const response=await axios.get("https://easyjob-vcsa.onrender.com/application/employerget",{withCredentials: true});
        dispatch(applicationSlice.actions.successForAllApplications(response.data.applications));
        dispatch(applicationSlice.actions.clearAllError());
    }catch(error){
        dispatch(applicationSlice.actions.failureForAllApplications(error.response.data.message));
    }
};

//clear all application error
export const clearAllApplicationError=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.clearAllError());
};  
//reset application slice
export const resetApplication=()=>async(dispatch)=>{
    dispatch(applicationSlice.actions.resetApplicationSlice());
};

//delete application
export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `https://easyjob-vcsa.onrender.com/application/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(clearAllApplicationErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response.data.message
      )
    );
  }
};

export default applicationSlice.reducer;