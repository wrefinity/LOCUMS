import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
