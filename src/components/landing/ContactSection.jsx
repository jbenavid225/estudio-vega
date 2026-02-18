import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function ContactSection({ content }) {
  const contactInfo = {
    phone: content?.phone || "+54 11 1234-5678",
    whatsapp: content?.whatsapp || "5491112345678", // SOLO dígitos recomendado
    email: content?.email || "contacto@estudiovega.com",
    address: content?.address || "Dirección de la oficina (calle y número)",
    city: content?.city || "Buenos Aires, Argentina",
    hours: content?.hours || "Lunes a Viernes: 9:00 a 18:00",
    facebook: content?.facebook || "",
    instagram: content?.instagram || "",
    linkedin: content?.linkedin || "",
    mapEmbedUrl:
      content?.mapEmbedUrl ||
      "https://www.google.com/maps?q=Buenos+Aires&output=embed",
  };

  const waDigits = String(contactInfo.whatsapp || "").replace(/[^0-9]/g, "");
  const waLink = `https://wa.me/${waDigits}`;

  const socialLinks = [
    { icon: Facebook, href: contactInfo.facebook, label: "Facebook" },
    { icon: Instagram, href: contactInfo.instagram, label: "Instagram" },
    { icon: Linkedin, href: contactInfo.linkedin, label: "LinkedIn" },
  ].filter((s) => !!s.href);

  return (
    <section id="contacto" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#c9a962] text-sm font-medium tracking-widest uppercase">
            Contacto
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1e3a5f] mt-4 mb-6">
            {content?.title || "Contactanos"}
          </h2>

          <div className="w-16 h-1 bg-[#c9a962] mx-auto mb-6" />

          <p className="text-gray-600">
            {content?.subtitle ||
              "Estamos para ayudarte. Podés escribirnos por WhatsApp o enviarnos un mail para coordinar una consulta."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Phone & WhatsApp */}
            <div className="flex gap-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex-1 bg-gray-50 rounded-2xl p-6 hover:bg-[#1e3a5f] group transition-all duration-300"
              >
                <Phone className="w-8 h-8 text-[#c9a962] mb-4" />
                <h3 className="font-medium text-[#1e3a5f] group-hover:text-white mb-1 transition-colors">
                  Teléfono
                </h3>
                <p className="text-gray-600 group-hover:text-white/70 transition-colors">
                  {contactInfo.phone}
                </p>
              </a>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-50 rounded-2xl p-6 hover:bg-green-600 group transition-all duration-300"
              >
                <MessageCircle className="w-8 h-8 text-green-600 group-hover:text-white mb-4 transition-colors" />
                <h3 className="font-medium text-green-800 group-hover:text-white mb-1 transition-colors">
                  WhatsApp
                </h3>
                <p className="text-green-700 group-hover:text-white/70 transition-colors">
                  Escribinos ahora
                </p>
              </a>
            </div>

            {/* Email */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="block bg-gray-50 rounded-2xl p-6 hover:bg-[#1e3a5f] group transition-all duration-300"
            >
              <Mail className="w-8 h-8 text-[#c9a962] mb-4" />
              <h3 className="font-medium text-[#1e3a5f] group-hover:text-white mb-1 transition-colors">
                Email
              </h3>
              <p className="text-gray-600 group-hover:text-white/70 transition-colors">
                {contactInfo.email}
              </p>
            </a>

            {/* Hours */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <Clock className="w-8 h-8 text-[#c9a962] mb-4" />
              <h3 className="font-medium text-[#1e3a5f] mb-1">
                Horario de atención
              </h3>
              <p className="text-gray-600">{contactInfo.hours}</p>
            </div>

            {/* Social Media */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-medium text-[#1e3a5f] mb-4">
                Redes sociales
              </h3>

              {socialLinks.length ? (
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#1e3a5f] hover:border-[#1e3a5f] group transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-[#1e3a5f] group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  (Luego cargamos los links desde Admin)
                </p>
              )}
            </div>
          </motion.div>

          {/* Address & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <MapPin className="w-8 h-8 text-[#c9a962] mb-4" />
              <h3 className="font-medium text-[#1e3a5f] mb-1">
                Ubicación
              </h3>
              <p className="text-gray-600">{contactInfo.address}</p>
              <p className="text-gray-600">{contactInfo.city}</p>
            </div>

            <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden relative">
              <iframe
                src={contactInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Mapa"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
