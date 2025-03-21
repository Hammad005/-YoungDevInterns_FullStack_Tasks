import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter course title']
    },
    description: {
        type: String,
    },
    faculty: {
        type: String,
        required: [true, 'Please enter faculty name']
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;