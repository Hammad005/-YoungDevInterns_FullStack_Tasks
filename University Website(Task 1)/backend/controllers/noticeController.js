import Notice from "../models/Notice.js"

export const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find().populate("postedBy", "name role").sort({ createdAt: -1 });
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const createNotice = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    try {
        const notice = new Notice({ title, content, postedBy: req.user._id });
        await notice.save();
        res.status(201).json({ message: "Notice created successfully", notice });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const getSingleNotice = async (req, res) => {
    const {id} = req.params;
    try {
        const notice = await Notice.findById(id).populate("postedBy", "name role");
        if (!notice) {
            return res.status(404).json({ error: "Notice not found" });
        }
        res.status(200).json(notice);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const deleteNotice = async (req, res) => {
    const {id} = req.params;
    try {
        const notice = await Notice.findById(id);
        if (!notice) {
            return res.status(404).json({ error: "Notice not found" });
        }

        if (req.user.role === "admin") {
        await notice.deleteOne({_id: id});
        return res.status(200).json({ message: "Notice deleted successfully" });
        }
        if (notice.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You do not have permission to delete this notice" })
        }
        await notice.deleteOne({_id: id});
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};