import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  jobTitle: { type: String, required: [true, "Job title is required"] },
  companyName: { type: String, required: [true, "Company name is  required"] },
  location: { type: String, required: [true, "Location is required"] },
  jobType: { type: String, required: [true, "Job type required"] },
  salary: { type: Number, required: [true, "Salary is required"] },
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
  },
  requiredQualification: {
    type: String,
    required: [true, "Qualification is required"],
  },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
