
// backend/middleware/auth.js

import { makeSupabaseClient } from '../config/supabase.js';
export async function authenticate(req, res, next) {
    const h = req.headers.authorization;

    if (!h?.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing or malformed Authorization header' });

    const token = h.split(' ')[1];

    req.supabase = makeSupabaseClient(token);

    const { data: { user }, error } = await req.supabase.auth.getUser();

    if (error || !user) return res.status(401).json({ error: 'Invalid or expired token' });

    req.user = { id: user.id, appMetadata: user.app_metadata };

    next();
}