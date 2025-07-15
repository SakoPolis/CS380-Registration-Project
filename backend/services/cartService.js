import supabase from "../config/supabase.js";

export async function getCartItems(user_id) {
    const { data, error } = await supabase
        .from('class_bookings')
        .select('*')
        .eq('user_id', user_id)
        .eq('status', 'booked');

    if (error) throw error;
    return data;
}

export async function addCartItem(user_id, { date, slot }) {
    const { data, error } = await supabase
        .from('class_bookings')
        .insert([
            {
                user_id,
                class_id: slot.id,  // assume your slot has an `id`
                booked_at: date,
                status: 'booked'
            }
        ])
        .single();

    if (error) throw error;
    return data;
}

export async function removeCartItem(user_id, booking_id) {
    const { data, error } = await supabase
        .from('class_bookings')
        .update({ status: 'cancelled' })
        .eq('user_id', user_id)
        .eq('id', booking_id)
        .single();

    if (error) throw error;
    return data;
}