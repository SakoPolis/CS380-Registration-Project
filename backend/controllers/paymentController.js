// controllers/paymentController.js
import BaseController     from './baseController.js';
import PaymentService     from '../services/paymentService.js';

class PaymentController extends BaseController {
    constructor() {
        super(PaymentService);
        this.checkout = this.checkout.bind(this);
        this.refund = this.refund.bind(this);
    }

    async checkout(req, res, next) {
        try {
            const result = await this.service.checkout(req.user.id, req.body);
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    async refund(req, res, next) {
        try {
            const refunded = await this.service.refund(req.params.id, req.body.refundAmountCents);
            res.json(refunded);
        } catch (err) {
            next(err);
        }
    }
}

export default new PaymentController();
