
// backend/routes/classSlotRoutes.js

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import ClassSlotController from '../controllers/classSlotController.js';

const router = express.Router();

// List all slots
router.get('/slots', authenticate, ClassSlotController.getAll);
// Search slots by day & group
router.get('/slots/search', authenticate, ClassSlotController.getByDayAndGroup);
// Create a new slot
router.post('/slots', authenticate, ClassSlotController.create);
// Delete a slot
router.delete('/slots/:id', authenticate, ClassSlotController.delete);

export default router;