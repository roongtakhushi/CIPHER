import React, { useEffect, useState } from 'react';
import 'lenis/dist/lenis.css';
import Lenis from 'lenis';
import { CipherHandwrittenLoader } from './components/CipherHandwrittenLoader';
import { ThreePapercraftCanvas } from './components/ThreePapercraftCanvas';
import { useStringTune } from './utils/stringTune';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Directives } from './components/Directives';
import { VeloraWarRoom } from './components/VeloraWarRoom';
import { OperativesDossier } from './components/OperativesDossier';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { SquadModal } from './components/SquadModal';
import { MobileBottomDock } from './components/MobileBottomDock';

export const App: React.FC = () => {
  useStringTune();
  const [loaderActive, setLoaderActive] = useState(true);
  const [squadModalOpen, setSquadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLoaderActive(false);
      return;
    }

    // Initialize Lenis Inertia Scroll with native high-performance autoRaf
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(el, { offset: -64, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-[#DFE2EF] relative selection:bg-lime selection:text-canvas">
      {/* iPhone-Style Handwritten "CIPHER" Calligraphy Loading Overlay */}
      {loaderActive && (
        <CipherHandwrittenLoader
          onComplete={() => {
            setLoaderActive(false);
            if (lenisInstance) {
              lenisInstance.scrollTo(0, { immediate: true });
            }
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
        />
      )}

      {/* Global Fixed Flight Canvas: Origami Folds in Hero ➔ Becomes Cursor Flight Companion */}
      <ThreePapercraftCanvas />

      {/* Navigation */}
      <Navbar
        onOpenSquadModal={() => setSquadModalOpen(true)}
        mobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onReplaySketch={() => {
          if (lenisInstance) {
            lenisInstance.scrollTo(0, { immediate: true });
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
          setLoaderActive(true);
        }}
      />

      {/* Main Content Sections with bottom dock clearance on mobile */}
      <main className="w-full pt-20 sm:pt-24 pb-24 lg:pb-0 overflow-x-hidden relative z-0">
        <Hero
          onExploreVelora={() => scrollToSection('velora')}
          onMeetCouncil={() => scrollToSection('council')}
        />
        <Manifesto />
        <Directives />
        <VeloraWarRoom onOpenSquadModal={() => setSquadModalOpen(true)} />
        <OperativesDossier />
        <FAQSection />
        <Footer onScrollTop={() => scrollToSection('hero')} />
      </main>

      {/* Mobile Floating Thumb-Zone Quick Action Dock (< 1024px) */}
      <MobileBottomDock
        onOpenSquadModal={() => setSquadModalOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Squad Registration Modal */}
      <SquadModal
        isOpen={squadModalOpen}
        onClose={() => setSquadModalOpen(false)}
      />
    </div>
  );
};
