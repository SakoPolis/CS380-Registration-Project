
// controllers/cartController.js

import BaseController    from './baseController.js';
import CartService       from '../services/cartService.js';

class CartController extends BaseController {
    constructor() {
        super(CartService);
        this.cancel    = this.cancel.bind(this);
        this.cancelAll = this.cancelAll.bind(this);
    }

    async cancel(req, res, next) {
        try {
            const result = await this.service.cancel(req.params.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async cancelAll(req, res, next) {
        try {
            const result = await this.service.cancelAll(req.user.id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new CartController();
