import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJobById,
  getAllJobs,
  getJobById,
} from "../controllers/jobControllers.js";

//job routes
router.post("/jobs", createJob);
router.get("/jobs", getAllJobs);
router.get("/job/:id", getJobById);
router.delete("/job/:id", deleteJobById);

export default router;
