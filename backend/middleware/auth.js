
// backend/middleware/auth.js

import supabase from '../config/supabase.js';

/**
 * Middleware to verify the user’s JWT from the Authorization header
 * and attach the Supabase user object to req.user.
 */
export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Missing or malformed Authorization header' });
        }

        const token = authHeader.split(' ')[1];
        // Supabase v2: getUser(token)
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

export function requireAdmin(req, res, next) {
    /*const user = req.user;
    if (!user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    // Supabase stores custom claims in user.app_metadata
    const isAdmin = user.app_metadata?.is_admin === true;
    if (!isAdmin) {
        return res.status(403).json({ error: 'Forbidden: admin only' });
    }

    next();*/
}
