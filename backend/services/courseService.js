
// backend/services/courseService.js

import { supabase } from '../config/supabase.js';

class courseService {
    // Fetch all courses (or maybe only "active" ones)
    async getAll(userId) {
        const { data, error } = await supabase
            .from('classes')
            .select('*');
        if (error) throw error;
        return data;
    }

    // Create a new course
    async create(userId, courseData) {
        const { data, error } = await supabase
            .from('classes')
            .insert([{ ...courseData }])
            .single();
        if (error) throw error;
        return data;
    }

    // Update an existing course
    async update(userId, courseId, updates) {
        const { data, error } = await supabase
            .from('classes')
            .update(updates)
            .eq('id', courseId)
            .single();
        if (error) throw error;
        return data;
    }

    // Delete (or deactivate) a course
    async remove(userId, courseId) {
        const { data, error } = await supabase
            .from('classes')
            .delete()
            .eq('id', courseId)
            .single();
        if (error) throw error;
        return data;
    }
}

export default new courseService();
