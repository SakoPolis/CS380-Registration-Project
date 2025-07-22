// backend/services/courseService.js

class CourseService {
    async getAll(supabase, userId) {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('user_id', userId);
        if (error) throw new Error(error.message);
        return data;
    }
    async create(supabase, userId, courseData) {
        const { data, error } = await supabase
            .from('courses')
            .insert([{ ...courseData, user_id: userId }])
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    }
    async update(supabase, userId, id, updates) {
        const { data: existing, error: eid } = await supabase
            .from('courses')
            .select('id')
            .eq('id', id)
            .eq('user_id', userId)
            .single();
        if (eid || !existing) throw new Error('Course not found or not authorized');
        const { data, error } = await supabase
            .from('courses')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    }
    async delete(supabase, id) {
        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', id);
        if (error) throw new Error(error.message);
        return { removed: true };
    }
}
export default new CourseService();
