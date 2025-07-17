
// backend/routes/slotRoutes.js

import express          from 'express';
import classSlotController   from '../controllers/classSlotController.js';
import { authenticate, /*requireAdmin*/ } from '../middleware/auth.js';

const router = express.Router();

// All users can view slots
router.get('/',   authenticate, classSlotController.list);

// Only admins can create/update/delete slots
router.post('/',        authenticate, /*requireAdmin,*/ classSlotController.create);
router.put('/:id',      authenticate, /*requireAdmin,*/ classSlotController.update);
router.delete('/:id',   authenticate, /*requireAdmin,*/ classSlotController.delete);

export default router;
