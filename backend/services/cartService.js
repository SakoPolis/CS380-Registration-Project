
// backend/services/cartService.js

class CartService {
    async getAll(supabase, userId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
        id,
        slot_id,
        class_date,
        added_at,
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
        return data.map(item => ({
            id: item.id,
            slotId: item.slot_id,
            classDate: item.class_date,
            addedAt: item.added_at,
            ...item.class_slots && {
                dayOfWeek: item.class_slots.day_of_week,
                groupType: item.class_slots.group_type,
                startTime: item.class_slots.start_time,
                endTime: item.class_slots.end_time,
                priceCents: item.class_slots.price_cents,
                capacity: item.class_slots.capacity
            }
        }));
    }
    async add(supabase, userId, cartData) {
        const { data: slotData, error: slotError } = await supabase
            .from('class_slots')
            .select('id')
            .eq('id', cartData.slot_id)
            .single();
        if (slotError || !slotData) throw new Error('Slot not found');
        const { data, error } = await supabase
            .from('cart_items')
            .insert([{ user_id: userId, slot_id: cartData.slot_id, class_date: cartData.class_date }])
            .select()
            .single();
        if (error) throw new Error(error.message);
        return { id: data.id, slotId: data.slot_id, classDate: data.class_date, addedAt: data.added_at };
    }
    async delete(supabase, userId, itemId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId)
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        return { removed: true };
    }
}
export default new CartService();