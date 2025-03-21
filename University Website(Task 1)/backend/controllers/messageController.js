import Message from "../models/Messages.js";

export const sendMessage = async (req, res) => {
    const {name, subject, message} = req.body;
    try {
        const mess = await new Message({name, subject, message});
        await mess.save();
        res.status(201).json({message:"Message Sent Successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }  
};

export const getMessages =  async (req, res) => {
    try {
        const messages = await Message.find().sort({createdAt: -1});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const getSingleMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const deleteMessage = async (req, res) => {
    const {id} = req.params;
    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: "Message already deleted" });
        }
        await message.deleteOne({_id: id});
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};