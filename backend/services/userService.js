
// backend/services/userService.js

import { supabase } from '../config/supabase.js';

class UserService {
    async signUp(email, password, firstName, lastName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { firstName, lastName } },
        });
        if (error) throw new Error(error.message);
        return data;
    }

    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return data;
    }

    async getUser(userId) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }
}

export default new UserService();