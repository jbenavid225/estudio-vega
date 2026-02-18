import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

export default function MissionVisionSection({ content }) {
  const title = content?.title || "Misión, Visión y Valores";

  const mission =
    content?.mission ||
    "Brindar servicios legales de alta calidad, con un enfoque personalizado y humano, garantizando la defensa efectiva de los derechos e intereses de cada cliente.";

  const vision =
    content?.vision ||
    "Ser reconocidos como un estudio líder por su excelencia, integridad y compromiso, siendo referente en servicios jurídicos claros e innovadores.";

  const values =
    content?.values ||
    "Integridad, compromiso, excelencia, confidencialidad y empatía son los pilares que guían nuestro trabajo.";

  const items = [
    {
      icon: Target,
      title: "Misión",
      content: mission,
      color: "from-[#1e3a5f] to-[#2d4a6f]",
    },
    {
      icon: Eye,
      title: "Visión",
      content: vision,
      color: "from-[#c9a962] to-[#d4b572]",
    },
    {
      icon: Heart,
      title: "Valores",
      content: values,
      color: "from-[#1e3a5f] to-[#2d4a6f]",
    },
  ];

  return (
    <section id="mision" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase">
            Filosofía
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1e3a5f] mt-4 mb-6">
            {title}
          </h2>

          <div className="w-16 h-1 bg-[#c9a962] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />

              <div className="relative bg-white border border-gray-100 rounded-3xl p-8 md:p-10 h-full hover:shadow-xl transition-shadow duration-500">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-medium text-[#1e3a5f] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
