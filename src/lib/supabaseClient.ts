import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function submitInterest(table: string, payload: Record<string, unknown>) {
  if (!supabase) {
    // Demo mode — no credentials configured
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { ok: true, demo: true };
  }

  // Route to the correct edge function based on the table name
  const fn = table === "course_registrations" ? "register" : "partner";

  const { error } = await supabase.functions.invoke(fn, { body: payload });
  if (error) throw error;
  return { ok: true, demo: false };
}
