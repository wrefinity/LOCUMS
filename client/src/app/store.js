import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Slicer/Auth";
import ApplicationReducer from "../Slicer/Application";
import JobReducer from "../Slicer/Jobs";
import userReducer from "../Slicer/UserSlice";
import categoriesReducer from "../Slicer/Categories";
import shiftReducer from "../Slicer/Shift";
import branchReducer from "../Slicer/Branch";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    applications: ApplicationReducer,
    jobs: JobReducer,
    users: userReducer,
    shifts: shiftReducer,
    categories: categoriesReducer,
    branches: branchReducer,
  },
});
export default store;
