// backend/controllers/classSlotController.js
import BaseController from './baseController.js';
import ClassSlotService from '../services/classSlotService.js';

class ClassSlotController extends BaseController {
    constructor() {
        super(ClassSlotService);
    }
}

export default new ClassSlotController(); // Export instance