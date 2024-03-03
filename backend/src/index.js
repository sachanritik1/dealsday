import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import { router as employeeRouter } from "./routes/employee.route.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dealsday";

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

const router = express.Router();

app.use(express.json());

app.use("/api/v1", router);

router.use("/employee", employeeRouter);
