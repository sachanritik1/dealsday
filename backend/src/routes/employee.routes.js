import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
const router = express.Router();

router.use(verifyJWT);
router.route("/create").post(upload.single("image"), createEmployee);
router.route("/").get(getAllEmployees);
router
  .route("/:id")
  .get(getEmployeeById)
  .patch(upload.single("image"), updateEmployee)
  .delete(deleteEmployee);

export { router };
