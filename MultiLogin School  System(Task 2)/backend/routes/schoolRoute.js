import express from 'express';
import { adminOnly, protectRoute } from '../middlewares/authMiddleware.js';
import { deleteSchool, editSchool, getAllSchool, getSingleSchool, resgister } from '../controllers/schoolController.js';

const router = express.Router();

router.post('/register', protectRoute, adminOnly, resgister);

router.get('/getAllSchool', protectRoute, adminOnly, getAllSchool);
router.get('/getSingleSchool/:id', protectRoute, getSingleSchool);

router.put('/editSchool/:id', protectRoute, editSchool);

router.delete('/deleteSchool/:id', protectRoute, adminOnly, deleteSchool);

export default router;