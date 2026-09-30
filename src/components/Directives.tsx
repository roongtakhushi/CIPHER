import React, { useState } from 'react';
import { DIRECTIVES_DATA, COUNCIL_VISION } from '../data/directives';
import { sound } from '../utils/sound';
import { Sparkles, CheckSquare, Square, Quote, Compass } from 'lucide-react';

export const Directives: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<{ [key: string]: boolean }>({
    'd-1': true,
    'd-2': true,
    'd-3': true,
    'd-4': true,
  });

  const toggleCheck = (id: string) => {
    sound.beep();
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-canvas py-20 px-4 md:px-8 relative border-b border-border-subtle" id="vision">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10">
        
        {/* Council Core Vision Paper Placard (High-Friction Paper Surface with Hard Shadow) */}
        <div className="relative bg-paper text-canvas p-6 sm:p-10 border-2 border-canvas shadow-hard-lg flex flex-col gap-5 rotate-[-0.5deg]">
          {/* Top Washi Tape Corner */}
          <div className="washi-tape washi-tape-lime tape-torn-h -top-3 left-10 w-28 rotate-1"></div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-pink font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-pink" />
              <span>COUNCIL VISION &amp; CORE CREED</span>
            </span>
            <span
              className="text-lg text-canvas/70 font-marker"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              The Vision 💡
            </span>
          </div>

          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-canvas tracking-tight leading-snug">
            "{COUNCIL_VISION.quote.toUpperCase()}"
          </blockquote>

          {/* Official Scraped Vision Statement */}
          <div className="bg-white/80 border border-canvas/20 p-4 sm:p-5 shadow-sm">
            <span className="font-mono text-[11px] font-bold text-pink uppercase block mb-1">
              [ OFFICIAL VISION STATEMENT ]
            </span>
            <p className="font-body text-base sm:text-lg text-canvas/90 leading-relaxed font-medium">
              "{COUNCIL_VISION.visionStatement}"
            </p>
          </div>

          <div className="flex items-center gap-2 text-canvas/70 font-mono text-xs pt-2 flex-wrap border-t border-dashed border-canvas/20">
            <span className="text-canvas font-bold">CIPHER — IT STUDENTS' EXECUTIVE COUNCIL</span>
            <span>✦</span>
            <span>{COUNCIL_VISION.institution}</span>
          </div>
        </div>

        {/* Taped Mission Blueprint Board (Level 4, 2px Lime Border, Hard Offset) */}
        <div className="relative bg-surface-card border-2 border-lime p-6 sm:p-10 shadow-hard-lg mt-4">
          {/* Dual Asymmetrical Torn Washi Tape Accents */}
          <div className="washi-tape washi-tape-yellow tape-torn-h -top-4 left-1/4 w-36 -rotate-1"></div>
          <div className="washi-tape washi-tape-pink tape-torn-h -top-4 right-1/4 w-36 rotate-2"></div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle">
              <span className="font-mono text-lg font-bold text-white uppercase tracking-wider">
                COUNCIL MISSION PILLARS
              </span>
              <span className="inline-flex items-center gap-2 bg-lime text-canvas font-mono text-xs px-3 py-1 font-bold uppercase shadow-hard-sm">
                <span className="w-2 h-2 bg-canvas"></span>
                <span>STATUS: 4 PILLARS ACTIVE</span>
              </span>
            </div>

            {/* 4 Mission Directives 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIRECTIVES_DATA.map((dir) => {
                const isChecked = checkedIds[dir.id];
                return (
                  <div
                    key={dir.id}
                    onClick={() => toggleCheck(dir.id)}
                    className={`bg-surface-dark border p-5 flex items-start gap-4 transition-all cursor-pointer group ${
                      isChecked ? 'border-border-subtle hover:border-lime/60' : 'border-[#FF334B]/40 opacity-70'
                    }`}
                  >
                    <button
                      className="font-mono text-xl font-bold mt-0.5 cursor-pointer select-none"
                      style={{ color: isChecked ? dir.accentColor : '#A8AFC0' }}
                      title="Toggle Directive Status"
                    >
                      {isChecked ? '[✓]' : '[ ]'}
                    </button>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-lg font-semibold text-white group-hover:text-lime transition-colors">
                        {dir.number}. {dir.title}
                      </h3>
                      <p className="font-body text-sm text-ash leading-relaxed">
                        {dir.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
