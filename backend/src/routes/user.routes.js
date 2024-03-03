import express from "express";
import {
  createUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);

router.use(verifyJWT);
router.route("/me").get(getCurrentUser);

export { router };
