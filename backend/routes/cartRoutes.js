// backend/routes/cartRoutes.js
import express from 'express';
import { getCart, postCart, deleteCartItem } from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);   // ensure req.user is set
router.get('/', getCart);
router.post('/', postCart);
router.delete('/:id', deleteCartItem);

export default router;
