import express from "express";
const router = express.Router();

import { createJob, getAllJobs } from "../controllers/jobControllers.js";

//job routes
router.post("/jobs", createJob);
router.get("/jobs", getAllJobs);

export default router;
