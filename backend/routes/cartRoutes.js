
// backend/routes/cartRoutes.js

import express            from 'express';
import CartController     from '../controllers/cartController.js';

const router = express.Router();

// List all cart items
router.get('/',    CartController.list);

// Add a new cart item
router.post('/',   CartController.create);

// Remove a cart item
router.delete('/:id', CartController.delete);

export default router;
