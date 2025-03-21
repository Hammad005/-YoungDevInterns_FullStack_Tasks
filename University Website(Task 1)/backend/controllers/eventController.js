import Events from "../models/Events.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Events.find().sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
export const getSingleEvent = async (req, res) => {
    const {id} = req.params;
    try {
        const event = await Events.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const createEvent = async (req, res) => {
    const { name, description, date, time,  location } = req.body;
    try {
        const event = new Events({ name, description, date, time, location });
        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        await event.deleteOne();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
}