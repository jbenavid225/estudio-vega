import React from "react";
import { Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c9a962]/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#c9a962]" />
            </div>
            <span className="text-white font-light text-lg">
              Estudio Vega
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a
              href="#sobre-mi"
              className="text-white/60 hover:text-[#c9a962] transition-colors"
            >
              Sobre nosotros
            </a>
            <a
              href="#areas"
              className="text-white/60 hover:text-[#c9a962] transition-colors"
            >
              Áreas
            </a>
            <a
              href="#mision"
              className="text-white/60 hover:text-[#c9a962] transition-colors"
            >
              Misión
            </a>
            <a
              href="#servicios"
              className="text-white/60 hover:text-[#c9a962] transition-colors"
            >
              Servicios
            </a>
            <a
              href="#resenas"
              className="text-white/60 hover:text-[#c9a962] transition-colors"
            >
              Reseñas
            </a>
            <a
              href="#contacto"
              className="text-white/60 hover:text-[#c9a962] transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-white/40 text-sm text-center md:text-right">
  © {new Date().getFullYear()} Desarrollado por{" "}
  <a
    href="https://studiob.com.ar"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 hover:text-[#c9a962] transition-colors font-medium"
  >
    Studio B
  </a>{" "}
  · Todos los derechos reservados
</p>

        </div>
      </div>
    </footer>
  );
}
