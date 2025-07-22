// backend/config/supabase.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv'; dotenv.config();

const SUPA_URL = process.env.SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_KEY;

// global anon client—for auth routes only
const supabase = createClient(SUPA_URL, SUPA_KEY);

// per-request factory—for injecting the JWT on data calls
export function makeSupabaseClient(token) {
    return createClient(SUPA_URL, SUPA_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } }
    });
}

export default supabase;