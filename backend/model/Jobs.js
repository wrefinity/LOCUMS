import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    name: { type: String }, // name of organisation that posted the job
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
    endDate: { type: Date },
    vancancies: { type: Number },
    salary: { type: Number }, // negotiatable or prices
    jobType: { type: String }, //temporary or permanent
    location: { type: String }, // define the country
    county: { type: String }, // define the state for the job
    publishedDate: { type: Date, default: new Date(), },
    expiredDate: { type: String },
    benefit: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    isDeleted:{type:Boolean, default:false},
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
