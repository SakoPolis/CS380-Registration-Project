
// backend/services/paymentService.js

import { supabase } from '../config/supabase.js';

class PaymentService {
    // Fetch all payments for this user
    async getAll(user_id) {
        const { data, error } = await supabase
            .from('purchases')
            .select('*')
            .eq('user_id', user_id);
        if (error) throw error;
        return data;
    }

    // Create a new payment / purchase
    async create(user_id, paymentData) {
        const { data, error } = await supabase
            .from('purchases')
            .insert([{ user_id, ...paymentData }])
            .single();
        if (error) throw error;
        return data;
    }

    // Optionally confirm a pending payment
    async confirm(user_id, purchaseId) {
        const { data, error } = await supabase
            .from('purchases')
            .update({ status: 'confirmed' })
            .eq('id', purchaseId)
            .single();
        if (error) throw error;
        return data;
    }

    // Refund an existing purchase
    async refund(user_id, purchaseId, refundAmount) {
        const { data, error } = await supabase
            .from('purchases')
            .update({ status: 'refunded', refunded_at: new Date() })
            .eq('id', purchaseId)
            .single();
        if (error) throw error;
        // You might also insert into the `refunds` table here
        return data;
    }

    // Delete (rarely used) – could void a payment
    async remove(user_id, purchaseId) {
        const { data, error } = await supabase
            .from('purchases')
            .delete()
            .eq('id', purchaseId)
            .single();
        if (error) throw error;
        return data;
    }
}

export default new PaymentService();
