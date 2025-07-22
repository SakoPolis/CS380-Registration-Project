
// backend/routes/classSlotRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import classSlotController from '../controllers/classSlotController.js';

const router = Router();

router.use(authenticate);

// list all class slots
router.get('/', classSlotController.getAll);

// create a new slot
router.post('/', classSlotController.create);

// remove a slot
router.delete('/:id', classSlotController.delete);

export default router;