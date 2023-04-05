import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    county: { type: String }, // define the state for the job
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
