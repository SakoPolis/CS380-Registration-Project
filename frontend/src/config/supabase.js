// frontend/src/config/supabase.js
import { createClient } from "@supabase/supabase-js";

// Vite exposes frontend envs as import.meta.env and requires the VITE_ prefix
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Global anon client — safe for browser (uses anon public key)
// Supabase JS will handle session storage and Authorization headers automatically
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
});

// Optional factory — only needed if you explicitly want to inject a token
export function makeSupabaseClient(token) {
    return createClient(supabaseUrl, supabaseAnonKey, {
        ...(token
            ? { global: { headers: { Authorization: `Bearer ${token}` } } }
            : {}),
        auth: { persistSession: true, autoRefreshToken: true },
    });
}

export default supabase;
