import { useCallback, useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";

const SLUG = "default";

export function useSiteContent() {
  const [data, setData] = useState(null); // jsonb (site_content.data)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchOne = useCallback(async () => {
    setError("");
    setLoading(true);

    const { data: row, error: err } = await supabase
      .from("site_content")
      .select("id, slug, data, updated_at")
      .eq("slug", SLUG)
      .maybeSingle();

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // Si no existe el registro, lo creamos vacío
    if (!row) {
      const { data: inserted, error: insErr } = await supabase
        .from("site_content")
        .insert({ slug: SLUG, data: {} })
        .select("data")
        .single();

      if (insErr) {
        setError(insErr.message);
        setLoading(false);
        return;
      }

      setData(inserted?.data ?? {});
      setLoading(false);
      return;
    }

    setData(row.data ?? {});
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOne();
  }, [fetchOne]);

  const saveSiteContent = useCallback(
    async (patch) => {
      setError("");
      setSaving(true);

      // 1) traer data actual (evita pisar si hay cambios)
      const { data: row, error: readErr } = await supabase
        .from("site_content")
        .select("data")
        .eq("slug", SLUG)
        .single();

      if (readErr) {
        setError(readErr.message);
        setSaving(false);
        return;
      }

      const current = row?.data ?? {};
      const merged = { ...current, ...patch };

      // 2) update
      const { error: upErr } = await supabase
        .from("site_content")
        .update({ data: merged })
        .eq("slug", SLUG);

      if (upErr) {
        setError(upErr.message);
        setSaving(false);
        return;
      }

      setData(merged);
      setSaving(false);
    },
    []
  );

  return {
    data,
    loading,
    saving,
    error,
    saveSiteContent,
    refetch: fetchOne,
  };
}
