
// backend/routes/cartRoutes.js

import express from 'express';
import CartController from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// List all cart items
router.get('/', authenticate, CartController.getAll);
// Add item to cart
router.post('/', authenticate, CartController.add);
// Remove item from cart
router.delete('/:id', authenticate, CartController.delete);
// Clear Cart
router.delete('/',     authenticate, CartController.clear);

export default router;