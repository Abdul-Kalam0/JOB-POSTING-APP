import server from "./index.js";
import dotenv from "dotenv";
dotenv.config();
import dbInitialization from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbInitialization();
    server.listen(PORT, () => {
      console.log("✅Server is listening.");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
