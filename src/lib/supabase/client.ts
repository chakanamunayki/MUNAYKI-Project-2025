import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

export const createClient = () => {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'implicit',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true
      }
    }
  );
};

// Create a singleton instance for use in client components
export const supabase = createClient(); 