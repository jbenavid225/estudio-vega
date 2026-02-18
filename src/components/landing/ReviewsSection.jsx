import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function ReviewsSection({ reviews = [], content, loading = false, useFallback = true }) {
  const title = content?.title || "Reseñas";
  const subtitle = content?.subtitle || "Lo que dicen nuestros clientes";

  const fallback = [
    {
      client_name: "Carlos Méndez",
      review_text:
        "Excelente profesional. Me ayudó con un caso difícil y siempre estuvo disponible.",
      rating: 5,
      published: true,
    },
    {
      client_name: "Ana García",
      review_text:
        "Su asesoría fue invaluable. Muy profesional y con conocimiento profundo.",
      rating: 5,
      published: true,
    },
    {
      client_name: "Roberto Sánchez",
      review_text:
        "Resolvió mi caso de manera rápida y efectiva. Recomiendo por su compromiso.",
      rating: 5,
      published: true,
    },
  ];

  // ✅ Mientras carga, NO uses fallback (evita “falso positivo”)
  const source = loading ? [] : (reviews?.length ? reviews : (useFallback ? fallback : []));

  // ✅ normalizamos para soportar distintos formatos
  const normalized = source
    .filter((r) => r?.published !== false)
    .map((r) => ({
      name: r.name ?? r.client_name ?? "Cliente",
      text: r.text ?? r.review_text ?? "",
      rating: Number(r.rating ?? 5),
    }))
    .filter((r) => r.text.trim().length > 0);

  // ✅ Si no hay nada, no muestres la sección
  if (!loading && normalized.length === 0) return null;

  return (
    <section id="resenas" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase">
            Testimonios
          </span>

          {/* ✅ Title grande */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1e3a5f] mt-4 mb-6">
            {title}
          </h2>

          <div className="w-16 h-1 bg-[#c9a962] mx-auto mb-6" />

          {/* ✅ Subtitle debajo */}
          <p className="text-gray-600">{subtitle}</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500">Cargando reseñas...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {normalized.slice(0, 6).map((review, index) => (
              <motion.div
                key={review.name + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-[#c9a962]/20" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (review.rating || 5)
                          ? "text-[#c9a962] fill-[#c9a962]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] flex items-center justify-center text-white font-medium">
                    {review.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <div className="font-medium text-[#1e3a5f]">{review.name}</div>
                    <div className="text-sm text-gray-500">Cliente</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#c9a962] text-[#1e3a5f] font-medium hover:bg-[#d4b572] transition"
          >
            Quiero consultar
          </a>
        </div>
      </div>
    </section>
  );
}
