
// backend/services/paymentService.js

class PaymentService {
    async checkout(supabase, userId, paymentDetails) {
        // implement purchase logic…
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