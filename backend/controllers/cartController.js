
// controllers/CartController.js

import BaseController from "./baseController.js";
import * as cartService from '../services/cartService';

class CartController extends BaseController {
    constructor() {
        super(cartService);
    }

    // any cart specific override functions go here

}

export default new CartController();