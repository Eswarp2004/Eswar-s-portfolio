import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import CompetenciesSection from "./components/CompetenciesSection";
import EducationSection from "./components/EducationSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <CompetenciesSection />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
