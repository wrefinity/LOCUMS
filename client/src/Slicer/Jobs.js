import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  jobs: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  message: "",
};
const API_URL = "jobs";
export const createJob = createAsyncThunk(
  "jobs/create",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioPostHeader(
        API_URL,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getJobs = createAsyncThunk("jobs/get_all", async (_, thunkAPI) => {
  try {
    const res = await requestHandler.axioGet(API_URL);
    return res?.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateJobs = createAsyncThunk(
  "jobs/update",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `${API_URL}/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (er) {
      const message =
        (er.response && er.response.data && er.response.data.message) ||
        er.message ||
        er.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteJobs = createAsyncThunk(
  "jobs/delete",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials}`,
        token
      );
      return res?.data;
    } catch (er) {
      const message =
        (er.response && er.response.data && er.response.data.message) ||
        er.message ||
        er.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.status = "loading";
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.jobs.push(payload.data);
    },
    [createJob.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getJobs.pending]: (state) => {
      state.status = "loading";
    },
    [getJobs.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.jobs = payload.data;
      state.status = "idle";
    },
    [getJobs.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.data?.message;
      state.status = "idle";
    },
    //update case
    [updateJobs.pending]: (state) => {
      state.status = "loading";
    },
    [updateJobs.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload?.data?.message;
    },
    [updateJobs.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.data;
      state.jobs = state.jobs.map((add) => (add._id === _id ? payload : add));
    },
    //deletecase
    [deleteJobs.pending]: (state) => {
      state.status = "loading";
    },
    [deleteJobs.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [deleteJobs.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.jobs = state.jobs.filter((job) => job._id !== _id);
    },
  },
});

export const selectAllJobs = (state) => state.jobs.jobs;
export const getJobsStatus = (state) => state.jobs.status;
export const getJobsError = (state) => state.jobs.message;
export const getJobsById = (state, id) =>
  state.jobs.jobs.find((job) => job._id === id);
export const { reseter } = jobSlice.actions;

export default jobSlice.reducer;
