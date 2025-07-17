
// backend/routes/userRoutes.js

import express             from 'express';
import userController      from '../controllers/userController.js';

const router = express.Router();

// Sign up a new user
router.post('/signup',    userController.signUp);

// Sign in an existing user
router.post('/signin',    userController.signIn);

// router.get('/profile',   userController.getProfile);
// router.put('/profile',   userController.updateProfile);

export default router;
