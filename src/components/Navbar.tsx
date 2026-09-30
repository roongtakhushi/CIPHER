import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TrendingNewsTicker } from './TrendingNewsTicker';

interface NavbarProps {
  onOpenSquadModal: () => void;
  onReplaySketch?: () => void;
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSquadModal,
  onReplaySketch,
  mobileMenuOpen: controlledMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}) => {
  const [sfxActive, setSfxActive] = useState(false);
  const [uncontrolledMenuOpen, setUncontrolledMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const isMenuOpen = controlledMenuOpen !== undefined ? controlledMenuOpen : uncontrolledMenuOpen;
  const toggleMenu = onToggleMobileMenu || (() => setUncontrolledMenuOpen(!uncontrolledMenuOpen));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = sound.toggle();
    setSfxActive(active);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-200 bg-canvas/95 backdrop-blur-md border-b border-border-subtle shadow-hard-sm">
      {/* Dynamic Animated Trending News Ticker (Visible on Mobile & Desktop) */}
      <TrendingNewsTicker
        onReplaySketch={onReplaySketch}
        sfxActive={sfxActive}
        onToggleSfx={toggleSound}
        currentTime={currentTime}
      />

      {/* Main Navbar */}
      <div className="h-16 max-w-[1320px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand & Department Badge */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-lime shadow-hard-sm"></div>
          <a
            href="#"
            onClick={() => sound.click()}
            className="font-display text-xl uppercase tracking-wider text-white font-bold hover:text-lime transition-colors"
          >
            CIPHER
          </a>
          <span className="font-mono text-xs text-ash uppercase hidden sm:inline-block border border-border-subtle px-2 py-0.5 bg-surface-dark">
            [IT STUDENTS' EXECUTIVE COUNCIL]
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-[13px]">
          {[
            { id: 'about', label: 'About' },
            { id: 'vision', label: 'Vision & Mission' },
            { id: 'velora', label: 'Velora 1.0' },
            { id: 'council', label: 'Council' },
            { id: 'faq', label: 'FAQ' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                sound.click();
                if (onNavigate) {
                  onNavigate(item.id);
                } else {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-ash hover:text-white px-3 py-1.5 border border-transparent hover:border-border-subtle transition-all cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Modal Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.click(750, 0.04);
              onOpenSquadModal();
            }}
            string="magnetic"
            className="relative font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-lime text-canvas border border-lime shadow-hard-sm hover:shadow-hard-md active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>REGISTER SQUAD</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.click(550, 0.02);
              toggleMenu();
            }}
            className="lg:hidden p-2 text-ash hover:text-white border border-border-subtle bg-surface-dark cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5 text-pink" /> : <Menu className="w-5 h-5 text-lime" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#121826]/98 backdrop-blur-lg border-b-2 border-lime px-6 py-6 font-mono text-sm flex flex-col gap-3 animate-fadeIn shadow-hard-lg max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle text-xs text-ash">
            <span className="font-bold text-white tracking-wider">[CIPHER NAVIGATION]</span>
            <span className="text-lime font-bold">● IT COUNCIL</span>
          </div>

          {[
            { id: 'about', label: '01 // ABOUT COUNCIL' },
            { id: 'vision', label: '02 // VISION & MISSION' },
            { id: 'velora', label: '03 // VELORA 1.0 (24HR HACKATHON)' },
            { id: 'council', label: '04 // COUNCIL FILM REEL' },
            { id: 'faq', label: '05 // FREQUENTLY ASKED QUESTIONS' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                sound.click(650, 0.02);
                toggleMenu();
                if (onNavigate) {
                  onNavigate(item.id);
                } else {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-white hover:text-lime py-3 px-3 border border-border-subtle/40 bg-surface-dark/60 hover:bg-surface-dark flex items-center justify-between min-h-[48px] active:bg-surface-dark transition-colors rounded-sm cursor-pointer"
            >
              <span className="font-bold tracking-wide">{item.label}</span>
              <span className="text-lime">→</span>
            </a>
          ))}

          {onReplaySketch && (
            <button
              onClick={() => {
                toggleMenu();
                onReplaySketch();
              }}
              className="text-[#FFD84D] text-left py-3 px-3 font-bold flex items-center justify-between min-h-[48px] border border-dashed border-[#FFD84D]/40 bg-[#FFD84D]/5 rounded-sm active:bg-[#FFD84D]/10"
            >
              <span>✏️ Replay Calligraphy Intro</span>
              <span>↺</span>
            </button>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                sound.click(750, 0.04);
                toggleMenu();
                onOpenSquadModal();
              }}
              className="w-full font-mono text-xs font-bold uppercase tracking-wider py-3.5 bg-lime text-canvas border border-canvas shadow-hard-md text-center min-h-[48px] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              REGISTER SQUAD NOW ↗
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
