
// backend/routes/userRoutes.js

import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

// register a new user
router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

export default router;
