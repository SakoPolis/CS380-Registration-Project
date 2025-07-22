
// backend/routes/userRoutes.js

import express from 'express';
import UserController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public: signup and signin
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

// (Optional) Protected user endpoints can go here, e.g.:
// router.get('/me', authenticate, UserController.getProfile);

export default router;
