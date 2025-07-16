
// backend/routes/userRoutes.js

import express             from 'express';
import UserController      from '../controllers/userController.js';

const router = express.Router();

// Sign up a new user
router.post('/signup',    UserController.signUp);

// Sign in an existing user
router.post('/signin',    UserController.signIn);

// router.get('/profile',   UserController.getProfile);
// router.put('/profile',   UserController.updateProfile);

export default router;
