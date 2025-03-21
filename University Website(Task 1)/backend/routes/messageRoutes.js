import express from 'express';
import { adminOnly, protectRoute } from '../middleware/authMiddleware.js';
import { deleteMessage, getMessages, getSingleMessage, sendMessage } from '../controllers/messageController.js';

const router = express.Router();


router.get('/getMessages', protectRoute, getMessages);
router.get('/getSingleMessage/:id', protectRoute, getSingleMessage);

router.post('/sendMessage', sendMessage);

router.delete('/deleteMessage/:id', protectRoute, adminOnly, deleteMessage);

export default router;