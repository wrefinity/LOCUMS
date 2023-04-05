import mongoose from "mongoose";
import bcrypt from "bcrypt";
import CustomError from "../error/index.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    company_name: {
      type: String,
    },
    username: { type: String, required: true },
    image: { type: String },
    resume: { type: String },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "organization",
    },
    jobType: { type: String }, //temporary, permanent, contract, fixed, pertime
    phone: { type: String },
    psniNumber: { type: String },
    gender: { type: String },
    professionalHeadline: { type: String },
    profileSummary: { type: String },
    vettingFile: { type: String },
    dispensing_software: { type: String },
    company_website: { type: String },
    address: { type: String },
    city: { type: String },
    county: { type: String },
    regNumber: { type: String },
    eir_code: { type: String },
    info: { type: String },
    url: { type: String },
    occupation: { type: String },
    // occupation: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    status: { type: String, default: "unverified" },
    isDeleted: { type: Boolean, default: false },
    canRelocate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  if (this.password) this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

userSchema.statics.compareDetails = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user)
    throw new CustomError.UnauthenticatedError("Invalid Email Address");

  const checkPass = await bcrypt.compare(password, user.password);
  if (checkPass) {
    const { password, ...userx } = user._doc;
    return userx;
  } else {
    throw new CustomError.UnauthenticatedError("Invalid Password");
  }
};

const User = mongoose.model("User", userSchema);
export default User;
