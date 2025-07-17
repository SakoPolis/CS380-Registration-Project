
// backend/controllers/classSlotController.js

import baseController from './baseController.js';
import classSlotService    from '../services/classSlotService.js';

class classSlotController extends baseController {
    constructor() {
        super(classSlotService);
    }
    // if you want to override list() to accept filters, you can override here
}

export default new classSlotController();
