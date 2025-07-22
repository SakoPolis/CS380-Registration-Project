// backend/controllers/userController.js

import supabase from '../config/supabase.js';

class UserController {
    // Sign up a new user
    async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            res.status(201).json({ user: data.user });
        } catch (err) {
            next(err);
        }
    }

    // Sign in an existing user
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                return res.status(401).json({ error: error.message });
            }
            res.json({ access_token: data.session.access_token });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();