import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  shifts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  message: "",
};
const API_URL = "shifts";
export const createShift = createAsyncThunk(
  "shift/create",
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
export const getShift = createAsyncThunk(
  "shift/get_all",
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

export const updateShift = createAsyncThunk(
  "shift/update",
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
export const deleteShift = createAsyncThunk(
  "shift/delete",
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

const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createShift.pending]: (state) => {
      state.status = "loading";
    },
    [createShift.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.shifts.push(payload.data);
    },
    [createShift.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getShift.pending]: (state) => {
      state.status = "loading";
    },
    [getShift.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.jobs = payload.data;
      state.status = "idle";
    },
    [getShift.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload?.data?.message;
      state.status = "idle";
    },
    //update case
    [updateShift.pending]: (state) => {
      state.status = "loading";
    },
    [updateShift.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload?.data?.message;
    },
    [updateShift.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload?.data;
      state.shifts = state.shifts.map((shift) =>
        shift._id === _id ? payload : shift
      );
    },
    //deletecase
    [deleteShift.pending]: (state) => {
      state.status = "loading";
    },
    [deleteShift.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [deleteShift.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload.data;
      state.shifts = state.shifts.filter(
        (shift) => shift._id !== _id
      );
    },
  },
});

export const selectAllShift = (state) => state.shifts.shifts;
export const getShiftStatus = (state) => state.shifts.status;
export const getShiftError = (state) => state.shifts.message;
export const getShiftById = (state, id) =>
  state.shifts.shifts.find((sh) => sh._id === id);
export const { reseter } = shiftSlice.actions;

export default shiftSlice.reducer;