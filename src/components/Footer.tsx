import React from 'react';
import { sound } from '../utils/sound';
import { ArrowUp, Mail, ExternalLink } from 'lucide-react';

interface FooterProps {
  onScrollTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTop }) => {
  return (
    <footer className="w-full bg-canvas py-16 px-4 md:px-8 border-t border-border-subtle" id="footer">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10">
        
        {/* Creative Sign-off Banner */}
        <div className="relative bg-surface-dark border-2 border-border-subtle p-6 sm:p-10 shadow-hard-md flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden">
          {/* Subtle Studio Washi Accent */}
          <div className="washi-tape washi-tape-lime tape-torn-h -top-3 left-8 w-28 rotate-1"></div>

          <div className="flex flex-col gap-3 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-lime animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-wider text-lime font-bold">
                CIPHER — IT STUDENTS' EXECUTIVE COUNCIL
              </span>
            </div>
            
            <h3
              className="text-2xl sm:text-3xl md:text-4xl text-white font-marker font-bold leading-tight"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              "We don't just study technology. We architect the future." ⚡
            </h3>

            <p className="font-mono text-xs text-ash tracking-wide">
              DEPARTMENT OF INFORMATION TECHNOLOGY • MIT ACADEMY OF ENGINEERING (MITAOE), ALANDI, PUNE — 412105
            </p>
          </div>

          {/* Council Official External & Social Links */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap font-mono text-xs z-10">
            {/* Email Contact */}
            <a
              href="mailto:Cipherit.mitaoe@gmail.com"
              onClick={() => sound.click()}
              className="bg-canvas border border-border-subtle hover:border-pink text-white hover:text-pink px-3.5 py-2 font-bold flex items-center gap-2 transition-all shadow-hard-sm"
              title="Official Council Email"
            >
              <Mail className="w-4 h-4 text-pink" />
              <span>EMAIL US</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ciphermitaoe"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="bg-canvas border border-border-subtle hover:border-lime text-white hover:text-lime px-3.5 py-2 font-bold flex items-center gap-2 transition-all shadow-hard-sm"
              title="Instagram @ciphermitaoe"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>INSTAGRAM</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="bg-canvas border border-border-subtle hover:border-lime text-white hover:text-lime px-3.5 py-2 font-bold flex items-center gap-2 transition-all shadow-hard-sm"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LINKEDIN</span>
            </a>

            {/* Velora Event Site */}
            <a
              href="https://velora-cipher.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="bg-canvas border border-border-subtle hover:border-[#FFD84D] text-[#FFD84D] hover:text-white px-3.5 py-2 font-bold flex items-center gap-1.5 transition-all shadow-hard-sm"
              title="Velora 1.0 Event Website"
            >
              <span>VELORA SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Council Desk & Status Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono text-xs">
          <span className="uppercase tracking-widest text-ash text-center sm:text-left">
            CIPHER @ MITAOE — CRAFTED BY STUDENTS, FOR STUDENTS.
          </span>
          <span className="text-lime font-bold inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-lime animate-pulse"></span>
            <span>[ COUNCIL TERMINAL: ONLINE &amp; DEPLOYED ]</span>
          </span>
        </div>

        {/* Copyright & Sub-links */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-ash">
          <p>© 2025 CIPHER — IT Students' Executive Council, MITAOE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-ash hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#vision"
              className="text-ash hover:text-white transition-colors"
            >
              Vision &amp; Mission
            </a>
            <a
              href="#velora"
              className="text-ash hover:text-white transition-colors"
            >
              Velora 1.0
            </a>
            <a
              href="#council"
              className="text-ash hover:text-white transition-colors"
            >
              Council
            </a>
            <button
              onClick={() => {
                sound.click();
                onScrollTop();
              }}
              className="hover:text-lime transition-colors flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>[TOP</span>
              <ArrowUp className="w-3 h-3" />
              <span>]</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
