import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Please provide an email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    designation: {
      type: String,
      enum: ["HR", "MANAGER", "SALES"],
      required: [true, "Please provide a designation"],
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: [true, "Please select a gender"],
    },
    course: {
      type: String,
      enum: ["MCA", "BCA", "BSC"],
      required: [true, "Please provide a course"],
    },
    image: {
      type: String,
      required: [true, "Please provide a image"],
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", employeeSchema);
