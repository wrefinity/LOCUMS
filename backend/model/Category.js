import mongoose from "mongoose";

// categories
// doctor
// health care assistant 
// nurse
// pharmacist
// pharmacist technician
// social care worker
const catSchema = new mongoose.Schema(
  {
    name: { type: String },
    about: { type: String },
    isDeleted:{type:Boolean, default:false},
  },
  { timestamps: true }
);

const catModel = mongoose.model("Category", catSchema);
export default catModel;
