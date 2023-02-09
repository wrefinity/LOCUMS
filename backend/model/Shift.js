import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    name: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ShiftModel = mongoose.model("Shift", shiftSchema);
export default ShiftModel;
