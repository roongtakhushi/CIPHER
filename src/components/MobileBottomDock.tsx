import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Users, PlusCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface MobileBottomDockProps {
  onOpenSquadModal: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  onOpenSquadModal,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      // Hide only on fast downward scroll, keep visible near top or when scrolling up
      if (delta > 18 && currentScrollY > 150) {
        setIsVisible(false);
      } else if (delta < -8 || currentScrollY < 120) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    sound.click(650, 0.03);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className={`fixed bottom-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 sm:w-full sm:max-w-md lg:hidden transition-transform duration-300 ease-out select-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
      style={{
        paddingBottom: 'max(0px, env(safe-area-inset-bottom, 0px))',
      }}
      aria-label="Mobile quick action navigation"
    >
      <div className="bg-[#121826]/95 backdrop-blur-md border-2 border-canvas shadow-hard-md text-white p-1.5 flex items-center justify-between gap-1 rounded-sm">
        {/* Velora Hackathon CTA */}
        <button
          onClick={() => handleScrollTo('velora')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 hover:bg-surface border border-transparent hover:border-border-subtle rounded-sm transition-colors min-h-[46px] cursor-pointer"
          title="Jump to Velora 1.0 Hackathon"
        >
          <Rocket className="w-4 h-4 text-pink mb-0.5" />
          <span className="font-mono text-[10px] font-bold tracking-tight text-white">VELORA</span>
        </button>

        {/* Council Film Strip CTA */}
        <button
          onClick={() => handleScrollTo('council')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 hover:bg-surface border border-transparent hover:border-border-subtle rounded-sm transition-colors min-h-[46px] cursor-pointer"
          title="Jump to Council Film Reel"
        >
          <Users className="w-4 h-4 text-lime mb-0.5" />
          <span className="font-mono text-[10px] font-bold tracking-tight text-white">COUNCIL</span>
        </button>

        {/* Primary Action: Register Squad (Highlighted Lime Button) */}
        <button
          onClick={() => {
            sound.click(750, 0.04);
            onOpenSquadModal();
          }}
          className="flex-1.2 flex items-center justify-center gap-1 py-2 px-3 bg-lime text-canvas font-mono font-bold text-[11px] uppercase tracking-wider border border-canvas shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform min-h-[46px] cursor-pointer"
          title="Register squad for Velora 1.0"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>REGISTER</span>
        </button>

        {/* Menu Toggle Button */}
        <button
          onClick={() => {
            sound.click(550, 0.03);
            onToggleMobileMenu();
          }}
          className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 border rounded-sm transition-colors min-h-[46px] cursor-pointer ${
            isMobileMenuOpen
              ? 'bg-pink text-white border-canvas'
              : 'hover:bg-surface border-transparent hover:border-border-subtle text-ash'
          }`}
          title="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <>
              <X className="w-4 h-4 mb-0.5" />
              <span className="font-mono text-[10px] font-bold tracking-tight">CLOSE</span>
            </>
          ) : (
            <>
              <Menu className="w-4 h-4 mb-0.5" />
              <span className="font-mono text-[10px] font-bold tracking-tight">MENU</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
