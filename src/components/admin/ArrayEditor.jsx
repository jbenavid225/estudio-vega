import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus, Trash2, ArrowUp, ArrowDown, Copy } from "lucide-react";

/**
 * ArrayEditor (compatible con SectionEditor)
 * Props esperadas desde SectionEditor:
 * - value: array
 * - onChange: (nextArray) => void
 * - fields: arrayFields (lista de campos por item)
 * - addText: texto del botón agregar
 * - itemLabel: (idx, item) => string (título del item)
 *
 * También soporta:
 * - addDefaults: objeto default al agregar
 */
export default function ArrayEditor({
  value = [],
  onChange,
  fields = [],
  addText = "Agregar ítem",
  itemLabel,
  addDefaults = {},
}) {
  const items = Array.isArray(value) ? value : [];

  const addItem = () => {
    onChange([...(items || []), { ...addDefaults }]);
  };

  const removeItem = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const duplicateItem = (idx) => {
    const next = [...items];
    next.splice(idx + 1, 0, { ...(items[idx] || {}) });
    onChange(next);
  };

  const move = (from, to) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const updateField = (idx, fieldName, fieldValue) => {
    const next = [...items];
    next[idx] = { ...next[idx], [fieldName]: fieldValue };
    onChange(next);
  };

  const getTitle = (idx, item) => {
    if (typeof itemLabel === "function") return itemLabel(idx, item);
    // fallback razonable: si hay title, usarlo
    if (item?.title?.trim()) return item.title;
    return `Ítem #${idx + 1}`;
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-end">
        <Button type="button" onClick={addItem} className="gap-2">
          <Plus className="w-4 h-4" />
          {addText}
        </Button>
      </div>

      {items.length === 0 && (
        <div className="text-sm text-gray-500 border rounded-xl p-4 bg-white">
          No hay ítems todavía. Tocá “{addText}”.
        </div>
      )}

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="border rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="font-medium text-slate-800">{getTitle(idx, item)}</div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => move(idx, idx - 1)}
                  className="px-2"
                  title="Subir"
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => move(idx, idx + 1)}
                  className="px-2"
                  title="Bajar"
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => duplicateItem(idx)}
                  className="gap-2"
                  title="Duplicar"
                >
                  <Copy className="w-4 h-4" />
                  Duplicar
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeItem(idx)}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div
                  key={f.name}
                  className={`space-y-2 ${f.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"}`}
                >
                  <div className="text-sm font-medium text-gray-700">{f.label}</div>

                  {f.type === "textarea" ? (
                    <Textarea
                      value={item?.[f.name] || ""}
                      onChange={(e) => updateField(idx, f.name, e.target.value)}
                      rows={f.rows || 3}
                      placeholder={f.placeholder}
                      className="resize-none"
                    />
                  ) : (
                    <Input
                      value={item?.[f.name] || ""}
                      onChange={(e) => updateField(idx, f.name, e.target.value)}
                      placeholder={f.placeholder}
                      type={f.type || "text"}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
