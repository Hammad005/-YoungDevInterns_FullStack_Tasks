import Course from "../models/Course.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  try {
    const student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ error: "Student already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newStudent) {
      res.status(201).json({ message: "Student registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email }).populate("courses.courseId", "title")
    .populate("courses.assignedBy", "name role");
    if (!student) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const studentWithoutPassword = { ...student._doc };
    delete studentWithoutPassword.password;
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      })
      .json({
        message: "Student logged in successfully",
        studentWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.json(req.student);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const { studentId } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // Correctly checking if the student is already enrolled in the course
    const isAlreadyEnrolled = student.courses.some(
      (courseObj) => courseObj.courseId.toString() === courseId
    );
    if (isAlreadyEnrolled) {
      return res
        .status(400)
        .json({ error: "Student already enrolled in this course" });
    }

    student.courses.push({ courseId, assignedBy: req.user?._id });
    await student.save();
    res.status(200).json({ message: "Student Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const unenrollCourse = async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body;
  console.log(id);

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const courseIndex = student?.courses?.findIndex(
      (course) => course.courseId.toString() === id
    );
    if (courseIndex === -1) {
      return res
        .status(400)
        .json({ error: "Student is not enrolled in this course" });
    }

    student.courses.splice(courseIndex, 1);
    await student.save();

    res.status(200).json({ message: "Student unenrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getSingleStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id)
      .populate("courses.courseId", "title")
      .populate("courses.assignedBy", "name role")
      .select("-password");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    student.courses.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await student.remove();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
