import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({createdAt: -1});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const getCourseByFaculty = async (req, res) => {
    const {name} = req.params;
    try {
        const course = await Course.find({ faculty: name });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const getSingleCourse = async (req, res) => {
    const {id} = req.params;
    try {
        const course = await Course.findById(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const createCourse = async (req, res) => {
    const { title, description, faculty } = req.body;
    try {
        const course = new Course({ title, description, faculty });
        await course.save();
        res.status(201).json({ message: "Course created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const deleteCourse = async (req, res) => {
    const {id}  = req.params;
    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        await course.deleteOne({_id: id});
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};