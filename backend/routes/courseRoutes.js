
// backend/routes/courseRoutes.js

import express             from 'express';
import CourseController    from '../controllers/courseController.js';

const router = express.Router();

// List all courses
router.get('/',    CourseController.list);

// Create a new course
router.post('/',   CourseController.create);

// Delete a course
router.delete('/:id', CourseController.delete);

export default router;
