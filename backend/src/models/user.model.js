import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const user = new Schema(
  {
    username: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Please provide an email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true }
);

user.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

user.method("isPasswordCorrect", async function (password) {
  return await bcrypt.compare(password, this.password);
});

user.method("generateAccessToken", function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.ACCESS_TOKEN_SECRET || "secret",
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "10d",
    }
  );
});

export const User = mongoose.model("User", user);
