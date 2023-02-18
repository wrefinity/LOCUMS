import mongoose from "mongoose";

const jobItemSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    payFrequency: { type: String }, //monthly, daily, weekly, yearly
    workHour: { type: String }, //fulltime or partime
    workPattern: { type: String }, // morning, day or night shift
    startDate: { type: Date },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    endDate: { type: Date },
    vancancies: { type: Number },
    salary: { type: Number }, // negotiatable or prices
    jobTye: { type: String }, //temporary or permanent
    location: { type: String }, // define the country
    county: { type: String }, // define the state for the job
    publishedDate: { type: Date, default: new Date() },
    expiredDate: { type: String },
    benefit: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const appSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobs: [jobItemSchema],
  isDeleted: { type: Boolean, default: false },
});

const Application = mongoose.model("Application", appSchema);
export default Application;
