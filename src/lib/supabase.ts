import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Please click "Connect to Supabase" button to configure your Supabase connection');
}

export const supabase = createClient(supabaseUrl, supabaseKey);