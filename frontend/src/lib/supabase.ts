import { createClient } from "@supabase/supabase-js";

// Esta clave es pública (publishable) y está protegida por las políticas RLS.
// Nunca sustituirla por una secret key o service_role.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://msyolwcfpfflofkahxsy.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_F_MR179iELde4HeEGpsmmQ_JKJ99F4T";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
