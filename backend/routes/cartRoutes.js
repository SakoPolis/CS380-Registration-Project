
// backend/routes/cartRoutes.js

import express            from 'express';
import cartController     from '../controllers/cartController.js';

const router = express.Router();

// List all cart items
router.get('/',    cartController.list);

// Add a new cart item
router.post('/',   cartController.create);

// Remove a cart item
router.delete('/:id', cartController.delete);

export default router;
