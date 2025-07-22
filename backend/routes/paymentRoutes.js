

// backend/routes/paymentRoutes.js

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import PaymentController from '../controllers/paymentController.js';

const router = express.Router();
// Protect all payment routes
router.use(authenticate);

// Checkout (create a purchase)
router.post('/checkout', PaymentController.checkout);
// Refund a purchase
router.post('/refund/:purchaseId', PaymentController.refund);

export default router;