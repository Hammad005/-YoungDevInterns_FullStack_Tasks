import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import School from "../models/School.js";

export const register = async (req, res) => {
  const { name, email, role, schoolId, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .send({ error: "Password must be at least 6 characters long" });
  }
  
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use." });
    }
    
    // Check if the school already has an adminId
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({ error: "School not found." });
    }

    if (school.adminId) {
      return res.status(400).json({ error: "School already has an admin assigned." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      role,
      schoolId,
      password: hashedPassword,
    });
    await newAdmin.save();

    if (newAdmin) {
      const addAdminIdToSchool = await School.findByIdAndUpdate(
        schoolId,
        {  adminId: newAdmin._id },
        { new: true, runValidators: true }
      );
      res.status(201).json({ message: "School Admin created successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const adminWithoutPassword = { ...admin._doc };
    delete adminWithoutPassword.password;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      })
      .json({
        message: "Admin logged in successfully",
        adminWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.json(req.admin);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getAllSchoolAdmin = async (req, res) => {
  try {
    const schoolAdmin = await Admin.find({ role: "schoolAdmin" }).populate(
      "schoolId",
      "name"
    );
    res.json(schoolAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getSingleSchoolAdmin = async (req, res) => {
  try {
    const schoolAdmin = await Admin.findById(req.params.id);
    res.json(schoolAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const editAdmin = async (req, res) => {
  const newAdminData = {
    name: req.body.name,
    email: req.body.email,
  };
  try {
    const admin = await Admin.findOneAndUpdate(req.admin.id, newAdminData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (admin) {
      return res.status(200).json({ message: "Admin updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const deleteSchoolAdmin = async (req, res) => {
  try {
    const schoolAdmin = await Admin.findById(req.params.id);
    if (!schoolAdmin) {
      return res.status(404).json({ error: "School admin not found" });
    }
    const school = await School.findById(schoolAdmin.schoolId);
    if (school) {
      await school.deleteOne();
    }
    await schoolAdmin.deleteOne();
    res.json({ message: "School admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
