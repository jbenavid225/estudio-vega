import React from "react";
import { motion } from "framer-motion";
import { Scale, Users, Building2, FileText, Gavel, Shield } from "lucide-react";

const defaultAreas = [
  {
    icon: Users,
    title: "Derecho de Familia",
    description: "Divorcios, custodia, alimentos y acuerdos familiares.",
  },
  {
    icon: Building2,
    title: "Derecho Corporativo",
    description: "Constitución de empresas, contratos y asesoría empresarial.",
  },
  {
    icon: Scale,
    title: "Derecho Civil",
    description: "Contratos, sucesiones, herencias y litigios civiles.",
  },
  {
    icon: FileText,
    title: "Derecho Laboral",
    description: "Despidos, indemnizaciones y conflictos laborales.",
  },
  {
    icon: Gavel,
    title: "Litigios",
    description: "Representación en juicios y procedimientos legales.",
  },
  {
    icon: Shield,
    title: "Derecho Penal",
    description: "Defensa penal y asesoría en procedimientos penales.",
  },
];

export default function PracticeAreasSection({ content }) {
  const title = content?.title || "Áreas de Práctica";
  const subtitle =
    content?.subtitle ||
    "Servicios legales especializados en diversas ramas del derecho para atender tus necesidades.";

  // ✅ Items vienen como array desde el Admin (content.items)
  const items =
    Array.isArray(content?.items) && content.items.length > 0
      ? content.items
      : defaultAreas.map((a) => ({
          title: a.title,
          description: a.description,
        }));

  return (
    <section id="areas" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase">
            Especialidades
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1e3a5f] mt-4 mb-6">
            {title}
          </h2>

          <div className="w-16 h-1 bg-[#c9a962] mx-auto mb-6" />

          <p className="text-gray-600">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((area, index) => {
            const Icon = defaultAreas[index % defaultAreas.length].icon;

            return (
              <motion.div
                key={(area?.title || "area") + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#c9a962]/30"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1e3a5f]/5 flex items-center justify-center mb-6 group-hover:bg-[#c9a962]/10 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#1e3a5f] group-hover:text-[#c9a962] transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-medium text-[#1e3a5f] mb-3">
                  {area?.title || "Área"}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {area?.description || ""}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
