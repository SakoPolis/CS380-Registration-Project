// backend/services/bookingService.js

class BookingService {
    async getAll(supabase, userId) {
        const { data, error } = await supabase
            .from('bookings')                      // << table name
            .select('id, slot_id, class_date, booked_at, status')
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        return (data || []).map(b => ({
            id: b.id,
            slotId: b.slot_id,
            classDate: b.class_date,
            bookedAt: b.booked_at,
            status: b.status,
        }));
    }

    async add(supabase, userId, bookingData) {
        // Optional: validate slot exists to give a clear error
        const { data: slot, error: slotErr } = await supabase
            .from('class_slots')
            .select('id')
            .eq('id', bookingData.slot_id)
            .single();
        if (slotErr || !slot) throw new Error('Slot not found');

        const { data, error } = await supabase
            .from('bookings')                      // << table name
            .insert({
                user_id: userId,
                slot_id: bookingData.slot_id,
                class_date: bookingData.class_date,
                status: 'booked',
            })
            .select()
            .single();
        if (error) throw new Error(error.message);

        return {
            id: data.id,
            slotId: data.slot_id,
            classDate: data.class_date,
            bookedAt: data.booked_at,
            status: data.status,
        };
    }

    async delete(supabase, userId, id) {
        const { error } = await supabase
            .from('bookings')                      // << table name
            .delete()
            .eq('id', id)
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        return { removed: true };
    }
}

export default new BookingService();
