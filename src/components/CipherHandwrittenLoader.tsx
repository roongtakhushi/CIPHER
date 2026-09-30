import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { sound } from '../utils/sound';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CipherHandwrittenLoaderProps {
  onComplete: () => void;
}

export const CipherHandwrittenLoader: React.FC<CipherHandwrittenLoaderProps> = ({ onComplete }) => {
  const [isSkipped, setIsSkipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Stroke refs for seamless calligraphy flow
  const strokeRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRef = useRef<SVGCircleElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const starRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      onComplete();
      return;
    }

    // Always ensure window starts at top of hero
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Prepare each stroke with exact lengths to guarantee zero initial flash
    strokeRefs.current.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.opacity = '1';
      }
    });

    if (underlineRef.current) {
      const uLength = underlineRef.current.getTotalLength();
      underlineRef.current.style.strokeDasharray = `${uLength}`;
      underlineRef.current.style.strokeDashoffset = `${uLength}`;
      underlineRef.current.style.opacity = '1';
    }

    if (starRef.current) {
      const sLength = starRef.current.getTotalLength();
      starRef.current.style.strokeDasharray = `${sLength}`;
      starRef.current.style.strokeDashoffset = `${sLength}`;
      starRef.current.style.opacity = '1';
    }

    // Gentle mechanical ink sound
    sound.click(520, 0.03);

    // Master Anime.js Timeline for iPhone-Style Handwritten Script
    const tl = anime.timeline({
      complete: () => {
        sound.beep();
        // Hold on completed word for 500ms, then smoothly peel away to Hero
        setTimeout(() => {
          handleExit();
        }, 550);
      },
    });

    // Animate each calligraphy stroke sequentially with smooth cursive overlap
    strokeRefs.current.forEach((path, index) => {
      if (!path) return;
      const length = path.getTotalLength();

      tl.add(
        {
          targets: path,
          strokeDashoffset: [length, 0],
          duration: 340,
          easing: 'cubicBezier(0.42, 0.0, 0.15, 1.0)',
          begin: () => {
            sound.click(420 + index * 35, 0.015);
          },
        },
        index === 0 ? '+=150' : '-=160'
      );

      // If this is letter I (index 1), pop the dot on I immediately after
      if (index === 1 && dotRef.current) {
        tl.add(
          {
            targets: dotRef.current,
            scale: [0, 1.3, 1],
            opacity: [0, 1],
            duration: 250,
            easing: 'easeOutBack',
            begin: () => {
              sound.click(720, 0.02);
            },
          },
          '-=80'
        );
      }
    });

    // Flourish: Draw wavy highlighter underline
    if (underlineRef.current) {
      const uLength = underlineRef.current.getTotalLength();
      tl.add(
        {
          targets: underlineRef.current,
          strokeDashoffset: [uLength, 0],
          duration: 520,
          easing: 'cubicBezier(0.35, 0.0, 0.25, 1.0)',
          begin: () => {
            sound.click(800, 0.02);
          },
        },
        '-=120'
      );
    }

    // Flourish: Pop ink starburst at the end
    if (starRef.current) {
      tl.add(
        {
          targets: starRef.current,
          scale: [0, 1.3, 1],
          opacity: [0, 1],
          duration: 380,
          easing: 'easeOutBack',
        },
        '-=180'
      );
    }

    // Subtitle fade-in in Caveat cursive
    tl.add(
      {
        targets: '.loader-subtitle',
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 400,
        easing: 'easeOutCubic',
      },
      '-=250'
    );

    // Keyboard shortcut listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      tl.pause();
    };
  }, []);

  const handleExit = () => {
    // ALWAYS reset scroll to the top of Hero section
    window.scrollTo({ top: 0, behavior: 'instant' });
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'instant' });
    }

    if (!containerRef.current) {
      onComplete();
      return;
    }

    anime({
      targets: containerRef.current,
      opacity: [1, 0],
      scale: [1, 1.03],
      translateY: [0, -25],
      duration: 450,
      easing: 'cubicBezier(0.2, 0, 0, 1)',
      complete: () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        onComplete();
      },
    });
  };

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    sound.click(650, 0.03);
    handleExit();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F3EFE3] text-canvas select-none cursor-pointer overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(#262A34 0.75px, transparent 0.75px),
          radial-gradient(#8D937B 0.6px, transparent 0.6px)
        `,
        backgroundSize: '20px 20px, 32px 32px',
        backgroundPosition: '0 0, 10px 10px',
      }}
      title="Click or press Space to skip directly to hero"
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

      {/* Centerpiece: iPhone-Style Handwritten "CIPHER" Calligraphy Vector */}
      <div className="relative w-full max-w-2xl px-6 flex flex-col items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 700 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          {/* 
            Stroke 0: Letter C (Single continuous flowing stroke)
            Initial inline style: strokeDasharray & strokeDashoffset to prevent flash of content
          */}
          <path
            ref={(el) => (strokeRefs.current[0] = el)}
            style={{ strokeDasharray: 600, strokeDashoffset: 600, opacity: 0 }}
            d="M 115 50 C 95 38 70 42 55 58 C 35 78 30 115 48 140 C 65 158 98 158 122 144 C 135 136 142 125 146 116"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stroke 1: Letter I stem */}
          <path
            ref={(el) => (strokeRefs.current[1] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 185 72 C 185 95 183 125 183 146 C 183 152 188 154 195 148"
            stroke="#FF4FA3"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Letter I Dot: Pops in dynamically with scale bounce */}
          <circle
            ref={dotRef}
            cx="185"
            cy="46"
            r="6.5"
            fill="#C6FF3D"
            stroke="#0A0E17"
            strokeWidth="2.5"
            style={{ opacity: 0, transformOrigin: '185px 46px' }}
          />

          {/* Stroke 2: Letter P - Downward stem */}
          <path
            ref={(el) => (strokeRefs.current[2] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 235 70 L 235 170"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Stroke 3: Letter P - Loop / Bowl */}
          <path
            ref={(el) => (strokeRefs.current[3] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 235 74 C 260 62 295 65 296 94 C 298 118 268 124 235 122"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stroke 4: Letter H - Left vertical stem */}
          <path
            ref={(el) => (strokeRefs.current[4] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 345 52 L 345 148"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Stroke 5: Letter H - Arch and right stem */}
          <path
            ref={(el) => (strokeRefs.current[5] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 345 98 C 368 85 394 86 400 105 L 400 148"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stroke 6: Letter E - Loop */}
          <path
            ref={(el) => (strokeRefs.current[6] = el)}
            style={{ strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 }}
            d="M 440 115 C 460 115 486 112 486 94 C 486 75 462 75 448 94 C 434 112 438 138 458 148 C 474 154 488 148 496 138"
            stroke="#FF4FA3"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stroke 7: Letter R - Vertical stem */}
          <path
            ref={(el) => (strokeRefs.current[7] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 535 72 L 535 148"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Stroke 8: Letter R - Bowl */}
          <path
            ref={(el) => (strokeRefs.current[8] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 535 78 C 558 65 590 66 592 92 C 594 114 566 120 536 120"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stroke 9: Letter R - Kick-out Leg */}
          <path
            ref={(el) => (strokeRefs.current[9] = el)}
            style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 }}
            d="M 562 120 L 592 148 C 600 152 610 148 616 142"
            stroke="#0A0E17"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Flourish: Dynamic Marker Wavy Underline */}
          <path
            ref={underlineRef}
            style={{ strokeDasharray: 800, strokeDashoffset: 800, opacity: 0 }}
            d="M 30 172 C 140 162 250 184 360 170 C 470 158 580 180 655 166"
            stroke="#C6FF3D"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Whimsical Ink Starburst / Sparkle at the End */}
          <path
            ref={starRef}
            style={{ opacity: 0, transformOrigin: '668px 166px' }}
            d="M 662 166 L 668 152 L 674 166 L 688 172 L 674 178 L 668 192 L 662 178 L 648 172 Z"
            fill="#FF4FA3"
            stroke="#0A0E17"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Subtitle Annotation in Caveat cursive */}
        <div className="loader-subtitle flex flex-col items-center gap-1 mt-5 opacity-0">
          <p
            className="text-2xl sm:text-3xl text-canvas font-marker font-bold tracking-wide"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            "We don't just study technology. We architect the future." ⚡
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-canvas/50">
            [Click anywhere or press Space to enter]
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
