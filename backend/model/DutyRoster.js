import mongoose from "mongoose";

const DutySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    clockin: { type: Date, default: new Date() },
    clockout: { type: Date },
    break_time: { type: Date },
    break_resume: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const dutyModel = mongoose.model("Duty", DutySchema);
export default dutyModel;
