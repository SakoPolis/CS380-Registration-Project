
// backend/routes/bookingRoutes.js

import express from 'express';
import BookingController from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// List all bookings
router.get('/bookings', authenticate, BookingController.getAll);
// Create a new booking
router.post('/bookings', authenticate, BookingController.create);
// Cancel a booking (delete)
router.delete('/bookings/:id', authenticate, BookingController.delete);

export default router;