import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  MessageSquare,
  ClipboardList,
  Handshake,
  FileSearch,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const defaultServices = [
  {
    icon: MessageSquare,
    title: "Consultoría Legal",
    description:
      "Asesoría personalizada para resolver sus dudas legales y orientarle en la toma de decisiones.",
    price: "Consultar",
  },
  {
    icon: FileCheck,
    title: "Redacción de Contratos",
    description: "Elaboración y revisión de contratos comerciales, civiles y laborales.",
    price: "Consultar",
  },
  {
    icon: ClipboardList,
    title: "Trámites Legales",
    description:
      "Gestión de documentos, poderes notariales y trámites ante entidades públicas.",
    price: "Consultar",
  },
  {
    icon: Handshake,
    title: "Mediación",
    description: "Resolución de conflictos evitando procesos judiciales prolongados.",
    price: "Consultar",
  },
  {
    icon: FileSearch,
    title: "Due Diligence",
    description: "Auditoría legal para operaciones empresariales.",
    price: "Consultar",
  },
  {
    icon: Briefcase,
    title: "Representación Judicial",
    description:
      "Defensa y representación en instancias administrativas y judiciales.",
    price: "Consultar",
  },
];

function getServicesFromContent(content) {
  // 1) Si viene como array (ideal)
  if (Array.isArray(content?.items)) return content.items;

  // 2) Si viene como string JSON (lo que guardás desde Admin ahora)
  if (typeof content?.items === "string" && content.items.trim()) {
    try {
      const parsed = JSON.parse(content.items);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // Si el JSON está mal, caemos a default
      console.warn("Servicios: JSON inválido en content.items", e);
    }
  }

  return null;
}

export default function ServicesSection({ content }) {
  const servicesFromAdmin = getServicesFromContent(content);
  const services = servicesFromAdmin?.length ? servicesFromAdmin : defaultServices;

  return (
    <section id="servicios" className="py-24 md:py-32 bg-[#1e3a5f] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase">
            Lo que Ofrecemos
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-4 mb-6">
            {content?.title || "Servicios"}
          </h2>

          <div className="w-16 h-1 bg-[#c9a962] mx-auto mb-6" />

          <p className="text-white/70">
            {content?.subtitle ||
              "Soluciones legales integrales adaptadas a tus necesidades."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = defaultServices[index % defaultServices.length].icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#c9a962]" />
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                    {service.price || "Consultar"}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-white/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-sm text-[#c9a962] hover:text-white transition-colors"
                >
                  Consultar <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
