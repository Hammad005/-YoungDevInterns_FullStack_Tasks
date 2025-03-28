import express from 'express';
import { register, login, logout, checkAuth, getAllSchoolAdmin, getSingleSchoolAdmin, deleteSchoolAdmin } from '../controllers/authController.js';
import { adminOnly, protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/checkAuth', protectRoute, checkAuth);
router.get('/getAllSchoolAdmin', protectRoute, adminOnly, getAllSchoolAdmin);
router.get('/getSingleSchoolAdmin/:id', protectRoute, adminOnly, getSingleSchoolAdmin);

router.post('/register', protectRoute, register);
router.post('/login', login);
router.post('/logout', protectRoute, logout);

router.put('/editAdmin', protectRoute, logout);

router.delete('/deleteSchoolAdmin/:id', protectRoute, adminOnly, deleteSchoolAdmin);
export default router;