
// backend/services/classSlotService.js

import supabase from '../config/supabase.js';

class classSlotService {
    // Fetch all courses (or maybe only "active" ones)
    async getAll(userId, filters = {}) {
        let query = supabase.from('class_slots').select('*');
        if (filters.month) {
            query = query
                .gte('date', `${filters.month}-01`)
                .gte('date', `${filters.month}-02`)
        }
        const {data, error} = await query;
        if(error) throw error;
        return data;
    }

    // Create a new course
    async create(userId, slotData) {
        const { data, error } = await supabase
            .from('class_slots')
            .insert([{ ...slotData }])
            .single();
        if (error) throw error;
        return data;
    }

    // Update an existing slot
    async update(userId, id, updates) {
        const { data, error } = await supabase
            .from('class_slots')
            .update(updates)
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    }

    // Delete a slot
    async remove(userId, id) {
        const { data, error } = await supabase
            .from('class_slots')
            .delete()
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    }

}

export default new classSlotService();
