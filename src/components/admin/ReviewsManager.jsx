import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Star, Plus, Trash2, ArrowUp, ArrowDown, Save } from "lucide-react";
import { useReviews } from "../../hooks/useReviews";

function Stars({ value = 5, onChange }) {
  const v = Number(value || 0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} className="p-1">
          <Star
            className={`w-5 h-5 ${
              n <= v ? "text-[#c9a962] fill-[#c9a962]" : "text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsManager() {
  const {
    reviews,
    loading,
    saving,
    error,
    createReview,
    updateReview,
    deleteReview,
    reorderReviews,
  } = useReviews({ includeUnpublished: true });

  // 👇 borrador local para editar sin spamear requests
  const [draft, setDraft] = useState({});

  useEffect(() => {
    const map = {};
    for (const r of reviews) {
      map[r.id] = {
        name: r.name || "",
        text: r.text || "",
        rating: r.rating ?? 5,
        published: !!r.published,
      };
    }
    setDraft(map);
  }, [reviews]);

  const move = (from, to) => {
    if (to < 0 || to >= reviews.length) return;
    const next = [...reviews];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    reorderReviews(next);
  };

  const setField = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }));
  };

  const saveOne = async (id) => {
    const patch = draft[id];
    if (!patch) return;
    await updateReview(id, patch);
  };

  if (loading) return <div className="p-4">Cargando reseñas...</div>;

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="flex items-center justify-between gap-3 text-lg">
          <span>Reseñas</span>
          <Button type="button" onClick={createReview} className="gap-2" disabled={saving}>
            <Plus className="w-4 h-4" />
            Agregar reseña
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {reviews.map((r, idx) => {
          const d = draft[r.id] || {};
          return (
            <div key={r.id} className="border rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="font-medium text-slate-800">
                  {d.name?.trim() ? d.name : `Reseña #${idx + 1}`}
                </div>

                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => move(idx, idx - 1)} className="px-2" disabled={saving}>
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => move(idx, idx + 1)} className="px-2" disabled={saving}>
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="destructive" onClick={() => deleteReview(r.id)} className="gap-2" disabled={saving}>
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Nombre</div>
                  <Input
                    value={d.name || ""}
                    onChange={(e) => setField(r.id, "name", e.target.value)}
                    placeholder="Ej: Ana García"
                    disabled={saving}
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Rating</div>
                  <Stars value={d.rating ?? 5} onChange={(n) => setField(r.id, "rating", n)} />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="text-sm font-medium text-gray-700">Texto</div>
                  <Textarea
                    value={d.text || ""}
                    onChange={(e) => setField(r.id, "text", e.target.value)}
                    rows={3}
                    placeholder="Escribí la reseña..."
                    className="resize-none"
                    disabled={saving}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!d.published}
                      onChange={(e) => setField(r.id, "published", e.target.checked)}
                      disabled={saving}
                    />
                    Publicada (visible en el sitio)
                  </label>

                  <Button
                    type="button"
                    onClick={() => saveOne(r.id)}
                    className="gap-2 bg-[#1e3a5f] hover:bg-[#2d4a6f]"
                    disabled={saving}
                  >
                    <Save className="w-4 h-4" />
                    Guardar reseña
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
