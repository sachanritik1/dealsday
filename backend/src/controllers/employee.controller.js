import { Employee } from "../models/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createEmployee = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    role,
    designation,
    gender,
    course,
    image,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !role ||
    !designation ||
    !gender ||
    !course ||
    !image
  ) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const localImageUrl = req.file.path;

  try {
    const imageUrl = await uploadOnCloudinary(localImageUrl);
    const employee = await Employee.create({
      name,
      email,
      password,
      phone,
      role,
      designation,
      gender,
      course,
      image: imageUrl || "",
    });
    res.status(201).json({ success: true, message: "Employee created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Employee not found" });
    }
    const isPasswordCorrect = await employee.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = employee.generateAccessToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllEmployees = async (req, res) => {};
export const getEmployeeById = async (req, res) => {};
export const updateEmployee = async (req, res) => {};
export const deleteEmployee = async (req, res) => {};
