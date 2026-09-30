import React, { useState, useEffect } from 'react';
import { VELORA_TIMELINE, VELORA_HACKATHON_INFO, SUPPORTING_EVENTS } from '../data/events';
import { sound } from '../utils/sound';
import { Trophy, Calendar, MapPin, Layers, ArrowRight, Clock, Flag, Coffee, ExternalLink, ShieldCheck, Cpu, Code2, Sparkles } from 'lucide-react';

interface VeloraWarRoomProps {
  onOpenSquadModal: () => void;
}

export const VeloraWarRoom: React.FC<VeloraWarRoomProps> = ({ onOpenSquadModal }) => {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);

  // Scroll detection to update active timeline milestone
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('velora');
          if (section) {
            const rect = section.getBoundingClientRect();
            const scrollDistance = rect.height - window.innerHeight;
            if (scrollDistance > 0) {
              const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
              const index = Math.min(VELORA_TIMELINE.length - 1, Math.floor(progress * VELORA_TIMELINE.length));
              setActiveMilestoneIndex((prev) => (prev !== index ? index : prev));
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full corkboard-texture text-canvas py-20 px-4 md:px-8 relative border-b-2 border-canvas" id="velora">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 pb-2 border-b border-canvas/20">
          <div className="flex flex-col gap-2">
            <div className="classified-stamp self-start rotate-1">
              CIPHER x IEEE • NATIONAL-LEVEL 24HR HACKATHON
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-bold tracking-tight text-canvas leading-none">
              VELORA 1.0 — DARE TO COMPETE
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-canvas uppercase bg-white/90 border border-canvas px-3 py-1 shadow-hard-sm">
            250+ SQUADS REGISTERED
          </span>
        </div>

        {/* 24-HOUR VELORA HACKATHON ILLUSTRATED ROADMAP */}
        <div className="bg-white border-2 border-canvas p-5 sm:p-7 shadow-hard-md relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-canvas/15">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
                VELORA 24-HOUR SPRINT TIMELINE
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 bg-pink animate-ping"></span>
              <span className="font-bold text-pink">
                T+{VELORA_TIMELINE[activeMilestoneIndex].hour}: {VELORA_TIMELINE[activeMilestoneIndex].title}
              </span>
            </div>
          </div>

          {/* Interactive Roadmap Step Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4 font-mono text-xs">
            {VELORA_TIMELINE.map((m, idx) => {
              const isActive = idx === activeMilestoneIndex;
              return (
                <div
                  key={m.hour}
                  onClick={() => {
                    sound.click(650 + idx * 50, 0.03);
                    setActiveMilestoneIndex(idx);
                  }}
                  className={`p-3 border border-canvas transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-lime text-canvas font-bold shadow-hard-sm -translate-y-0.5'
                      : 'bg-paper text-canvas/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="block font-bold text-xs">{m.hour}</span>
                    {idx === 0 && <Flag className="w-3 h-3 text-canvas/60" />}
                    {idx === 2 && <Coffee className="w-3 h-3 text-canvas/60" />}
                    {idx === 4 && <Trophy className="w-3 h-3 text-canvas/60" />}
                  </div>
                  <span className="block font-bold text-xs mt-1">{m.title}</span>
                  <span className="text-[11px] block mt-1 line-clamp-2 leading-tight opacity-80">
                    {m.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Animated Sprint Progress Track */}
          <div className="w-full h-2.5 bg-paper border border-canvas mt-4 overflow-hidden">
            <div
              className="h-full bg-lime border-r-2 border-canvas transition-all duration-300"
              style={{ width: `${((activeMilestoneIndex + 1) / VELORA_TIMELINE.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Massive Pinned "Velora 1.0" Poster Card with StringTune 3D Tilt */}
        <div
          string="tilt"
          className="pinned-card relative bg-white text-canvas p-6 sm:p-10 md:p-12 border-2 border-canvas shadow-hard-lg -rotate-0.5"
        >
          {/* Asymmetrical Torn Corner Washi Tape */}
          <div className="washi-tape washi-tape-yellow tape-torn-h -top-4 -left-4 w-32 -rotate-45"></div>
          <div className="washi-tape washi-tape-yellow tape-torn-h -top-4 -right-4 w-32 rotate-45"></div>

          {/* Die-Cut Vinyl Starburst Sticker Badge */}
          <div
            string="magnetic"
            className="absolute -top-5 right-6 sm:right-16 die-cut-sticker bg-pink text-canvas rotate-6 shadow-hard-sm"
          >
            ★ 24HR HACKATHON • 250+ SQUADS ★
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <span className="font-mono text-xs font-bold text-pink uppercase tracking-wider">
                CIPHER x IEEE FLAGSHIP HACKATHON
              </span>
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-canvas uppercase leading-tight">
                {VELORA_HACKATHON_INFO.title}
              </h3>
              <p className="font-body text-base md:text-lg text-canvas/90 leading-relaxed pt-1">
                {VELORA_HACKATHON_INFO.subtitle}. Teams will sprint from napkin wireframes to functional intelligent architecture before a panel of veteran engineers and IEEE evaluators.
              </p>
            </div>

            {/* 4 Metadata Placards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 bg-paper border border-canvas p-4 sm:p-5 shadow-hard-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-canvas/60 font-mono text-xs font-bold uppercase">
                  <Calendar className="w-3.5 h-3.5 text-pink" />
                  <span>FINAL ROUND</span>
                </div>
                <span className="font-mono text-base sm:text-lg font-bold text-canvas">11 APRIL 2026</span>
                <span className="font-mono text-xs font-semibold text-pink">24 HOURS NON-STOP</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-canvas/60 font-mono text-xs font-bold uppercase">
                  <MapPin className="w-3.5 h-3.5 text-lime-dark" />
                  <span>LOCATION</span>
                </div>
                <span className="font-mono text-base sm:text-lg font-bold text-canvas">MITAOE CAMPUS</span>
                <span className="font-mono text-xs font-semibold text-canvas/70">ALANDI, PUNE</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-canvas/60 font-mono text-xs font-bold uppercase">
                  <Trophy className="w-3.5 h-3.5 text-pink" />
                  <span>TEAM FORMAT</span>
                </div>
                <span className="font-mono text-base sm:text-lg font-bold text-pink">2–5 MEMBERS</span>
                <span className="font-mono text-xs font-semibold text-canvas/70">250+ SQUADS REGISTERED</span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-canvas/60 font-mono text-xs font-bold uppercase">
                  <Layers className="w-3.5 h-3.5 text-canvas" />
                  <span>DOMAINS</span>
                </div>
                <span className="font-mono text-sm sm:text-base font-bold text-canvas uppercase">7 SPECIALIZED</span>
                <span className="font-mono text-xs font-semibold text-canvas/70">CYBER • AI • WEB3 • FINTECH</span>
              </div>
            </div>

            {/* Official 2-Round Structure Details Placard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {VELORA_HACKATHON_INFO.rounds.map((rnd) => (
                <div
                  key={rnd.round}
                  className="bg-[#FAF7EE] border-2 border-canvas p-5 shadow-hard-sm flex flex-col gap-2 relative"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-canvas/20">
                    <span className="font-mono text-xs font-bold text-white bg-canvas px-2.5 py-0.5">
                      {rnd.round}
                    </span>
                    <span className="font-mono text-xs font-bold text-pink">
                      {rnd.status}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-canvas">
                    {rnd.title}
                  </h4>
                  <div className="font-mono text-xs font-bold text-pink">
                    DEADLINE: {rnd.deadline}
                  </div>
                  <p className="font-body text-sm text-canvas/80 leading-relaxed pt-1">
                    {rnd.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 7 Specialized Tracks Chips */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="font-mono text-xs font-bold uppercase text-canvas/70">
                OFFICIAL HACKATHON TRACKS:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {VELORA_HACKATHON_INFO.tracks.map((t) => (
                  <span
                    key={t.name}
                    className="font-mono text-xs px-3 py-1.5 bg-white border border-canvas shadow-sm font-bold flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }}></span>
                    <span>{t.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons & Unstop Portal Link */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-canvas/15">
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={VELORA_HACKATHON_INFO.unstopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click(800, 0.04)}
                  string="magnetic"
                  className="btn-paper-secondary !bg-lime !text-canvas !border-canvas hover:!bg-[#B2FF00] font-bold flex items-center gap-2 shadow-hard-sm"
                >
                  <span>REGISTER ON UNSTOP</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={VELORA_HACKATHON_INFO.eventSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click(600, 0.03)}
                  className="font-mono text-xs font-bold text-canvas border border-canvas px-4 py-2.5 bg-white hover:bg-paper transition-all flex items-center gap-1.5 shadow-hard-sm"
                >
                  <span>EVENT SITE (VELORA-CIPHER)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    sound.click(700, 0.04);
                    onOpenSquadModal();
                  }}
                  className="font-mono text-xs font-bold text-white bg-canvas hover:bg-surface-dark px-4 py-2.5 border border-canvas transition-all flex items-center gap-1.5 shadow-hard-sm cursor-pointer"
                >
                  <span>QUICK SQUAD RSVP</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime" />
                </button>
              </div>

              {/* Handwritten Note in Caveat */}
              <div
                className="flex items-center gap-1.5 text-2xl text-pink font-marker font-bold select-none"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                <span>Dare to compete ⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Supporting Event Flyers Pinned with Washi Tape */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {SUPPORTING_EVENTS.map((ev) => (
            <div
              key={ev.id}
              style={{ transform: `rotate(${ev.tilt}deg)` }}
              className="pinned-card relative bg-white text-canvas p-6 border-2 border-canvas shadow-hard-md flex flex-col justify-between"
            >
              {/* Torn Tape */}
              <div
                className={`washi-tape washi-tape-${ev.tapeColor} tape-torn-h -top-3 ${
                  ev.tapeColor === 'yellow'
                    ? 'left-1/3 w-24 -rotate-2'
                    : ev.tapeColor === 'pink'
                    ? 'right-6 w-24 rotate-3'
                    : 'left-6 w-24 -rotate-3'
                }`}
              ></div>

              {/* Pushpin */}
              <div className="absolute top-2 right-3 w-4 h-4 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" fill={ev.categoryColor} />
                </svg>
              </div>

              <div>
                <span className="font-mono text-xs font-bold block uppercase" style={{ color: ev.categoryColor }}>
                  {ev.category}
                </span>
                <h4 className="font-display text-xl font-bold mt-1 uppercase text-canvas leading-tight">
                  {ev.title}
                </h4>
                <p className="font-body text-sm text-canvas/80 mt-2 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-canvas/20 flex justify-between items-center font-mono text-xs font-bold">
                <span className="bg-surface-dark text-white px-2 py-0.5">{ev.format}</span>
                <span className="text-pink">{ev.duration}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
