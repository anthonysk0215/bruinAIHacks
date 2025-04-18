import { createClient } from '@supabase/supabase-js';

// Define a basic Database type if you don't have a specific one
interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          messages: any[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          messages: any[];
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          messages?: any[];
        };
      };
    };
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
}); 