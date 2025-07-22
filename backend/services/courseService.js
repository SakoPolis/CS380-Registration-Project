// backend/services/courseService.js
import supabase from '../config/supabase.js';

class CourseService {
    async getAll(userId) {
        const { data, error } = await supabase
            .from('courses')
            .select('id, title, description, price_cents, user_id')
            .eq('user_id', userId);

        if (error) throw new Error(error.message);

        return data.map(course => ({
            id: course.id,
            title: course.title,
            description: course.description,
            priceCents: course.price_cents
        }));
    }

    async create(userId, courseData) {
        const { data, error } = await supabase
            .from('courses')
            .insert([{
                title: courseData.title,
                description: courseData.description,
                price_cents: courseData.price_cents,
                user_id: userId
            }])
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            id: data.id,
            title: data.title,
            description: data.description,
            priceCents: data.price_cents
        };
    }

    async update(userId, id, updates) {
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('id, user_id')
            .eq('id', id)
            .eq('user_id', userId)
            .single();

        if (courseError || !courseData) {
            throw new Error('Course not found or not authorized');
        }

        const { data, error } = await supabase
            .from('courses')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            id: data.id,
            title: data.title,
            description: data.description,
            priceCents: data.price_cents
        };
    }

    async delete(id) {
        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);

        return { removed: true };
    }
}

export default new CourseService();