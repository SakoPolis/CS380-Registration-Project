
// backend/routes/courseRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import CourseController from '../controllers/courseController.js';

const router = Router();
// Protect all course routes
router.use(authenticate);

// List all courses
router.get('/', CourseController.getAll);
// Create a new course
router.post('/', CourseController.create);
// Update a course
router.put('/:id', CourseController.update);
// Delete a course
router.delete('/:id', CourseController.delete);

export default router;