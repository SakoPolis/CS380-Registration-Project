// backend/services/bookingService.js

class BookingService {
    async getAll(supabase, userId) {
        const { data, error } = await supabase
            .from('class_bookings')
            .select(`
        id,
        slot_id,
        class_date,
        booked_at,
        status,
        class_slots (
          id,
          day_of_week,
          group_type,
          start_time,
          end_time,
          price_cents,
          capacity
        )
      `)
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        return data.map(b => ({ id: b.id, slotId: b.slot_id, classDate: b.class_date, bookedAt: b.booked_at, status: b.status, ...b.class_slots && { dayOfWeek: b.class_slots.day_of_week, groupType: b.class_slots.group_type, startTime: b.class_slots.start_time, endTime: b.class_slots.end_time, priceCents: b.class_slots.price_cents, capacity: b.class_slots.capacity } }));
    }
    async add(supabase, userId, bookingData) {
        // assume validation of slot existence done in controller
        const { data, error } = await supabase
            .from('class_bookings')
            .insert([{ user_id: userId, slot_id: bookingData.slot_id, class_date: bookingData.class_date, status: 'booked' }])
            .select()
            .single();
        if (error) throw new Error(error.message);
        return { id: data.id, slotId: data.slot_id, classDate: data.class_date, bookedAt: data.booked_at, status: data.status };
    }
    async delete(supabase, userId, id) {
        const { error } = await supabase
            .from('class_bookings')
            .delete()
            .eq('id', id)
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        return { removed: true };
    }
}
export default new BookingService();
