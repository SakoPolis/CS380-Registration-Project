
// backend/services/paymentService.js

import Purchase from "../models/purchase.js";

class PaymentService {


    async checkout(supabase, userId, amountCents) {

        const purchase = await new Purchase({
            userId,
            amountCents,
            status: 'pending',
            purchasedAt: new Date(),
        }).save();

        // The gateway for PayPal for example, would go inside .charge(), but we're not doing that for this project.
        const paymentResult = await this.gateway.charge(/*insert payment method*/);

        purchase
            .set('status', paymentResult.success ? 'confirmed' : 'failed')
            .set('refundedAt', null);
        await purchase.save();

        return purchase;
    }

    async refund(supabase, purchaseId, amountCents) {

        const purchase = await new Purchase().fetch(purchaseId);
        const refunded = await purchase.refund(amountCents);

        const { error } = await supabase
            .from('refunds')
            .insert([{ purchase_id: purchaseId, amount_cents: amountCents, refunded_at: refunded.get('refundedAt') }]);
        if (error) throw new Error(error.message);
        return refunded;
    }
}
export default new PaymentService();