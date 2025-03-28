import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
export const protectRoute = async (req, res, next) => {
  const accessToken = req.cookies.token;
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    try {
      const admin = await Admin.findById(decoded.id).select("-password");
      if (!admin) {
        return res.status(401).json({ error: "Unauthorized, Please login" });
      }
      req.admin = admin;
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

export const adminOnly = async (req, res, next) => {
  if (req.admin?.role === 'admin') {
    next();
}else{
    return res.status(403).json({ error: 'Access denied: Admin only' });
}
}
