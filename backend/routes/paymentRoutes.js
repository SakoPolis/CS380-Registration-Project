
// backend/routes/paymentRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import paymentController from '../controllers/paymentController.js';

const router = Router();

router.use(authenticate);

// create a purchase
router.post('/checkout', paymentController.checkout);

export default router;
