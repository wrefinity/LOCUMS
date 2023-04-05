import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    description: { type: String },
    payFrequency: { type: String }, //monthly, daily, weekly, yearly
    workHour: { type: String }, //fulltime or partime
    workPattern: { type: String }, // morning, day or night shift
    startDate: { type: Date },
    // categoryId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
    category: { type: String, required: true },
    endDate: { type: Date },
    vacancies: { type: Number },
    salary: { type: Number }, // negotiatable or prices
    jobType: { type: String }, //temporary or permanent
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    publishedDate: { type: Date, default: new Date() },
    expiredDate: { type: String },
    benefit: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
