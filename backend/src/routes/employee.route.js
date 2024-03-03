import express from "express";
import {
  createEmployee,
  loginEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/register").post(upload.single("image"), createEmployee);
router.route("/login").post(loginEmployee);
router.route("/").get(getAllEmployees);
router
  .route("/:id")
  .get(getEmployeeById)
  .patch(upload.single("image"), updateEmployee)
  .delete(deleteEmployee);

export { router };
