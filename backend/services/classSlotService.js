// backend/services/classSlotService.js

class ClassSlotService {
    async getAll(supabase) {
        const { data, error } = await supabase.from('class_slots').select('*');
        if (error) throw new Error(error.message);
        return data;
    }

    async getByDayAndGroup(supabase, day, group) {
        const { data, error } = await supabase
            .from('class_slots')
            .select('*')
            .eq('day_of_week', day)
            .eq('group_type', group);
        if (error) throw new Error(error.message);
        return data;
    }

    // userId is not used here, but left for consistency with other services
    async create(supabase, userId, slotData) {
        const { data, error } = await supabase
            .from('class_slots')
            .insert({ ...slotData })   // you can also use .insert([{ ...slotData }])
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    async delete(supabase, id) {
        const { error } = await supabase
            .from('class_slots')
            .delete()
            .eq('id', id);
        if (error) throw new Error(error.message);
        return { removed: true };
    }
}

export default new ClassSlotService();
