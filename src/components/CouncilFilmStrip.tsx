import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Operative } from '../data/council';
import { OperativeDoodle } from './OperativeDoodle';
import { sound } from '../utils/sound';
import { Play, Pause, Rewind, FastForward, Sparkles, ZoomIn, Film } from 'lucide-react';

interface CouncilFilmStripProps {
  members: Operative[];
  onSelectMember: (member: Operative) => void;
}

export const CouncilFilmStrip: React.FC<CouncilFilmStripProps> = ({
  members,
  onSelectMember,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Position and momentum refs for smooth animation frame rendering
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Measure single set width
  const updateMetrics = useCallback(() => {
    if (singleSetRef.current) {
      singleSetWidthRef.current = singleSetRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics, members]);

  // Main high-performance Animation Frame Loop
  useEffect(() => {
    const animate = (time: number) => {
      const dt = Math.min(32, time - lastTimeRef.current);
      lastTimeRef.current = time;

      const singleWidth = singleSetWidthRef.current;

      if (!isPointerDownRef.current && singleWidth > 0) {
        // Apply momentum inertia if present
        if (Math.abs(velocityRef.current) > 0.05) {
          offsetRef.current += velocityRef.current * (dt / 16);
          velocityRef.current *= 0.94; // friction decay
        } else {
          velocityRef.current = 0;
          // Normal auto-scroll when playing
          if (isPlaying) {
            // Slow down on hover to 25% speed so content is readable, or stop if paused
            const currentSpeed = isHovered ? 0.22 : speedMultiplier * 0.95;
            offsetRef.current -= currentSpeed * (dt / 16);
          }
        }

        // Infinite loop wrap-around
        if (offsetRef.current <= -singleWidth) {
          offsetRef.current += singleWidth;
        } else if (offsetRef.current > 0) {
          offsetRef.current -= singleWidth;
        }

        // Direct GPU-accelerated CSS translation without React re-render overhead
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPlaying, isHovered, speedMultiplier]);

  // Pointer drag to scrub horizontally
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    isPointerDownRef.current = true;
    setIsDragging(true);
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;

    if (e.pointerType === 'mouse') {
      const target = e.currentTarget as HTMLElement;
      try {
        target.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    offsetRef.current += deltaX;
    velocityRef.current = deltaX * 1.2;

    const singleWidth = singleSetWidthRef.current;
    if (singleWidth > 0) {
      if (offsetRef.current <= -singleWidth) {
        offsetRef.current += singleWidth;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= singleWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    if (e.pointerType === 'mouse') {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    // Subtle tactile mechanical click on release
    sound.click(500, 0.02);
  };

  // Keyboard navigation & wheel scrub
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      offsetRef.current -= e.deltaX * 0.8;
      velocityRef.current = -e.deltaX * 0.4;
    } else if (e.shiftKey) {
      offsetRef.current -= e.deltaY * 0.8;
      velocityRef.current = -e.deltaY * 0.4;
    }
  };

  const handleRewind = () => {
    sound.click(600, 0.03);
    velocityRef.current = 14;
  };

  const handleFastForward = () => {
    sound.click(600, 0.03);
    velocityRef.current = -14;
  };

  const togglePlay = () => {
    sound.beep();
    setIsPlaying((prev) => !prev);
  };

  const toggleSpeed = () => {
    sound.click(750, 0.03);
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1));
  };

  // To guarantee continuous seamless scrolling, repeat the list 3 times
  const sets = [0, 1, 2];

  return (
    <div className="w-full flex flex-col gap-6 select-none relative">
      {/* Top Retro Reel Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2 font-mono text-xs text-canvas/80">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-pink" />
          <span className="font-bold uppercase tracking-wider text-canvas">
            CIPHER 35MM KRAFT ROLL #24
          </span>
          <span className="text-canvas/40">•</span>
          <span className="bg-canvas text-white px-2 py-0.5 font-bold text-[11px] shadow-sm">
            {members.length} FRAMES SPLICED
          </span>
        </div>

        {/* Playback & Scrub Controls */}
        <div className="flex items-center gap-1 sm:gap-2 bg-white/95 border-2 border-canvas p-1 shadow-hard-sm">
          <button
            onClick={handleRewind}
            className="p-2 sm:p-1.5 min-w-[42px] min-h-[42px] sm:min-w-0 sm:min-h-0 flex items-center justify-center hover:bg-paper border border-transparent hover:border-canvas transition-colors cursor-pointer"
            title="Rewind film strip"
            aria-label="Rewind film strip"
          >
            <Rewind className="w-4 h-4 text-canvas" />
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center justify-center gap-1 px-3 py-2 sm:py-1 min-h-[42px] sm:min-h-0 bg-canvas text-white hover:bg-surface-dark transition-colors cursor-pointer font-bold shadow-sm"
            title={isPlaying ? 'Pause auto-reel' : 'Resume auto-reel'}
            aria-label={isPlaying ? 'Pause auto-reel' : 'Resume auto-reel'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-lime" />
                <span className="text-[11px] sm:text-xs">PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-pink" />
                <span className="text-[11px] sm:text-xs">PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={handleFastForward}
            className="p-2 sm:p-1.5 min-w-[42px] min-h-[42px] sm:min-w-0 sm:min-h-0 flex items-center justify-center hover:bg-paper border border-transparent hover:border-canvas transition-colors cursor-pointer"
            title="Advance film strip"
            aria-label="Advance film strip"
          >
            <FastForward className="w-4 h-4 text-canvas" />
          </button>

          <span className="text-canvas/30">|</span>

          <button
            onClick={toggleSpeed}
            className="px-2.5 py-2 sm:py-1 min-h-[42px] sm:min-h-0 hover:bg-paper border border-transparent hover:border-canvas transition-colors cursor-pointer font-bold text-[11px] sm:text-xs"
            title="Toggle playback speed"
          >
            {speedMultiplier}X SPEED
          </button>
        </div>
      </div>

      {/* Main 35mm Perforated Kraft Paper Film Strip Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full overflow-hidden bg-[#161311] border-y-4 border-[#0A0E17] shadow-hard-lg py-5 cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{
          touchAction: 'pan-y',
          boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.45), inset 0 2px 6px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top Sprocket Hole Track with Film Margin Markings */}
        <div className="absolute top-0 left-0 w-full h-8 bg-[#181512] border-b border-[#28221D] flex items-center justify-between px-4 pointer-events-none z-20 overflow-hidden">
          {/* Repeating Perforated Sprocket Holes Top */}
          <div
            className="w-full h-full flex items-center gap-6 opacity-85"
            style={{
              backgroundImage: 'radial-gradient(ellipse at center, #FAF7EE 45%, #C2BAAA 55%, transparent 60%)',
              backgroundSize: '32px 14px',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left center',
            }}
          />
          <div className="absolute top-1 left-8 font-mono text-[9px] text-[#A89F91] tracking-[0.25em] uppercase font-bold select-none opacity-60">
            EASTMAN KRAFT SAFETY FILM • ISO 400 • MITAOE IT COUNCIL
          </div>
        </div>

        {/* Bottom Sprocket Hole Track */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-[#181512] border-t border-[#28221D] flex items-center justify-between px-4 pointer-events-none z-20 overflow-hidden">
          {/* Repeating Perforated Sprocket Holes Bottom */}
          <div
            className="w-full h-full flex items-center gap-6 opacity-85"
            style={{
              backgroundImage: 'radial-gradient(ellipse at center, #FAF7EE 45%, #C2BAAA 55%, transparent 60%)',
              backgroundSize: '32px 14px',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left center',
            }}
          />
          <div className="absolute bottom-1 right-8 font-mono text-[9px] text-[#A89F91] tracking-[0.2em] uppercase font-bold select-none opacity-60">
            ▲ CIPHER ROLL #24 • MITAOE ALANDI PUNE • 35MM
          </div>
        </div>

        {/* Film Negative Moving Ribbon */}
        <div
          ref={trackRef}
          className="flex items-center my-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {sets.map((setIndex) => (
            <div
              key={`set-${setIndex}`}
              ref={setIndex === 0 ? singleSetRef : null}
              className="flex items-center gap-8 px-4"
            >
              {members.map((op, memberIndex) => {
                const frameNumber = String(memberIndex + 1).padStart(2, '0');
                return (
                  <div
                    key={`${op.id}-set-${setIndex}`}
                    onClick={() => {
                      if (!isDragging && Math.abs(velocityRef.current) < 2) {
                        sound.click(700, 0.03);
                        onSelectMember(op);
                      }
                    }}
                    className="group relative w-[270px] sm:w-[320px] bg-[#FAF7EE] text-canvas border-2 border-canvas shadow-hard-md hover:shadow-hard-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between shrink-0"
                  >
                    {/* Washi Tape Splicing Accent on Frame Edge */}
                    <div className="washi-tape washi-tape-yellow tape-torn-h -top-3 left-6 w-24 -rotate-1 z-30"></div>

                    {/* Frame Edge Metadata Bar */}
                    <div className="bg-[#121826] text-white px-3 py-1.5 border-b border-canvas flex items-center justify-between font-mono text-[10px] tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#FFD84D] font-bold">▲ {frameNumber}</span>
                        <span className="text-ash/60">|</span>
                        <span className="text-ash uppercase">{op.code}</span>
                      </div>
                      <span className="text-lime font-bold uppercase">{op.status}</span>
                    </div>

                    {/* Polaroid Exposure Window with Member Character Doodle */}
                    <div className="relative w-full aspect-square bg-[#FFFFFF] border-b-2 border-canvas p-4 flex flex-col items-center justify-center overflow-hidden">
                      {/* Subtle Paper Grid */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          backgroundImage: 'radial-gradient(#262A34 1px, transparent 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      />

                      {/* Badge if present */}
                      {op.badge && (
                        <div
                          className="die-cut-sticker absolute top-2 right-2 text-canvas shadow-sm text-[9px] py-0.5 px-2 rotate-3 z-10 font-mono font-bold"
                          style={{ backgroundColor: op.badgeColor || '#FF4FA3' }}
                        >
                          ★ {op.badge} ★
                        </div>
                      )}

                      {/* Pushpin indicator */}
                      <div
                        className="absolute top-2 left-2 w-3 h-3 rounded-full border border-canvas shadow-sm z-10"
                        style={{ backgroundColor: op.pinColor }}
                      ></div>

                      {/* Interactive Character Doodle */}
                      <div className="w-36 h-36 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <OperativeDoodle id={op.id} className="w-full h-full" />
                      </div>

                      {/* Hover Inspector Pill Callout */}
                      <div className="absolute bottom-2 inset-x-4 bg-canvas/90 text-white py-1 px-2 font-mono text-[10px] flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm shadow-sm pointer-events-none">
                        <ZoomIn className="w-3 h-3 text-lime" />
                        <span>CLICK TO INSPECT DOSSIER</span>
                      </div>
                    </div>

                    {/* Caption / Bio Information */}
                    <div className="p-4 flex flex-col gap-1.5 bg-[#FAF7EE]">
                      <div className="flex items-baseline justify-between gap-1">
                        <h4 className="font-display text-xl font-bold text-canvas leading-tight group-hover:text-pink transition-colors">
                          {op.name}
                        </h4>
                        <span className="font-mono text-[10px] font-bold text-pink uppercase px-1.5 py-0.5 bg-pink/10 border border-pink/20">
                          {op.role}
                        </span>
                      </div>

                      <div className="pt-1.5 border-t border-dashed border-canvas/20">
                        <p
                          className="text-lg text-canvas font-marker leading-snug line-clamp-2"
                          style={{ fontFamily: "'Caveat', cursive" }}
                        >
                          {op.quote}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Frame Stamp */}
                    <div className="bg-[#EFEAE0] px-3 py-1 border-t border-canvas/15 flex items-center justify-between font-mono text-[9px] text-canvas/60">
                      <span>ROLL #24 • FRAME {frameNumber}</span>
                      <span className="text-[10px] text-pink font-bold">CIPHER IT</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-between px-2 font-mono text-[11px] text-canvas/60 flex-wrap gap-2">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink" />
          <span>DRAG HORIZONTALLY TO SCRUB • HOVER TO PAUSE • CLICK FRAME TO INSPECT</span>
        </span>
        <span className="text-canvas/80 font-bold hidden sm:inline-block">
          [ MITAOE IT STUDENT COUNCIL 2024-25 ]
        </span>
      </div>
    </div>
  );
};
