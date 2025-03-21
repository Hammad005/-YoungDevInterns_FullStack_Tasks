import express from 'express';
import { createEvent, deleteEvent, getEvents, getSingleEvent } from '../controllers/eventController.js';
import { protectRoute, adminOnly } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getSingleEvent);

router.post('/', protectRoute, adminOnly, createEvent);
router.delete('/:id', protectRoute, adminOnly, deleteEvent);

export default router;