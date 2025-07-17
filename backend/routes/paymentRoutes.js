
// backend/routes/paymentRoutes.js

import express              from 'express';
import paymentController    from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// List all payments
router.get('/',    paymentController.list);

// Create a new payment
router.post('/',   paymentController.create);

// Delete a payment
router.delete('/:id', paymentController.delete);

router.post('/checkout', authenticate, paymentController.checkout);

export default router;