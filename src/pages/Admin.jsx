import React, { useMemo, useState } from "react";
import SectionEditor from "../components/admin/SectionEditor";
import { useSiteContent } from "../hooks/useSiteContent";
import { Scale } from "lucide-react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";
import ReviewsManager from "../components/admin/ReviewsManager";




export default function Admin() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const { data, loading, error, saving, saveSiteContent, refetch } =
    useSiteContent();
  const [savingKey, setSavingKey] = useState("");

  const site = useMemo(() => data || {}, [data]);

  const saveSection = async (key, formData) => {
    setSavingKey(key);
    try {
      const payload = { ...formData };

      // ✅ si viene items como texto JSON, lo parseamos antes de guardar
      if (typeof payload.items === "string") {
        const txt = payload.items.trim();
        if (txt.startsWith("[") || txt.startsWith("{")) {
          payload.items = JSON.parse(txt);
        }
      }

      await saveSiteContent({ [key]: payload });
      await refetch();
    } finally {
      setSavingKey("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Cargando Admin...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c9a962]/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#c9a962]" />
            </div>
            <h1 className="text-3xl font-semibold text-[#1e3a5f]">
              Admin · Estudio Vega
            </h1>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-100 text-slate-700"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        )}

        {/* Editors */}
        <div className="grid gap-6">
          

          {/* HERO */}
          <SectionEditor
            title="Hero"
            icon={Scale}
            content={site.hero || {}}
            fields={[
              { name: "title", label: "Título" },
              { name: "subtitle", label: "Subtítulo" },
              { name: "content", label: "Descripción", type: "textarea", rows: 4 },
              { name: "ctaText", label: "Texto del botón" },
            ]}
            onSave={(form) => saveSection("hero", form)}
            isSaving={savingKey === "hero" || saving}
          />

          {/* ABOUT */}
          <SectionEditor
            title="Quiénes somos"
            content={site.about || {}}
            fields={[
              { name: "eyebrow", label: "Eyebrow (arriba del título)" },
              { name: "title", label: "Título" },
              { name: "content", label: "Texto principal", type: "textarea", rows: 4 },
              { name: "subtitle", label: "Texto secundario", type: "textarea", rows: 3 },
              { name: "image_url", label: "URL de imagen" },
            ]}
            onSave={(form) => saveSection("about", form)}
            isSaving={savingKey === "about" || saving}
          />

          {/* PRACTICE AREAS */}
<SectionEditor
  title="Áreas de práctica"
  content={site.practiceAreas || {}}
  fields={[
    { name: "title", label: "Título" },
    { name: "subtitle", label: "Subtítulo" },
    {
      name: "items",
      label: "Áreas (lista)",
      type: "array",
      addText: "Agregar área",
      arrayFields: [
        { name: "title", label: "Nombre del área", placeholder: "Ej: Derecho Laboral" },
        {
          name: "description",
          label: "Descripción",
          type: "textarea",
          rows: 3,
          placeholder: "Ej: Despidos, indemnizaciones, conflictos laborales...",
        },
      ],
      itemLabel: (i) => `Área #${i + 1}`,
    },
  ]}
  onSave={(form) => saveSection("practiceAreas", form)}
  isSaving={savingKey === "practiceAreas" || saving}
/>



          {/* MISSION / VISION */}
          <SectionEditor
            title="Misión, Visión y Valores"
            content={site.missionVision || {}}
            fields={[
              { name: "title", label: "Título" },
              { name: "mission", label: "Misión", type: "textarea", rows: 4 },
              { name: "vision", label: "Visión", type: "textarea", rows: 4 },
              { name: "values", label: "Valores", type: "textarea", rows: 4 },
            ]}
            onSave={(form) => saveSection("missionVision", form)}
            isSaving={savingKey === "missionVision" || saving}
          />

          {/* SERVICES */}
          {/* SERVICES */}
<SectionEditor
  title="Servicios"
  content={site.services || {}}
  fields={[
    { name: "title", label: "Título" },
    { name: "subtitle", label: "Subtítulo" },
    {
      name: "items",
      label: "Servicios",
      type: "array",
      addText: "Agregar servicio",
      arrayFields: [
        { name: "title", label: "Título", placeholder: "Ej: Consulta legal" },
        {
          name: "description",
          label: "Descripción",
          type: "textarea",
          rows: 3,
          placeholder: "Ej: Orientación inicial y plan de acción.",
        },
        { name: "price", label: "Precio/Texto", placeholder: "Ej: Consultar" },
      ],
      // opcional: cómo se ve el título del item
      itemLabel: (i, item) => item?.title?.trim() ? item.title : `Servicio #${i + 1}`,
    },
  ]}
  onSave={(form) => saveSection("services", form)}
  isSaving={savingKey === "services" || saving}
/>



          {/* CONTACT */}
          <SectionEditor
            title="Contacto"
            content={site.contact || {}}
            fields={[
              { name: "title", label: "Título" },
              { name: "subtitle", label: "Subtítulo" },
              { name: "phone", label: "Teléfono" },
              { name: "whatsapp", label: "WhatsApp (solo números)", hint: "Ej: 5491112345678" },
              { name: "email", label: "Email" },
              { name: "address", label: "Dirección" },
              { name: "city", label: "Ciudad" },
              { name: "hours", label: "Horarios" },
              { name: "instagram", label: "Instagram URL" },
              { name: "linkedin", label: "LinkedIn URL" },
              { name: "facebook", label: "Facebook URL" },
              { name: "mapEmbedUrl", label: "Google Maps Embed URL", hint: "URL del embed (iframe)" },
            ]}
            onSave={(form) => saveSection("contact", form)}
            isSaving={savingKey === "contact" || saving}
          />
          <ReviewsManager />
        </div>
      </div>
    </div>
  );
}
