
// backend/routes/cartRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import cartController from '../controllers/cartController.js';

const router = Router();

router.use(authenticate);

// list all cart items
router.get('/', cartController.getAll);

// add a new cart item
router.post('/', cartController.create);

// remove a cart item
router.delete('/:id', cartController.delete);

export default router;
