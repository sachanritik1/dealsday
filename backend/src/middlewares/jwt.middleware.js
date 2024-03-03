import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1] || null;
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided!" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    req.userId = decoded.id;
    next();
  });
};
