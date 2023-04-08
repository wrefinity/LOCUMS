import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  branches: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  message: "",
};
const API_URL = "branches";
export const createBranch = createAsyncThunk(
  "branch/create",
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
export const getBranch = createAsyncThunk(
  "branch/get_all",
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

export const updateBranch = createAsyncThunk(
  "branch/update",
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
export const deleteBranch = createAsyncThunk(
  "branch/delete",
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

const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createBranch.pending]: (state) => {
      state.status = "loading";
    },
    [createBranch.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.branches.push(payload.data);
    },
    [createBranch.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getBranch.pending]: (state) => {
      state.status = "loading";
    },
    [getBranch.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.branches = payload.data;
      state.status = "idle";
    },
    [getBranch.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.data?.message;
      state.status = "idle";
    },
    //update case
    [updateBranch.pending]: (state) => {
      state.status = "loading";
    },
    [updateBranch.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload?.data?.message;
    },
    [updateBranch.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.data;
      state.branches = state.branches.map((branch) =>
        branch._id === _id ? payload : branch
      );
    },
    //deletecase
    [deleteBranch.pending]: (state) => {
      state.status = "loading";
    },
    [deleteBranch.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [deleteBranch.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload.data;
      state.branches = state.branches.filter((branch) => branch._id !== _id);
    },
  },
});

export const selectAllBranch = (state) => state.branches.branches;
export const getBranchStatus = (state) => state.branches.status;
export const getBranchError = (state) => state.branches.message;
export const getBranchById = (state, id) =>
  state.branches.branches.find((br) => br._id === id);
export const { reseter } = branchSlice.actions;

export default branchSlice.reducer;
