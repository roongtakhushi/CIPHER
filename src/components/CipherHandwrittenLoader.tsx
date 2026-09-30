import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/sound';
import { ArrowRight } from 'lucide-react';

interface CipherHandwrittenLoaderProps {
  onComplete: () => void;
}

export const CipherHandwrittenLoader: React.FC<CipherHandwrittenLoaderProps> = ({ onComplete }) => {
  const [isSkipped, setIsSkipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  const finishAndExit = () => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    // Immediately disable pointer events so mobile touches and scrolls are never blocked
    if (containerRef.current) {
      containerRef.current.style.pointerEvents = 'none';
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(-16px) scale(1.02)';
      containerRef.current.style.transition = 'opacity 0.28s cubic-bezier(0.2, 0, 0, 1), transform 0.28s cubic-bezier(0.2, 0, 0, 1)';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'instant' });
    }

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
    }, 280);
  };

  const handleSkip = () => {
    if (isSkipped || hasCompletedRef.current) return;
    setIsSkipped(true);
    sound.click(650, 0.03);
    finishAndExit();
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
      return;
    }

    // Always reset scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initial audio cue
    try {
      sound.click(520, 0.02);
    } catch (e) {}

    // Complete loader after smooth calligraphy finishes (~1.75s)
    const exitTimer = setTimeout(() => {
      finishAndExit();
    }, 1800);

    // Hard failsafe in case browser delays
    const failsafeTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        finishAndExit();
      }
    }, 2400);

    // Keyboard shortcut listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(failsafeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F3EFE3] text-canvas select-none cursor-pointer overflow-hidden transition-all"
      style={{
        backgroundImage: `
          radial-gradient(#262A34 0.75px, transparent 0.75px),
          radial-gradient(#8D937B 0.6px, transparent 0.6px)
        `,
        backgroundSize: '20px 20px, 32px 32px',
        backgroundPosition: '0 0, 10px 10px',
      }}
      title="Tap anywhere or press Space to skip directly to hero"
    >
      {/* Top Header Tag */}
      <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-pink"></span>
        <span className="font-mono text-xs uppercase tracking-widest text-canvas/70 font-bold">
          [MITAOE • IT STUDENTS' EXECUTIVE COUNCIL]
        </span>
      </div>

      {/* Skip Button Top Right */}
      <div className="absolute top-6 right-6 sm:right-12">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="btn-paper-secondary !text-xs !py-1 !px-3 font-mono flex items-center gap-1.5 shadow-hard-sm"
        >
          <span>Skip [ESC]</span>
          <ArrowRight className="w-3 h-3 text-pink" />
        </button>
      </div>

      {/* Centerpiece: GPU-Accelerated 120 FPS Calligraphy Vector */}
      <div className="relative w-full max-w-2xl px-6 flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 700 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          {/* Stroke 0: Letter C (Length: 272) */}
          <path
            d="M 115 50 C 95 38 70 42 55 58 C 35 78 30 115 48 140 C 65 158 98 158 122 144 C 135 136 142 125 146 116"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 272,
              strokeDashoffset: 272,
              ['--stroke-length' as any]: '272px',
              animation: 'drawCalligraphyStroke 0.28s cubic-bezier(0.42, 0, 0.15, 1) 0.05s forwards',
            }}
          />

          {/* Stroke 1: Letter I stem (Length: 91) */}
          <path
            d="M 185 72 C 185 95 183 125 183 146 C 183 152 188 154 195 148"
            stroke="#FF4FA3"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 91,
              strokeDashoffset: 91,
              ['--stroke-length' as any]: '91px',
              animation: 'drawCalligraphyStroke 0.22s cubic-bezier(0.42, 0, 0.15, 1) 0.22s forwards',
            }}
          />

          {/* Letter I Dot: Bounces in dynamically */}
          <circle
            cx="185"
            cy="46"
            r="6.5"
            fill="#C6FF3D"
            stroke="#0A0E17"
            strokeWidth="2.5"
            style={{
              opacity: 0,
              transformOrigin: '185px 46px',
              animation: 'popDot 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s forwards',
            }}
          />

          {/* Stroke 2: Letter P - Downward stem (Length: 100) */}
          <path
            d="M 235 70 L 235 170"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              ['--stroke-length' as any]: '100px',
              animation: 'drawCalligraphyStroke 0.20s cubic-bezier(0.42, 0, 0.15, 1) 0.38s forwards',
            }}
          />

          {/* Stroke 3: Letter P - Loop / Bowl (Length: 153) */}
          <path
            d="M 235 74 C 260 62 295 65 296 94 C 298 118 268 124 235 122"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 153,
              strokeDashoffset: 153,
              ['--stroke-length' as any]: '153px',
              animation: 'drawCalligraphyStroke 0.22s cubic-bezier(0.42, 0, 0.15, 1) 0.48s forwards',
            }}
          />

          {/* Stroke 4: Letter H - Left vertical stem (Length: 96) */}
          <path
            d="M 345 52 L 345 148"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            style={{
              strokeDasharray: 96,
              strokeDashoffset: 96,
              ['--stroke-length' as any]: '96px',
              animation: 'drawCalligraphyStroke 0.20s cubic-bezier(0.42, 0, 0.15, 1) 0.58s forwards',
            }}
          />

          {/* Stroke 5: Letter H - Arch and right stem (Length: 107) */}
          <path
            d="M 345 98 C 368 85 394 86 400 105 L 400 148"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 107,
              strokeDashoffset: 107,
              ['--stroke-length' as any]: '107px',
              animation: 'drawCalligraphyStroke 0.22s cubic-bezier(0.42, 0, 0.15, 1) 0.68s forwards',
            }}
          />

          {/* Stroke 6: Letter E - Loop (Length: 213) */}
          <path
            d="M 440 115 C 460 115 486 112 486 94 C 486 75 462 75 448 94 C 434 112 438 138 458 148 C 474 154 488 148 496 138"
            stroke="#FF4FA3"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 213,
              strokeDashoffset: 213,
              ['--stroke-length' as any]: '213px',
              animation: 'drawCalligraphyStroke 0.25s cubic-bezier(0.42, 0, 0.15, 1) 0.78s forwards',
            }}
          />

          {/* Stroke 7: Letter R - Vertical stem (Length: 76) */}
          <path
            d="M 535 72 L 535 148"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            style={{
              strokeDasharray: 76,
              strokeDashoffset: 76,
              ['--stroke-length' as any]: '76px',
              animation: 'drawCalligraphyStroke 0.18s cubic-bezier(0.42, 0, 0.15, 1) 0.90s forwards',
            }}
          />

          {/* Stroke 8: Letter R - Bowl (Length: 141) */}
          <path
            d="M 535 78 C 558 65 590 66 592 92 C 594 114 566 120 536 120"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 141,
              strokeDashoffset: 141,
              ['--stroke-length' as any]: '141px',
              animation: 'drawCalligraphyStroke 0.20s cubic-bezier(0.42, 0, 0.15, 1) 0.98s forwards',
            }}
          />

          {/* Stroke 9: Letter R - Kick-out Leg (Length: 68) */}
          <path
            d="M 562 120 L 592 148 C 600 152 610 148 616 142"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 68,
              strokeDashoffset: 68,
              ['--stroke-length' as any]: '68px',
              animation: 'drawCalligraphyStroke 0.18s cubic-bezier(0.42, 0, 0.15, 1) 1.08s forwards',
            }}
          />

          {/* Flourish: Marker Wavy Underline (Length: 626) */}
          <path
            d="M 30 172 C 140 162 250 184 360 170 C 470 158 580 180 655 166"
            stroke="#C6FF3D"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 626,
              strokeDashoffset: 626,
              ['--stroke-length' as any]: '626px',
              animation: 'drawCalligraphyStroke 0.38s cubic-bezier(0.35, 0, 0.25, 1) 1.15s forwards',
            }}
          />

          {/* Whimsical Ink Starburst / Sparkle at the End */}
          <path
            d="M 662 166 L 668 152 L 674 166 L 688 172 L 674 178 L 668 192 L 662 178 L 648 172 Z"
            fill="#FF4FA3"
            stroke="#0A0E17"
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{
              opacity: 0,
              transformOrigin: '668px 166px',
              animation: 'popStar 0.30s cubic-bezier(0.34, 1.56, 0.64, 1) 1.30s forwards',
            }}
          />
        </svg>

        {/* Subtitle Annotation in Caveat cursive */}
        <div
          className="flex flex-col items-center gap-1 mt-5"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.35s ease-out 1.35s forwards',
          }}
        >
          <p
            className="text-2xl sm:text-3xl text-canvas font-marker font-bold tracking-wide text-center"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            "We don't just study technology. We architect the future." ⚡
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-canvas/50">
            [Tap anywhere or press Space to skip]
          </span>
        </div>
      </div>

      {/* Bottom Corner Department Accent */}
      <div className="absolute bottom-6 right-8 font-mono text-[11px] text-canvas/60 hidden sm:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-lime"></span>
        <span>MITAOE IT STUDENTS' EXECUTIVE COUNCIL • ALANDI, PUNE</span>
      </div>
    </div>
  );
};
