import { Employee } from "../models/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllEmployees = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const totalCount = await Employee.countDocuments();
    const employees = await Employee.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ success: true, employees, totalCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const createEmployee = async (req, res) => {
  try {
    console.log(req.userId);
    console.log(req.file);
    const result = await uploadOnCloudinary(req.file.path);
    console.log(" ----- " + result.secure_url);
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      designation: req.body.designation.toUpperCase(),
      gender: req.body.gender.toUpperCase(),
      course: req.body.course.toUpperCase(),
      image: result.secure_url,
    });
    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    const obj = {};
    if (req.body.name) {
      obj.name = req.body.name;
    }
    if (req.body.email) {
      obj.email = req.body.email;
    }
    if (req.body.phone) {
      obj.phone = req.body.phone;
    }
    if (req.body.designation) {
      obj.designation = req.body.designation.toUpperCase();
    }
    if (req.body.gender) {
      obj.gender = req.body.gender.toUpperCase();
    }
    if (req.body.course) {
      obj.course = req.body.course.toUpperCase();
    }
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      obj.image = result.secure_url;
    }
    const employee = await Employee.findByIdAndUpdate(req.params.id, obj);
    res.status(201).json({ success: true, employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
