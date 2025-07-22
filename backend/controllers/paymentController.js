// backend/controllers/paymentController.js

import PaymentService from '../services/paymentService.js';
class PaymentController {

    async checkout(req, res, next) {

        try {

            const r = await PaymentService.checkout(req.supabase, req.user.id, req.body);
            res.json(r);

        } catch(e) { next(e); }
    }

    async refund(req, res, next) {
        try {
            const r = await PaymentService.refund(req.supabase, req.params.purchase_id, req.body.amount_cents);
            res.json(r);

        } catch(e) { next(e); }
    }
}
export default new PaymentController();