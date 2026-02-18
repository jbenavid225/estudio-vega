import { useEffect, useState, useCallback } from "react";
import { supabase } from "../api/supabaseClient";

export function useReviews({ includeUnpublished = false } = {}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    let q = supabase
      .from("reviews")
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });

    if (!includeUnpublished) q = q.eq("published", true);

    const { data, error } = await q;
    if (error) setError(error.message);
    setReviews(data || []);
    setLoading(false);
  }, [includeUnpublished]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const createReview = async () => {
    setSaving(true);
    setError("");

    const lastPos = reviews.length ? Math.max(...reviews.map(r => r.position ?? 0)) : 0;

    const { error } = await supabase.from("reviews").insert([{
      name: "",
      text: "",
      rating: 5,
      published: true,
      position: lastPos + 1,
    }]);

    if (error) setError(error.message);
    await fetchReviews();
    setSaving(false);
  };

  const updateReview = async (id, patch) => {
    setSaving(true);
    setError("");

    const { error } = await supabase.from("reviews").update(patch).eq("id", id);
    if (error) setError(error.message);

    await fetchReviews();
    setSaving(false);
  };

  const deleteReview = async (id) => {
    setSaving(true);
    setError("");

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) setError(error.message);

    await fetchReviews();
    setSaving(false);
  };

  const reorderReviews = async (nextOrdered) => {
    setSaving(true);
    setError("");

    for (let i = 0; i < nextOrdered.length; i++) {
      const r = nextOrdered[i];
      const { error } = await supabase
        .from("reviews")
        .update({ position: i + 1 })
        .eq("id", r.id);

      if (error) {
        setError(error.message);
        break;
      }
    }

    await fetchReviews();
    setSaving(false);
  };

  return {
    reviews,
    loading,
    saving,
    error,
    refetch: fetchReviews,
    createReview,
    updateReview,
    deleteReview,
    reorderReviews,
  };
}
