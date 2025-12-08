import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbInitialization = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("🤝DB connected successfully.");
    })
    .catch((error) => {
      console.error("❌DB is not connected.", error);
    });
};

export default dbInitialization;
