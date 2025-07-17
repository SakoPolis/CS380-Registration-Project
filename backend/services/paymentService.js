
// backend/services/paymentService.js

import { supabase } from '../config/supabase.js';

class paymentService {
    // Fetch all payments for this user
    async getAll(userId) {
        const { data, error } = await supabase
            .from('purchases')
            .select('*')
            .eq('user_id', user_id);
        if (error) throw error;
        return data;
    }

    // Create a new payment / purchase
    async create(userId, paymentData) {
        const { data, error } = await supabase
            .from('purchases')
            .insert([{ user_id, ...paymentData }])
            .single();
        if (error) throw error;
        return data;
    }

    // Optionally confirm a pending payment
    async confirm(userId, purchaseId) {
        const { data, error } = await supabase
            .from('purchases')
            .update({ status: 'confirmed' })
            .eq('id', purchaseId)
            .single();
        if (error) throw error;
        return data;
    }

    // Refund an existing purchase
    async refund(userId, purchaseId, refundAmount) {
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
    async remove(userId, purchaseId) {
        const { data, error } = await supabase
            .from('purchases')
            .delete()
            .eq('id', purchaseId)
            .single();
        if (error) throw error;
        return data;
    }
    async checkout(userId) {
        const cartItems = await cartService.getAll(userId);
        if (!cartItems || cartItems.length === 0) {
            throw new Error("Cart is empty.");
        }

        const purchaseRecords = cartItems.map(item => ({
            user_id: userId,
            class_id: item.class_id,
            price: item.price,
            status: 'confirmed',
            purchased_at: new Date(),
        }));

        const { data, error } = await supabase
            .from('purchases')
            .insert(purchaseRecords)
            .select();

        if (error) throw error;

        // Optionally: mark cart items as purchased (or remove them)
        // await cartService.clear(userId); <-- if you had a clear function

        return data;
    }
}

export default new paymentService();