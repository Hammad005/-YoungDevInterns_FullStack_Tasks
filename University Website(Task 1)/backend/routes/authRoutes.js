import express from 'express';
import { register, login, makeAdmin, deleteUser, getUserData, logout, getTotalUsers, getTotalAdmins, getAllFaculty, getSingleFaculty, getAdmins, makeFaculty } from '../controllers/authController.js';
import { adminOnly, protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/getUserData', protectRoute, getUserData);
router.get('/getTotalAdmin', protectRoute, getTotalAdmins);
router.get('/getTotalUser', protectRoute, getTotalUsers);
router.get('/getAllFaculty', protectRoute, getAllFaculty);
router.get('/getSingleFaculty/:id', protectRoute, getSingleFaculty);
router.get('/getAdmins', protectRoute, adminOnly, getAdmins);

router.post('/register', protectRoute, adminOnly, register);
router.post('/login', login);
router.post('/logout', logout);

router.put('/make-admin/:id', protectRoute, adminOnly, makeAdmin);
router.put('/make-faculty/:id', protectRoute, adminOnly, makeFaculty);

router.delete('/removeUser/:id', protectRoute, adminOnly, deleteUser);

export default router;