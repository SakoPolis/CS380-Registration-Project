
// controllers/PaymentController.js

import BaseController  from "./baseController.js";
import paymentService  from "../services/paymentService.js";

class PaymentController extends BaseController {
    constructor() {
        super(paymentService);
    }
    async checkout(req, res, next) {
        try {
            const userId = req.user.id;
            const result = await paymentService.checkout(userId);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new PaymentController();
