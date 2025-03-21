import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    }
}, {timestamps: true});
const Event = mongoose.model('Event', eventSchema);
export default Event;