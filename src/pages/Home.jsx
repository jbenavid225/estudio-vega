import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import PracticeAreasSection from "../components/landing/PracticeAreasSection";
import MissionVisionSection from "../components/landing/MissionVisionSection";
import ServicesSection from "../components/landing/ServicesSection";
import ReviewsSection from "../components/landing/ReviewsSection";
import ContactSection from "../components/landing/ContactSection";
import Footer from "../components/landing/Footer";

import { useSiteContent } from "../hooks/useSiteContent";
import { useReviews } from "../hooks/useReviews";

export default function Home() {
  const { data, loading, error } = useSiteContent();
  const {
    reviews: publishedReviews,
    loading: loadingReviews,
    error: reviewsError,
  } = useReviews();

  const site = data || {};

  const heroContent = site.hero || {
    title: "Estudio Vega",
    subtitle: "Abogados & Consultores Legales",
    content:
      "Asesoría legal con enfoque estratégico, claridad y acompañamiento en cada etapa.",
    ctaText: "Consulta Gratuita",
  };

  const aboutContent = site.about || {
    eyebrow: "Sobre Estudio Vega",
    title: "Quiénes somos",
    content:
      "En Estudio Vega brindamos asesoramiento legal claro y estratégico para personas y empresas.",
    subtitle:
      "Priorizamos la transparencia, la confidencialidad y una comunicación simple.",
    image_url:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80",
  };

  const practiceAreasContent = site.practiceAreas || {
    title: "Áreas de práctica",
    subtitle: "Te asesoramos con claridad y estrategia según tu caso.",
    items: [],
  };

  const missionVisionContent = site.missionVision || {
    title: "Misión, Visión y Valores",
    mission: "",
    vision: "",
    values: "",
  };

  const servicesContent = site.services || {
    title: "Servicios",
    subtitle: "",
    items: [],
  };

  const contactContent = site.contact || {
    title: "Contacto",
    subtitle: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    hours: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    mapEmbedUrl: "",
  };

  // si querés, podés configurar estos textos luego en site_content
  const reviewsSectionContent = site.reviewsSection || {
    title: "Reseñas",
    subtitle: "Lo que dicen nuestros clientes",
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-600">{String(error)}</div>;

  return (
    <div>
      <Navbar />

      <HeroSection content={heroContent} />
      <AboutSection content={aboutContent} />

      <PracticeAreasSection content={practiceAreasContent} />
      <MissionVisionSection content={missionVisionContent} />
      <ServicesSection content={servicesContent} />

      <ReviewsSection
        content={reviewsSectionContent}
        reviews={reviewsError ? [] : publishedReviews}
      />

      <ContactSection content={contactContent} />
      <Footer />
    </div>
  );
}
