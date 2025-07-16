
// backend/routes/paymentRoutes.js

import express              from 'express';
import PaymentController    from '../controllers/paymentController.js';

const router = express.Router();

// List all payments
router.get('/',    PaymentController.list);

// Create a new payment
router.post('/',   PaymentController.create);

// Delete a payment
router.delete('/:id', PaymentController.delete);

export default router;
