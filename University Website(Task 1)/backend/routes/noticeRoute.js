import express from 'express';
import { createNotice, deleteNotice, getNotices, getSingleNotice } from '../controllers/noticeController.js';
import { adminOnly, protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getNotices);
router.get('/getSingleNotice/:id', getSingleNotice);
router.post('/',protectRoute, createNotice);
router.delete('/:id',protectRoute, deleteNotice);

export default router;