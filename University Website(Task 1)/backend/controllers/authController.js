import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Notice from "../models/Notice.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .send({ error: "Password must be at least 6 characters long" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    if (newUser) {
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      })
      .json({
        message: "User logged in successfully",
        userWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.role = "admin";
    await user.save();
    res.status(200).json({ message: "User promoted to admin" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
export const makeFaculty = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Admin not found" });
    }
    const totalAdmins = await User.countDocuments({role: "admin"});
    if (totalAdmins <= 1){
      return res.status(400).json({ error: "Cannot make faculty, only one admin exists"});
    }
    user.role = "faculty";
    await user.save();
    res.status(200).json({ message: "Admin promoted to faculty" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const course = await Course.findOne({ faculty: user.name });
    if (course) {
      // Delete course if user has a course
      await course.deleteOne();
    }
    const notice = await Notice.findOne({postedBy: user._id});
    if (notice) {
      // Delete notice if user has a notice
      await notice.deleteOne();
    }
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
export const getUserData = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getTotalAdmins = async (req, res) => {
  try {
    const totalAdmins = await User.countDocuments({role: "admin"});
    res.json({ totalAdmins });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
export const getAdmins = async (req, res) => {
  try {
    const totalAdmins = await User.find({role: "admin"}).select("-password").sort({updatedAt: -1});
    res.json({ totalAdmins });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({role: "faculty"});
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: "faculty" }).select("-password").sort({createdAt: -1});
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export const getSingleFaculty = async (req, res) => {
  const {id} = req.params;
  try {
    const faculty = await User.findById(id).select("-password");
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
