
// backend/services/userService.js

import supabase from '../config/supabase.js';

class UserService {
    async signUp(email, password) {
        const { data: { user }, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return user;
    }

    async signIn(email, password) {
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw new Error(error.message);
        return session;
    }

    async getUser(id) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }
}

export default new UserService();