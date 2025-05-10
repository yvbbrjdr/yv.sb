import { createClient } from "@supabase/supabase-js";

export function createSupabaseAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_YVSB_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_YVSB_SUPABASE_ANON_KEY!
  );
}

export function createSupabaseServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_YVSB_SUPABASE_URL!,
    process.env.YVSB_SUPABASE_SERVICE_ROLE_KEY!
  );
}
