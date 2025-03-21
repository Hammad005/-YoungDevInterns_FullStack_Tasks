import express from 'express';
import { createCourse, deleteCourse, getCourseByFaculty, getCourses, getSingleCourse } from '../controllers/courseController.js';
import { adminOnly, protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getCourses);
router.get('/getSingleCourse/:id', getSingleCourse);
router.get('/getCourseByFaculty/:name', protectRoute, getCourseByFaculty);

router.post('/', protectRoute, createCourse);

router.delete('/deleteCourse/:id', protectRoute, adminOnly, deleteCourse)

export default router;