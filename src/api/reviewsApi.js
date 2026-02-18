import { supabase } from "@/api/supabaseClient";

export async function getPublishedReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}
