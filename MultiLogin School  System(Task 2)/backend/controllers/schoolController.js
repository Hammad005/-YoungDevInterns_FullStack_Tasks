import Admin from "../models/Admin.js";
import School from "../models/School.js";
import Staff from "../models/Staff.js";

export const resgister = async (req, res) => {
    const {name, address, contact} = req.body;
    try {
        const school = await School.findOne({name});
        if (school) {
            return res.status(400).json({error: "School already exists"});
        };
        const newSchool = new School({
            name,
            address,
            contact,
        });
        await newSchool.save();
        return res.status(201).json({message: "School created successfully", newSchool});
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const editSchool = async (req, res) => {
    const newSchoolData = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
    }
    try {
        const school = await School.findByIdAndUpdate(req.admin.schoolId, newSchoolData, {
            new: true,
            runValidators: true, 
            useFindAndModify: false
        });
        if (!school) {
            return res.status(404).json({ message: "School not found" });
        }
        return res.status(200).json({ message: "School updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const deleteSchool = async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return res.status(404).json({ error: "School not found" });
        }
        const schoolAdmin = await Admin.findById(school.adminId);
        if (schoolAdmin) {
            await schoolAdmin.deleteOne();
        }
        await Staff.deleteMany({ schoolId: req.params.id });
        await school.deleteOne();
        return res.status(200).json({ message: "School deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};
export const getAllSchool = async (req, res) => {
    try {
        const schools = await School.find().populate('adminId', 'name').sort({ createdAt: -1 });
        return res.status(200).json({ schools });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getSingleSchool = async (req, res) => {
    try {
        const school = await School.findById(req.params.id).populate('adminId', 'name email');
        if (!school) {
            return res.status(404).json({ error: "School not found" });
        }
        return res.status(200).json({ school });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server" });
    }
}