import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//express middlewares
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://job-posting-app-001.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());

import jobRoutes from "./routes/jobRoutes.js";

//routes middleware
app.use("/api", jobRoutes);

export default app;
