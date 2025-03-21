import express from "express";
import { adminOnly, protectRoute } from "../middleware/authMiddleware.js";
import {
  checkAuth,
  deleteStudent,
  enrollCourse,
  getSingleStudent,
  getStudents,
  login,
  logout,
  registerStudent,
  unenrollCourse,
} from "../controllers/studentController.js";
import { studentProtectRoute } from "../middleware/studentMiddleware.js";
const router = express.Router();

router.post("/register", protectRoute, adminOnly, registerStudent);
router.post("/login", login);
router.post("/logout", logout);

router.get("/checkAuth", studentProtectRoute, checkAuth);

router.put("/enroll/:courseId", protectRoute, enrollCourse);
router.put("/studentEnroll/:courseId", studentProtectRoute, enrollCourse);

router.get("/getStudents", protectRoute, getStudents);
router.get("/getSingleStudent/:id",protectRoute, getSingleStudent);

router.delete("/deleteStudent/:id", protectRoute, adminOnly, deleteStudent);
router.put("/unenroll/:id", protectRoute, unenrollCourse);
export default router;
