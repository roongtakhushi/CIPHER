import React, { useState } from 'react';
import { CipherHandwrittenLoader } from './components/CipherHandwrittenLoader';
import { ThreePapercraftCanvas } from './components/ThreePapercraftCanvas';
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
  const [loaderActive, setLoaderActive] = useState(true);
  const [squadModalOpen, setSquadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = window.innerWidth < 768 ? 64 : 76;
    const elementPosition = el.getBoundingClientRect().top;
    const targetOffset = Math.max(0, elementPosition + window.pageYOffset - navOffset);

    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-canvas text-[#DFE2EF] relative selection:bg-lime selection:text-canvas">
      {/* iPhone-Style Handwritten "CIPHER" Calligraphy Loading Overlay */}
      {loaderActive && (
        <CipherHandwrittenLoader
          onComplete={() => {
            setLoaderActive(false);
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
