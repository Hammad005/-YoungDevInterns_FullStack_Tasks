import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'schoolAdmin'],
        default: 'schoolAdmin',
        required: [true, 'Please select a role']
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6
    },
}, {timestamps: true});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
