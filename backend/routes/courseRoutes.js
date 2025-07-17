
// backend/routes/courseRoutes.js

import express             from 'express';
import courseController    from '../controllers/courseController.js';

const router = express.Router();

// List all courses
router.get('/',    courseController.list);

// Create a new course
router.post('/',   courseController.create);

// Delete a course
router.delete('/:id', courseController.delete);

export default router;
