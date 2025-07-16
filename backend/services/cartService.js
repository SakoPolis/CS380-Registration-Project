
// backend/services/CartService.js

import { supabase } from '../config/supabase.js';

class CartService {
    constructor() {
        //dependencies go here
    }

    /** Fetch all “booked” items for a user */
    async getAll(userId) {
        const { data, error } = await supabase
            .from('class_bookings')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'booked');
        if (error) throw error;
        return data;
    }

    /** Add a new booking */
    async create(userId, { date, slot }) {
        const { data, error } = await supabase
            .from('class_bookings')
            .insert([{
                user_id:   userId,
                class_id:  slot.id,
                booked_at: date,
                status:    'booked'
            }])
            .single();
        if (error) throw error;
        return data;
    }

    /** “Cancel” a booking (mark refunded) */
    async remove(userId, bookingId) {
        const { data, error } = await supabase
            .from('class_bookings')
            .update({ status: 'cancelled' })
            .eq('user_id', userId)
            .eq('id', bookingId)
            .single();
        if (error) throw error;
        return data;
    }
}

export default new CartService();
