// backend/services/classSlotService.js
import supabase from '../config/supabase.js';

class ClassSlotService {
    async getAll(userId) {
        const { data, error } = await supabase
            .from('class_slots')
            .select(`
                id,
                class_id,
                day_of_week,
                group_type,
                start_time,
                end_time,
                capacity,
                price_cents,
                courses (
                    id,
                    title,
                    user_id
                )
            `);

        if (error) throw new Error(error.message);

        return data.map(slot => ({
            id: slot.id,
            classId: slot.class_id,
            dayOfWeek: slot.day_of_week,
            groupType: slot.group_type,
            startTime: slot.start_time,
            endTime: slot.end_time,
            capacity: slot.capacity,
            priceCents: slot.price_cents,
            classTitle: slot.courses?.title || null
        }));
    }

    async create(userId, slotData) {
        // Only check if the course exists, no user_id restriction
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('id')
            .eq('id', slotData.class_id)
            .single();

        if (courseError || !courseData) {
            throw new Error('Course not found');
        }

        const { data, error } = await supabase
            .from('class_slots')
            .insert([{
                class_id: slotData.class_id,
                day_of_week: slotData.day_of_week,
                group_type: slotData.group_type,
                start_time: slotData.start_time,
                end_time: slotData.end_time,
                capacity: slotData.capacity,
                price_cents: slotData.price_cents
            }])
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            id: data.id,
            classId: data.class_id,
            dayOfWeek: data.day_of_week,
            groupType: data.group_type,
            startTime: data.start_time,
            endTime: data.end_time,
            capacity: data.capacity,
            priceCents: data.price_cents
        };
    }

    async update(userId, id, updates) {
        const { data: slotData, error: slotError } = await supabase
            .from('class_slots')
            .select('class_id, courses (id)')
            .eq('id', id)
            .single();

        if (slotError || !slotData) {
            throw new Error('Slot not found');
        }

        const { data, error } = await supabase
            .from('class_slots')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            id: data.id,
            classId: data.class_id,
            dayOfWeek: data.day_of_week,
            groupType: data.group_type,
            startTime: data.start_time,
            endTime: data.end_time,
            capacity: data.capacity,
            priceCents: data.price_cents
        };
    }

    async delete(id) {
        const { error } = await supabase
            .from('class_slots')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);

        return { removed: true };
    }
}

export default new ClassSlotService();