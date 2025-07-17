
// controllers/CartController.js

import baseController from "./baseController.js";
import cartService from '../services/cartService';

class cartController extends baseController {
    constructor() {
        super(cartService);
    }

    // any cart specific override functions go here

}

export default new cartController();