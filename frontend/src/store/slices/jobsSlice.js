import {createSlice} from "@reduxjs/toolkit";

import axios from "axios";

const jobsSlice=createSlice({
    name: "jobs",
    initialState:{
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singleJob: null,
        myJobs: [],

    },
    reducers: {
        requestForAllJobs(state,action){
            state.loading=true;
            state.error=null;
        },
        successForAllJobs(state,action){
            state.loading=false;
            state.jobs=action.payload;
            state.error=null;
        },
        failureForAllJobs(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        requestForSingleJob(state,action){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        successForSingleJob(state,action){
            state.loading=false;
            state.singleJob=action.payload;
            state.error=null;
        },
        failureForSingleJob(state,action){
            state.loading=false;
            state.error=action.payload;
         },
         requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    failureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
       requestForDeleteJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
        requestForMyJobs(state, action) {
      state.loading = true;
      state.myJobs = [];
      state.error = null;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failureForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = state.myJobs;
      state.error = action.payload;
    },

        clearAllError(state,action){
            state.error=null;
            state.jobs=state.jobs;
        },
        resetJobSlice(state,action){
            state.error=null;
            state.jobs=state.jobs;
            state.loading=false;
            state.message=null;
            state.myJobs=state.myJobs;
            state.singleJob={};
        }
    },
});

//for fetch jobs

export const fetchJobs=(city,niche,searchKeyword = "")=>async(dispatch)=>{
   try{
    dispatch(jobsSlice.actions.requestForAllJobs());
    let link="http://localhost:4000/job/getall?";
    let queryParams=[];
    if(searchKeyword){
        queryParams.push(`searchKeyword=${searchKeyword}`);
    }
    if(city){
        queryParams.push(`city=${city}`);
    }
    if(niche){
        queryParams.push(`niche=${niche}`);
    }
    link+=queryParams.join("&");
    const response=await axios.get(link,{withCredentials: true});
     console.log("Response from fetchJobs:", response);
    dispatch(jobsSlice.actions.successForAllJobs(response.data.jobs));

   }catch(error){
   dispatch( jobsSlice.actions.failureForAllJobs( error.response?.data?.message || error.message ) );
   }
};

//fetch single job details
export const fetchSingleJob=(jobId)=>async(dispatch)=>{
    try{
        dispatch(jobsSlice.actions.requestForSingleJob());
        const response=await axios.get(`http://localhost:4000/job/get/${jobId}`,{withCredentials: true});
        dispatch(jobsSlice.actions.successForSingleJob(response.data.job));
    }catch(error){
        dispatch(jobsSlice.actions.failureForSingleJob(error.response?.data?.message || error.message));
    }
};


//post a job
export const postJob = (data) => async (dispatch) => {
  dispatch(jobsSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      `http://localhost:4000/job/postjob`,
      data,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(jobsSlice.actions.successForPostJob(response.data.message));
    dispatch(jobsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobsSlice.actions.failureForPostJob(error.response?.data?.message || error.message));
  }
};

//delete a job

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobsSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `http://localhost:4000/job/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(jobsSlice.actions.successForDeleteJob(response.data.message));
    dispatch(clearAllJobErrors());
  } catch (error) {
    dispatch(jobsSlice.actions.failureForDeleteJob(error.response?.data?.message || error.message));
  }
};
//fetch my jobs employee
export const getMyJobs = () => async (dispatch) => {
  dispatch(jobsSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `http://localhost:4000/job/getmyjobs`,
      { withCredentials: true }
    );
    dispatch(jobsSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobsSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(jobsSlice.actions.failureForMyJobs(error.response.data.message));
  }
};



export const clearAllJobsError=()=>async(dispatch)=>{
    dispatch(jobsSlice.actions.clearAllError());
}


export const resetJobsSlice=()=>async(dispatch)=>{
    dispatch(jobsSlice.actions.resetJobSlice());
}

export default jobsSlice.reducer;


