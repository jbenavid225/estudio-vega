import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Users, Trophy } from "lucide-react";

export default function AboutSection({ content }) {
  const stats =
    content?.stats?.length
      ? content.stats
      : [
          { icon: "trophy", value: "10+", label: "Años de experiencia" },
          { icon: "users", value: "300+", label: "Clientes asesorados" },
          { icon: "award", value: "Enfoque", label: "Estrategia + claridad" },
          { icon: "book", value: "Áreas", label: "Civil • Laboral • Contratos" },
        ];

  const iconMap = {
    trophy: Trophy,
    users: Users,
    award: Award,
    book: BookOpen,
  };

  return (
    <section id="sobre-mi" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={
                  content?.image_url ||
                  "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80"
                }
                alt={content?.image_alt || "Equipo legal"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/35 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="text-4xl font-light text-[#1e3a5f]">
                {content?.badge_value || "Estudio"}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {content?.badge_label || "Atención personalizada"}
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#c9a962]/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase">
              {content?.eyebrow || "Sobre Estudio Vega"}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1e3a5f] mt-4 mb-6">
              {content?.title || "Quiénes somos"}
            </h2>

            <div className="w-16 h-1 bg-[#c9a962] mb-8" />

            <div className="prose prose-lg text-gray-600 leading-relaxed">
              <p>
                {content?.content ||
                  "En Estudio Vega brindamos asesoramiento legal claro y estratégico para personas y empresas. Nuestro enfoque combina análisis jurídico con soluciones prácticas y un acompañamiento cercano durante todo el proceso."}
              </p>
              <p className="mt-4">
                {content?.subtitle ||
                  "Priorizamos la transparencia, la confidencialidad y una comunicación simple: que entiendas tus opciones y puedas decidir con seguridad."}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => {
                const Icon = iconMap[stat.icon] || Award;
                return (
                  <motion.div
                    key={stat.label + index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <Icon className="w-6 h-6 text-[#c9a962] mx-auto mb-2" />
                    <div className="text-2xl font-semibold text-[#1e3a5f]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA secundaria opcional */}
            <div className="mt-10">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1e3a5f] text-white font-medium hover:bg-[#16304f] transition"
              >
                Consultar ahora
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
