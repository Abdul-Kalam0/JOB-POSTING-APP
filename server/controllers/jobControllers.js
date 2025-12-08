import jobModel from "../models/jobModel.js";

export const createJob = async (req, res) => {
  const {
    jobTitle,
    companyName,
    location,
    jobType,
    salary,
    jobDescription,
    requiredQualification,
  } = req.body;
  try {
    const fields = {
      jobTitle: "Job title is required.",
      companyName: "Company name is required.",
      location: "Location is required.",
      jobType: "Job type is required.",
      salary: "Salary is required.",
      jobDescription: "Job description is required.",
      requiredQualification: "Qualification is required.",
    };

    const missingFields = Object.keys(fields).filter((k) => !req.body[k]);

    if (missingFields.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
        errors: missingFields.map((k) => fields[k]),
      });
    }

    const existingJob = await jobModel.findOne({
      jobTitle: jobTitle.trim(),
      companyName: companyName.trim(),
      location: location.trim(),
    });
    if (existingJob) {
      return res.status(409).json({
        success: false,
        message: "Duplicate job posting detected. This job already exists.",
      });
    }

    const newJob = new jobModel({
      jobTitle,
      companyName,
      location,
      jobType,
      salary,
      jobDescription,
      requiredQualification,
    });

    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      data: newJob,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully.",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
