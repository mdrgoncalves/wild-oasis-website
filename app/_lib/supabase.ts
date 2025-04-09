import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Supabase URL and Key são necessários');
}

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);