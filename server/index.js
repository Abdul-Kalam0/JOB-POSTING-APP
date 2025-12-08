import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//express middlewares
app.use(cors());
app.use(express.json());

import jobRoutes from "./routes/jobRoutes.js";

//routes middleware
app.use("/api", jobRoutes);

export default app;
