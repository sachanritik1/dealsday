import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import { router as userRouter } from "./routes/user.routes.js";
import { router as employeeRouter } from "./routes/employee.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dealsday";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3001";

mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log("Server is running on port " + PORT);
    })
  )
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
const router = express.Router();

app.use("/api/v1", router);

router.use("/user", userRouter);
router.use("/employee", employeeRouter);
