
// backend/routes/courseRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import courseController from '../controllers/courseController.js';

const router = Router();

router.use(authenticate);

// list all courses
router.get('/', courseController.getAll);

// create a new course
router.post('/', courseController.create);

// delete a course
router.delete('/:id', courseController.delete);

export default router;
