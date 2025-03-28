import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { addStaff, deleteStaff, editStaff, getAllStaff, getSingleStaff } from '../controllers/staffController.js';

const router = express.Router();

router.get('/getAllStaff/:id', protectRoute, getAllStaff);
router.get('/getSingleStaff/:id', protectRoute, getSingleStaff);

router.post('/addStaff', protectRoute, addStaff);

router.put('/editStaff/:id', protectRoute, editStaff);

router.delete('/deleteStaff/:id', protectRoute, deleteStaff);

export default router;