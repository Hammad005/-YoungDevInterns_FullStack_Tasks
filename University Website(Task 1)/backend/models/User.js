import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'faculty'],
        default: 'faculty'
    },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
