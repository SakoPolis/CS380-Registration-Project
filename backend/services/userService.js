
// backend/services/userService.js

import { makeSupabaseClient } from '../config/supabase.js';

class UserService {
    async signUp(email, password) {
        const { data: { user }, error } = await makeSupabaseClient.auth.signUp({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return user;
    }

    async signIn(email, password) {
        const { data: { session }, error } = await makeSupabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return session;
    }

    async getUser(id) {
        const { data, error } = await makeSupabaseClient
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }
}

export default new UserService();