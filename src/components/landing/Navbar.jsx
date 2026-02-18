import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // cierra el menú si el usuario scrollea
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: "Sobre mí", href: "#sobre-mi" },
    { label: "Áreas", href: "#areas" },
    { label: "Misión", href: "#mision" },
    { label: "Servicios", href: "#servicios" },
    { label: "Reseñas", href: "#resenas" },
    { label: "Contacto", href: "#contacto" },
  ];

  const onNavClick = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isScrolled ? "bg-[#1e3a5f]" : "bg-[#c9a962]/20"
                }`}
              >
                <Scale className="w-5 h-5 text-[#c9a962]" />
              </div>
              <span
                className={`font-medium text-lg hidden sm:block transition-colors ${
                  isScrolled ? "text-[#1e3a5f]" : "text-white"
                }`}
              >
                Estudio Vega
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#c9a962] ${
                    isScrolled ? "text-[#1e3a5f]" : "text-white/80"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="px-6 py-2.5 bg-[#c9a962] text-[#1e3a5f] text-sm font-medium rounded-full hover:bg-[#d4b572] transition-colors"
              >
                Consulta Gratis
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-[#1e3a5f]" : "text-white"
              }`}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={onNavClick}
                    className="text-[#1e3a5f] font-medium py-2 hover:text-[#c9a962] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={onNavClick}
                  className="mt-4 px-6 py-3 bg-[#c9a962] text-[#1e3a5f] text-center font-medium rounded-full hover:bg-[#d4b572] transition-colors"
                >
                  Consulta Gratis
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
