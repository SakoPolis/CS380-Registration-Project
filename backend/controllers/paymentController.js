// backend/controllers/paymentController.js

import PaymentService from '../services/paymentService.js';
import { sendConfirmationEmail } from '../utilities/sendConfirmationEmail.js';

class PaymentController {

    async checkout(req, res, next) {

        try {

            const r = await PaymentService.checkout(req.supabase, req.user.id, req.body);

            console.log('DEBUG: checkout result ->', r);
            console.log('DEBUG: user info ->', req.user);


            const userEmail = req.user.email;

            const classDetails = r.classes || [];

            await sendConfirmationEmail(userEmail, classDetails);

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