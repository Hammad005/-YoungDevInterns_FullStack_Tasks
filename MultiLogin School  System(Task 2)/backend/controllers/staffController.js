import Staff from "../models/Staff.js";

export const addStaff = async (req, res) => {
  const { name, email, role, phone, subjects, schoolId } = req.body;
  try {
    
        const staff = new Staff({
          name,
          email,
          role,
          phone,
          subjects,
          schoolId,
        });
        await staff.save();
        return res.status(201).json({ staff });
    
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const editStaff = async (req, res) => {
  const newStaffData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    phone: req.body.phone,
    subjects: req.body.subjects,
  };
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, newStaffData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    return res.status(200).json({ message: "Staff updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    await staff.deleteOne();
    return res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    if (req.admin.role === "schoolAdmin") {
      const staff = await Staff.find({ schoolId: req.admin.schoolId }).sort({
        createdAt: -1,
      });
      return res.status(200).json({ staff });
    }
    const staff = await Staff.find({ schoolId: req.params.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ staff });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const getSingleStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    return res.status(200).json({ staff });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
