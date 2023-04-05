import mongoose from "mongoose";

const appSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    user_note: { type: String },
    admin_note: { type: String },
    status: { type: String, default: "pending" },
    application_date: { type: Date, default: new Date() },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", appSchema);
export default Application;
