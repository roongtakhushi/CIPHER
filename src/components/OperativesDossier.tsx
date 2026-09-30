import React, { useState } from 'react';
import { OPERATIVES_DATA, Operative } from '../data/council';
import { OperativeDoodle } from './OperativeDoodle';
import { CouncilFilmStrip } from './CouncilFilmStrip';
import { MemberDetailModal } from './MemberDetailModal';
import { sound } from '../utils/sound';
import { Filter, Film, LayoutGrid } from 'lucide-react';

export const OperativesDossier: React.FC = () => {
  const [viewMode, setViewMode] = useState<'film' | 'grid'>('film');
  const [filterCategory, setFilterCategory] = useState<'all' | 'exec' | 'tech' | 'ops' | 'design'>('all');
  const [selectedMember, setSelectedMember] = useState<Operative | null>(null);
  const [cardPositions, setCardPositions] = useState<{ [key: string]: { x: number; y: number; dragging: boolean } }>({});

  const filteredOperatives = OPERATIVES_DATA.filter((op) => {
    if (filterCategory === 'all') return true;
    return op.departmentCategory === filterCategory;
  });

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    sound.click(420, 0.03);
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    const currentPos = cardPositions[id] || { x: 0, y: 0, dragging: false };
    const startX = e.clientX - currentPos.x;
    const startY = e.clientY - currentPos.y;

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
      setCardPositions((prev) => ({
        ...prev,
        [id]: { x: 0, y: 0, dragging: false },
      }));
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
  };

  return (
    <section className="w-full corkboard-texture text-canvas pb-28 pt-8 px-4 md:px-8 relative border-b-2 border-canvas" id="council">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10 relative z-10">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-canvas/20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink"></span>
              <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-pink font-bold">
                THE COUNCIL (TEAM) • MITAOE IT
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-bold tracking-tight text-canvas leading-none">
              STUDENT EXECUTIVE COUNCIL
            </h2>
            <p className="font-body text-base md:text-lg text-canvas/80 max-w-2xl">
              The visionary students driving CIPHER at MIT Academy of Engineering, Alandi, Pune. Meet the team architecting the future of campus technology.
            </p>
          </div>

          {/* Controls Group: View Switcher & Category Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Toggle: Film Reel vs Pinned Polaroids */}
            <div className="flex items-center bg-white/95 border-2 border-canvas p-1 shadow-hard-sm font-mono text-xs">
              <button
                onClick={() => {
                  sound.click(650, 0.03);
                  setViewMode('film');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[42px] sm:min-h-0 transition-all cursor-pointer font-bold ${
                  viewMode === 'film'
                    ? 'bg-canvas text-white shadow-sm'
                    : 'text-canvas/70 hover:text-canvas hover:bg-paper'
                }`}
                title="View as horizontally moving 35mm paper film strip"
              >
                <Film className="w-3.5 h-3.5 text-pink" />
                <span>FILM REEL</span>
              </button>

              <button
                onClick={() => {
                  sound.click(550, 0.03);
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[42px] sm:min-h-0 transition-all cursor-pointer font-bold ${
                  viewMode === 'grid'
                    ? 'bg-canvas text-white shadow-sm'
                    : 'text-canvas/70 hover:text-canvas hover:bg-paper'
                }`}
                title="View as classic pinned polaroid corkboard cards"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-lime-dark" />
                <span>POLAROIDS</span>
              </button>
            </div>

            {/* Interactive Department Filter Tabs */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full font-mono text-xs bg-white/90 p-1 border-2 border-canvas shadow-hard-sm no-scrollbar">
              <span className="flex items-center gap-1 text-canvas/70 px-2 font-bold hidden xl:flex shrink-0">
                <Filter className="w-3 h-3 text-pink" />
                <span>ROSTER:</span>
              </span>
              {(
                [
                  { key: 'all', label: 'ALL (9)' },
                  { key: 'exec', label: 'EXEC (3)' },
                  { key: 'tech', label: 'TECH (1)' },
                  { key: 'ops', label: 'OPS (4)' },
                  { key: 'design', label: 'DESIGN (1)' },
                ] as const
              ).map((tab) => {
                const isActive = filterCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      sound.click(600, 0.02);
                      setFilterCategory(tab.key);
                    }}
                    className={`px-3 py-2 sm:py-1.5 min-h-[40px] sm:min-h-0 shrink-0 transition-all cursor-pointer font-bold text-[11px] ${
                      isActive ? 'bg-canvas text-white shadow-sm' : 'text-canvas/80 hover:bg-paper'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* View Content: Horizontal Film Strip Reel or Classic Corkboard Polaroids */}
        {viewMode === 'film' ? (
          /* Horizontal Moving Paper Film Strip Reel */
          <div className="pt-2 animate-fadeIn">
            <CouncilFilmStrip
              members={filteredOperatives}
              onSelectMember={(op) => setSelectedMember(op)}
            />
          </div>
        ) : (
          /* Classic 9 Polaroid Studio Corkboard Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 animate-fadeIn">
            {filteredOperatives.map((op) => {
              const pos = cardPositions[op.id] || { x: 0, y: 0, dragging: false };
              return (
                <div
                  key={op.id}
                  onPointerDown={(e) => handlePointerDown(op.id, e)}
                  onClick={() => {
                    if (!pos.dragging) {
                      sound.click(700, 0.03);
                      setSelectedMember(op);
                    }
                  }}
                  string="tilt"
                  style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${op.tilt}deg)`,
                    transition: pos.dragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease',
                  }}
                  className={`pinned-card relative bg-white p-5 border-2 border-canvas shadow-hard-md flex flex-col justify-between select-none group cursor-pointer ${
                    pos.dragging ? 'is-dragging' : ''
                  }`}
                  title="Click to view full dossier"
                >
                  {/* Torn Washi Tape Anchor at Top */}
                  <div
                    className={`washi-tape washi-tape-${op.tapeColor} tape-torn-h -top-3.5 ${
                      op.tapeColor === 'yellow'
                        ? 'left-1/2 -translate-x-1/2 w-28 rotate-1'
                        : op.tapeColor === 'pink'
                        ? 'right-6 w-24 -rotate-3'
                        : 'left-6 w-24 rotate-2'
                    }`}
                  ></div>

                  {/* Pushpin Marker Top Corner */}
                  <div
                    className="pushpin-marker absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full border border-canvas shadow-sm pointer-events-none z-10"
                    style={{ backgroundColor: op.pinColor }}
                  ></div>

                  {/* Die-Cut Sticker Badge with StringTune Magnetic Attraction */}
                  {op.badge && (
                    <div
                      string="magnetic"
                      className="die-cut-sticker absolute -bottom-3 right-4 text-canvas shadow-hard-sm rotate-6"
                      style={{ backgroundColor: op.badgeColor || '#FF4FA3' }}
                    >
                      ★ {op.badge} ★
                    </div>
                  )}

                  {/* Polaroid Photo Window (1:1 Aspect ratio with sketch doodle) */}
                  <div className="relative w-full aspect-square bg-[#FBF8EF] border-2 border-canvas p-3 flex flex-col items-center justify-center overflow-hidden transition-colors group-hover:bg-[#FFFDF7]">
                    {/* Subtle Sketch Grid Texture */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-25"
                      style={{
                        backgroundImage: 'radial-gradient(#262A34 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />

                    {/* Top Status Tag inside Photo Frame */}
                    <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 font-mono text-[10px] bg-white/95 text-canvas border border-canvas px-2 py-0.5 font-bold shadow-hard-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>
                      <span>{op.status}</span>
                    </div>

                    <div className="absolute top-2 left-2 z-10 font-mono text-[10px] font-bold text-canvas/50">
                      {op.code}
                    </div>

                    {/* Hand-Drawn SVG Character Doodle */}
                    <div className="relative z-0 w-36 h-36 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <OperativeDoodle id={op.id} className="w-full h-full" />
                    </div>
                  </div>

                  {/* Polaroid Caption Space */}
                  <div className="pt-4 flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3 className="font-display text-2xl font-bold text-canvas leading-tight tracking-tight">
                        {op.name}
                      </h3>
                      <p className="font-mono text-xs font-bold text-pink tracking-wide">
                        {op.role}
                      </p>
                    </div>

                    {/* Handwritten Quote in Caveat Cursive */}
                    <div className="pt-2 border-t border-dashed border-canvas/25">
                      <p
                        className="text-xl text-canvas font-marker leading-snug"
                        style={{ fontFamily: "'Caveat', cursive" }}
                      >
                        {op.quote}
                      </p>
                    </div>
                  </div>

                  {/* Draggable & Click hint */}
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-canvas/40 uppercase tracking-widest">
                    <span>[CLICK TO EXPAND]</span>
                    <span>[DRAG TO PIN 📌]</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Retro Polaroid Inspection Lightbox Modal */}
      <MemberDetailModal
        member={selectedMember}
        allMembers={filteredOperatives}
        onClose={() => setSelectedMember(null)}
        onSelectMember={(op) => setSelectedMember(op)}
      />
    </section>
  );
};
