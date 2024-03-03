import { Employee } from "../models/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllEmployees = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "id";
  const order = req.query.order || "asc";
  const search = req.query.search || "";

  const query = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const totalCount = await Employee.countDocuments(query);
    const employees = await Employee.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(limit * (page - 1));

    res.json({ success: true, employees, totalCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const createEmployee = async (req, res) => {
  const localFilePath = req.file.path;
  try {
    if (!localFilePath.includes("png") && !localFilePath.includes("jpg")) {
      throw new Error("Invalid Image format");
    }
    const result = await uploadOnCloudinary(localFilePath);
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
      const localFilePath = req.file.path;
      if (!localFilePath.includes("png") && !localFilePath.includes("jpg")) {
        throw new Error("Invalid Image format");
      }
      const result = await uploadOnCloudinary(localFilePath);
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
