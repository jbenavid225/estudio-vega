import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Save, Loader2, Check } from "lucide-react";
import ArrayEditor from "./ArrayEditor";

function safeJsonParse(text) {
  try {
    const parsed = JSON.parse(text);
    return { ok: true, value: parsed };
  } catch (e) {
    return { ok: false, error: "JSON inválido. Revisá comas, llaves y comillas." };
  }
}

export default function SectionEditor({
  title,
  icon: Icon,
  content,
  fields,
  onSave,
  isSaving,
}) {
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    if (!content) return;

    const base = {};

    for (const f of fields) {
      const v = content?.[f.name];

      // ✅ Si es array, default = []
      if (f.type === "array") {
        base[f.name] = Array.isArray(v) ? v : [];
        continue;
      }

      // ✅ Si es cualquier otro campo
      base[f.name] = v ?? "";
    }

    // (opcional) campo json legacy
    if (fields.some((f) => f.name === "json")) {
      const obj = {};
      if (content?.items) obj.items = content.items;
      if (content?.stats) obj.stats = content.stats;
      base.json = Object.keys(obj).length ? JSON.stringify(obj, null, 2) : "";
    }

    setFormData(base);
    setJsonError("");
  }, [content, fields]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
    if (field === "json") setJsonError("");
  };

  const handleSave = async () => {
    let payload = { ...formData };

    if ("json" in formData) {
      const raw = String(formData.json || "").trim();
      if (raw) {
        const parsed = safeJsonParse(raw);
        if (!parsed.ok) {
          setJsonError(parsed.error);
          return;
        }
        payload = { ...payload, ...parsed.value };
      }
      delete payload.json;
    }

    await onSave(payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="border-b bg-gray-50/50">
        <CardTitle className="flex items-center gap-3 text-lg">
          {Icon && <Icon className="w-5 h-5 text-[#c9a962]" />}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-5">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            {/* ✅ No duplicar label en arrays (ArrayEditor ya lo muestra) */}
            {field.type !== "array" && (
              <Label
                htmlFor={field.name}
                className="text-sm font-medium text-gray-700"
              >
                {field.label}
              </Label>
            )}

            {field.type === "array" ? (
              <ArrayEditor
                label={field.label}
                value={Array.isArray(formData[field.name]) ? formData[field.name] : []}
                onChange={(next) => handleChange(field.name, next)}
                fields={field.arrayFields || []}
                addText={field.addText || "Agregar"}
                itemLabel={field.itemLabel}
              />
            ) : field.type === "textarea" ? (
              <Textarea
                id={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 4}
                className="resize-none"
              />
            ) : (
              <Input
                id={field.name}
                type={field.type || "text"}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
              />
            )}

            {field.hint && <p className="text-xs text-gray-500">{field.hint}</p>}

            {field.name === "json" && jsonError ? (
              <p className="text-xs text-red-600">{jsonError}</p>
            ) : null}
          </div>
        ))}

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f]"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Guardado
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
