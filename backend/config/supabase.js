// backend/config/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') }); // or path.join(__dirname, '.env') if you place it next to this file

const SUPA_URL = process.env.SUPABASE_URL;
const SUPA_SERVICE_ROLE_KEY = process.env.SUPABASE_KEY;


if (!SUPA_URL) throw new Error('Missing SUPABASE_URL');
if (!SUPA_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPA_URL, SUPA_SERVICE_ROLE_KEY);

// Optional: per-request client (rarely needed on backend)
export function makeSupabaseClient(token) {
    return createClient(SUPA_URL, SUPA_SERVICE_ROLE_KEY, {
        ...(token ? { global: { headers: { Authorization: `Bearer ${token}` } } } : {}),
    });
}

export default supabase;
