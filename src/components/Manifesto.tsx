import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { Copy, Check, Lightbulb } from 'lucide-react';

export const Manifesto: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Pointer drag state for sticky notes
  const [cardPositions, setCardPositions] = useState<{ [key: string]: { x: number; y: number; dragging: boolean } }>({
    note1: { x: 0, y: 0, dragging: false },
    note2: { x: 0, y: 0, dragging: false },
    note3: { x: 0, y: 0, dragging: false },
  });

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    sound.click(400, 0.03);
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    const startX = e.clientX - cardPositions[id].x;
    const startY = e.clientY - cardPositions[id].y;

    const onPointerMove = (moveEvent: PointerEvent) => {
      setCardPositions((prev) => ({
        ...prev,
        [id]: {
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY,
          dragging: true,
        },
      }));
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch (err) {}
      sound.thud();
      // Snap back smoothly
      setCardPositions((prev) => ({
        ...prev,
        [id]: { x: 0, y: 0, dragging: false },
      }));
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
  };

  const copyManifestoQuote = () => {
    navigator.clipboard.writeText("We don't just study technology. We architect the future.");
    setCopied(true);
    sound.beep();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full bg-surface-dark py-20 px-4 md:px-8 border-b border-border-subtle relative" id="about">
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Manifesto Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-pink"></span>
            <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-pink font-bold">
              ABOUT • THE CIPHER MANIFESTO
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            WE DON'T JUST STUDY TECHNOLOGY. WE ARCHITECT THE FUTURE.
          </h2>

          <p className="font-body text-base md:text-lg text-[#DFE2EF]/90 leading-relaxed">
            CIPHER is the premier IT Students' Executive Council of MIT Academy of Engineering, Alandi, Pune. As an elite technical collective, it unites visionary developers, security researchers, and creative problem solvers under a shared mission: to architect the next generation of digital infrastructure.
          </p>

          <p className="font-body text-base md:text-lg text-[#DFE2EF]/80 leading-relaxed">
            Beyond traditional academics, CIPHER serves as a high-octane launchpad for innovation — orchestrating industry-standard hackathons, technical symposiums, and deep-tech workshops that transform students into industry-ready engineers.
          </p>

          {/* Torn Sketchbook Memo Pad with StringTune 3D Tilt */}
          <div
            string="tilt"
            className="relative bg-paper text-canvas border-2 border-canvas shadow-hard-lg p-6 sm:p-8 mt-2 overflow-hidden rotate-[-0.5deg]"
          >
            {/* Top Notebook Spiral/Perforation Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-dashed border-canvas/20">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#B7046C]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
                  OFFICIAL CREED
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="classified-stamp !text-[10px] !py-0.5 !px-2 rotate-1">
                  OFFICIAL CHARTER
                </span>
                <button
                  onClick={copyManifestoQuote}
                  className="flex items-center gap-1 font-mono text-xs text-canvas/70 hover:text-canvas underline cursor-pointer"
                  title="Copy quote"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-lime-dark" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Background Coffee Cup Ring Watermark SVG */}
            <svg
              className="absolute -right-8 -bottom-10 w-44 h-44 text-canvas/5 pointer-events-none"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <circle cx="50" cy="50" r="40" strokeDasharray="6,4" />
              <circle cx="48" cy="48" r="36" opacity="0.6" />
            </svg>

            {/* Core Manifesto Quote with Yellow Highlighter Background */}
            <div className="pt-5 relative z-10 flex flex-col gap-3">
              <blockquote className="text-xl sm:text-2xl font-display font-bold leading-snug text-canvas">
                <span className="bg-[#FFE07E]/80 px-2 py-0.5 box-decoration-clone">
                  "We don't just study technology. We architect the future."
                </span>
              </blockquote>
              <div className="flex items-center justify-between text-xs font-mono text-canvas/60 pt-2 flex-wrap gap-2">
                <span>EST. 2018 • MITAOE IT STUDENT COUNCIL</span>
                <span className="font-bold text-pink">ALANDI, PUNE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pin-board Sticky Notes (Interactive Draggable with Torn Washi Tape) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 relative">
          
          {/* Sticky Note 1: Lime Yellow #F4FFA4 */}
          <div
            onPointerDown={(e) => handlePointerDown('note1', e)}
            style={{
              transform: `translate3d(${cardPositions.note1.x}px, ${cardPositions.note1.y}px, 0) rotate(1.2deg)`,
              transition: cardPositions.note1.dragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className={`pinned-card relative bg-[#F4FFA4] text-canvas p-6 shadow-hard-md border border-[#0A0E17] select-none ${
              cardPositions.note1.dragging ? 'is-dragging' : ''
            }`}
          >
            {/* Torn Washi Tape Top */}
            <div className="washi-tape washi-tape-yellow tape-torn-h -top-3 left-1/2 -translate-x-1/2 w-28 rotate-1"></div>
            
            {/* Pushpin */}
            <div className="absolute top-2 right-3 w-4 h-4 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="#0A0E17"/><circle cx="12" cy="12" r="2.5" fill="#C6FF3D"/></svg>
            </div>

            <span className="font-mono text-xs font-bold block uppercase tracking-wider text-[#31353F]">
              ⚡ NATIONAL HACKATHON
            </span>
            <p className="font-display text-xl font-bold mt-1 text-canvas leading-snug">
              VELORA 1.0 (CIPHER x IEEE)
            </p>
            <p className="font-body text-sm font-medium opacity-90 mt-2">
              24-hour national hackathon with 250+ registered squads across 7 tracks. Submission stage closes 5 April 2026; Grand Finale on 11 April 2026.
            </p>
            <div className="mt-3 pt-2 border-t border-dashed border-canvas/20 flex justify-between items-center font-mono text-[11px] text-canvas/70">
              <span className="font-bold">STATUS: 250+ REGISTERED</span>
              <span className="text-[10px]">[DRAGGABLE 📌]</span>
            </div>
          </div>

          {/* Sticky Note 2: Hot Pink #FF4FA3 */}
          <div
            onPointerDown={(e) => handlePointerDown('note2', e)}
            style={{
              transform: `translate3d(${cardPositions.note2.x}px, ${cardPositions.note2.y}px, 0) rotate(-1.8deg)`,
              transition: cardPositions.note2.dragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className={`pinned-card relative bg-[#FF4FA3] text-canvas p-6 shadow-hard-md border border-[#0A0E17] select-none ${
              cardPositions.note2.dragging ? 'is-dragging' : ''
            }`}
          >
            {/* Lime Washi Tape */}
            <div className="washi-tape washi-tape-lime tape-torn-h -top-3 right-6 w-24 -rotate-3"></div>
            
            {/* Pushpin */}
            <div className="absolute top-2 left-3 w-4 h-4 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="#FFFFFF"/><circle cx="12" cy="12" r="2.5" fill="#FF334B"/></svg>
            </div>

            <span className="font-mono text-xs font-bold block uppercase tracking-widest text-canvas">
              🎯 DEDICATED DOMAINS
            </span>
            <p className="font-display text-xl font-bold mt-1 text-canvas">
              DEEP-TECH SPECIALIZATIONS
            </p>
            <p className="font-body text-sm font-medium text-canvas/90 mt-2">
              Cybersecurity, Agentic AI/AI-ML, Web3 &amp; Blockchain, FinTech, EdTech, MedTech, and Open Innovation.
            </p>
            <div className="mt-3 pt-2 border-t border-dashed border-canvas/20 flex justify-between items-center font-mono text-[11px] text-canvas">
              <span className="font-bold">DOMAINS: 7 ACTIVE</span>
              <span className="text-[10px]">[DRAGGABLE 📌]</span>
            </div>
          </div>

          {/* Sticky Note 3: Cream Index Card #F3EFE3 */}
          <div
            onPointerDown={(e) => handlePointerDown('note3', e)}
            style={{
              transform: `translate3d(${cardPositions.note3.x}px, ${cardPositions.note3.y}px, 0) rotate(1.8deg)`,
              transition: cardPositions.note3.dragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)',
            }}
            className={`pinned-card relative bg-paper text-canvas p-6 shadow-hard-md border border-[#0A0E17] select-none ${
              cardPositions.note3.dragging ? 'is-dragging' : ''
            }`}
          >
            {/* Yellow Washi Tape */}
            <div className="washi-tape washi-tape-yellow tape-torn-h -top-3 left-8 w-28 rotate-1"></div>
            
            {/* Pushpin */}
            <div className="absolute top-2 right-4 w-4 h-4 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="#0A0E17"/><circle cx="12" cy="12" r="2.5" fill="#FFD84D"/></svg>
            </div>

            <span className="font-mono text-xs font-bold block uppercase text-ash-dark">
              🏛️ EXECUTIVE COUNCIL
            </span>
            <p className="font-display text-xl font-bold mt-1 text-canvas">
              STUDENT-DRIVEN IMPACT
            </p>
            <p className="font-body text-sm text-canvas/90 mt-2">
              Nurturing technical excellence, leadership, and creativity, empowering students to solve real-world challenges.
            </p>
            
            {/* Marker Callout Doodle in Caveat */}
            <div
              className="mt-3 pt-2 border-t border-dashed border-canvas/20 text-lg text-[#93000A] font-marker font-bold flex items-center gap-1.5"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              <span>MIT Academy of Engineering, Pune ⚡</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
