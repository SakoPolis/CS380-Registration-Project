
// backend/services/paymentService.js

import supabase from '../config/supabase.js';
import cartService from './cartService.js';
import Purchase from '../models/purchase.js';

class PaymentService {
    async checkout(userId, paymentDetails) {
    }

    async refund(purchaseId, refundAmountCents) {
        const purchase = await new Purchase().fetch(purchaseId);
        // Perform refund once:
        const refundedPurchase = await purchase.refund(refundAmountCents);
        // Log the refund
        const { error } = await supabase.from('refunds').insert([
            {
                purchase_id: purchaseId,
                amount_cents: refundAmountCents,
                refunded_at: refundedPurchase.get('refundedAt')
            }
        ]);
        if (error) throw new Error(error.message);
        return refundedPurchase;
    }
}

export default new PaymentService();
