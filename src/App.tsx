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

    // Only enable Lenis on non-touch desktop devices (width >= 1024px)
    // On mobile and tablets, native hardware-accelerated 120Hz momentum scroll is preserved
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024;

    if (isTouchDevice) {
      return;
    }

    // Initialize Lenis Inertia Scroll for desktop mouse wheel
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = window.innerWidth < 768 ? 64 : 76;
    const elementPosition = el.getBoundingClientRect().top;
    const targetOffset = Math.max(0, elementPosition + window.pageYOffset - navOffset);

    if (lenisInstance) {
      lenisInstance.scrollTo(targetOffset, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: targetOffset,
        behavior: 'smooth',
      });
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
      <ThreePapercraftCanvas isPaused={loaderActive} />

      {/* Navigation */}
      <Navbar
        onOpenSquadModal={() => setSquadModalOpen(true)}
        mobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onNavigate={scrollToSection}
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
        onNavigate={scrollToSection}
      />

      {/* Squad Registration Modal */}
      <SquadModal
        isOpen={squadModalOpen}
        onClose={() => setSquadModalOpen(false)}
      />
    </div>
  );
};
