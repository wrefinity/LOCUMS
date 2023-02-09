import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  applications: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  message: "",
};
const API_URL = "applications";
export const createApplication = createAsyncThunk(
  "apply/create",
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
export const getApplication = createAsyncThunk(
  "apply/get_all",
  async (_, thunkAPI) => {
    try {
      const res = await requestHandler.axioGet(API_URL);
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

export const updateApplication = createAsyncThunk(
  "apply/update",
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
export const deleteApplication = createAsyncThunk(
  "apply/delete",
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

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createApplication.pending]: (state) => {
      state.status = "loading";
    },
    [createApplication.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.jobs.push(payload.data);
    },
    [createApplication.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getApplication.pending]: (state) => {
      state.status = "loading";
    },
    [getApplication.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.jobs = payload.data;
      state.status = "idle";
    },
    [getApplication.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.data?.message;
      state.status = "idle";
    },
    //update case
    [updateApplication.pending]: (state) => {
      state.status = "loading";
    },
    [updateApplication.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload?.data?.message;
    },
    [updateApplication.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.data;
      state.applications = state.applications.map((add) =>
        add._id === _id ? payload : add
      );
    },
    //deletecase
    [deleteApplication.pending]: (state) => {
      state.status = "loading";
    },
    [deleteApplication.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [deleteApplication.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.applications = state.applications.filter(
        (apply) => apply._id !== _id
      );
    },
  },
});

export const selectAllApplication = (state) => state.applications.applications;
export const getApplicationStatus = (state) => state.applications.status;
export const getApplicationError = (state) => state.applications.message;
export const getApplicationById = (state, id) =>
  state.applications.applications.find((com) => com._id === id);
export const { reseter } = applicationSlice.actions;

export default applicationSlice.reducer;
