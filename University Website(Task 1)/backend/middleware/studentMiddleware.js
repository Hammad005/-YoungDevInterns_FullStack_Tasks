import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

export const studentProtectRoute = async (req, res, next) => {
  const accessToken = req.cookies.token;
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    try {
      const studnet = await Student.findById(decoded.id)
        .populate("courses.courseId", "title")
        .populate("courses.assignedBy", "name role")
        .select("-password"); // Find the user by id and exclude the password
      if (!studnet) {
        return res.status(404).json({ error: "User not found" });
      }
      req.student = studnet; // Add the user to the request object
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Unauthorized - Access token expired" });
      }
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
};
