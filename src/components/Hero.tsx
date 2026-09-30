import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Trophy,
  Rocket,
  Terminal,
  Coffee,
  Code2,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface HeroProps {
  onExploreVelora: () => void;
  onMeetCouncil: () => void;
}

const BULLETINS = [
  { tag: 'FLAGSHIP HACKATHON', text: 'VELORA 1.0: Dare to Compete 24-hr Hackathon powered by CIPHER x IEEE', color: '#C6FF3D' },
  { tag: 'ROUND 1 DEADLINE', text: '5 April 2026, 11:59 PM — Submit PPT + 5-6 min idea presentation', color: '#FF4FA3' },
  { tag: 'ROUND 2 FINALE', text: '11 April 2026 — Shortlisted squads sprint live in 24hr in-person finale', color: '#FFD84D' },
];

const COFFEE_MSGS = [
  'Caffeine Level: 98% (Ready to deploy)',
  'Compiling at 3:14 AM without errors...',
  'Bug found. Bug squashed. Coffee drank.',
  'Merge conflict solved in vim.',
  'Prod is running smoothly!',
];

export const Hero: React.FC<HeroProps> = ({ onExploreVelora, onMeetCouncil }) => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const highlightLoopRef = useRef<SVGPathElement>(null);

  const [coffeeSips, setCoffeeSips] = useState(4);
  const [bulletinIndex, setBulletinIndex] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Fast, crisp parallel entrance reveal so cards are visible immediately
    anime({
      targets: ['.hero-badge-tag', '.hero-title-line', '.hero-body-text', '.hero-action-group', '.hero-doodle-card', '.hero-stat-card'],
      opacity: [0, 1],
      translateY: [12, 0],
      delay: anime.stagger(50, { start: 30 }),
      duration: 400,
      easing: 'easeOutCubic',
    });

    if (underlineRef.current) {
      anime({
        targets: underlineRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        duration: 450,
        delay: 150,
      });
    }

    if (highlightLoopRef.current) {
      anime({
        targets: highlightLoopRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutSine',
        duration: 450,
        delay: 200,
      });
    }
  }, []);

  const handleCoffeeClick = (e: React.MouseEvent) => {
    sound.beep();
    setCoffeeSips((prev) => prev + 1);

    // Artsy mini confetti burst from the coffee mug
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 45,
      origin: { x, y },
      colors: ['#FFD84D', '#FF4FA3', '#C6FF3D', '#FFFFFF'],
      disableForReducedMotion: true,
      scalar: 0.8,
    });
  };

  const handleNextBulletin = () => {
    sound.click(500, 0.03);
    setBulletinIndex((prev) => (prev + 1) % BULLETINS.length);
  };

  const activeBulletin = BULLETINS[bulletinIndex];
  const coffeeMessage = COFFEE_MSGS[(coffeeSips - 4) % COFFEE_MSGS.length] || COFFEE_MSGS[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-canvas overflow-hidden pt-10 md:pt-16 pb-20 md:pb-28 px-4 md:px-8 flex flex-col justify-center min-h-[920px] border-b border-border-subtle"
      id="hero"
    >
      {/* Blueprint Dot Grid Background Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#1F293D 1.25px, transparent 1.25px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Hand-Drawn Notebook Margin Doodle Elements */}
      <div className="absolute top-12 right-12 hidden 2xl:flex flex-col items-end pointer-events-none select-none opacity-60">
        <span
          className="text-xl text-yellow-tape font-marker font-bold rotate-6"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          scroll to fold plane ✈️
        </span>
        <svg className="w-16 h-16 text-yellow-tape" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 12C24 16 44 26 48 46" strokeLinecap="round" />
          <path d="M38 46L48 46L48 36" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto w-full flex flex-col gap-8">
        
        {/* Department Eyebrow Tag & Authentic IT Council Status Badges */}
        <div className="flex items-center gap-3 flex-wrap hero-badge-tag">
          {/* Main Department Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-card border-2 border-border-subtle px-3 py-1.5 shadow-hard-sm">
            <span className="inline-block w-2.5 h-2.5 bg-lime animate-pulse"></span>
            <span className="font-mono text-xs uppercase text-white tracking-wider font-bold">
              ⚡ MITAOE DEPT OF INFORMATION TECHNOLOGY
            </span>
          </div>

          {/* Student Council Est Tag */}
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-pink bg-surface-dark border border-pink/30 px-3 py-1.5 shadow-hard-sm">
            <Code2 className="w-3.5 h-3.5 text-pink" />
            <span>IT STUDENTS' EXECUTIVE COUNCIL • EST. 2018</span>
          </span>

          {/* Location Tag */}
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-lime bg-surface-dark px-2.5 py-1 border border-lime/30">
            <Sparkles className="w-3 h-3 text-lime" />
            <span>ALANDI, PUNE</span>
          </span>
        </div>

        {/* Giant Headline with Artsy Hand-Drawn Loop & Wavy Underline */}
        <div className="flex flex-col gap-4 max-w-5xl">
          <h1
            ref={headlineRef}
            className="font-display font-bold uppercase tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]"
          >
            <div className="hero-title-line flex items-center gap-3 flex-wrap">
              <span className="relative inline-block">
                BUILD.
                {/* Hand-drawn Highlighter Loop around BUILD */}
                <svg
                  className="absolute -top-2 -left-3 w-[120%] h-[125%] overflow-visible pointer-events-none"
                  viewBox="0 0 220 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    ref={highlightLoopRef}
                    d="M14 45C10 20 50 8 110 8C175 8 208 22 208 45C208 68 165 82 105 82C40 82 8 68 12 45C14 30 42 16 95 14"
                    stroke="#FFD84D"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                </svg>
              </span>
              <span>BREAK.</span>
            </div>

            <div className="hero-title-line flex items-center gap-3 flex-wrap">
              <span>SHIP AT 3AM.</span>
              {/* Handwritten Marker Annotation */}
              <span
                className="hidden md:inline-block text-xl lg:text-2xl text-pink font-marker font-bold lowercase tracking-normal -rotate-3 select-none"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                *on prod, obviously ⚡
              </span>
            </div>

            <div className="hero-title-line">
              <span className="text-lime relative inline-block">
                NEVER SETTLE.
                {/* Hand-drawn Wavy Underline SVG */}
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4 overflow-visible pointer-events-none"
                  viewBox="0 0 280 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    ref={underlineRef}
                    d="M3 10C35 4 65 14 95 8C125 2 155 13 185 7C215 2 245 12 277 8"
                    stroke="#FF4FA3"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </h1>

          {/* Official Tagline Quote Banner */}
          <div className="pt-2">
            <span
              className="inline-block bg-[#FFD84D] text-[#0A0E17] font-bold px-3 py-1 text-lg sm:text-xl font-marker rotate-[-0.5deg] shadow-hard-sm"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              "We don't just study technology. We architect the future."
            </span>
          </div>

          <p className="hero-body-text font-body text-base sm:text-lg md:text-xl text-[#DFE2EF]/90 max-w-3xl pt-2 leading-relaxed">
            <strong className="text-white font-semibold">CIPHER</strong> is the premier IT Students' Executive Council of MIT Academy of Engineering (MITAOE), Alandi, Pune. As an elite technical collective, it unites visionary developers, security researchers, and creative problem solvers under a shared mission: to architect the next generation of digital infrastructure.
          </p>
        </div>

        {/* Action Buttons & Hand-Drawn Marker Arrow Callout */}
        <div className="hero-action-group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
          {/* Primary Action Button */}
          <button
            onClick={() => {
              sound.click(800, 0.04);
              onExploreVelora();
            }}
            string="magnetic"
            className="btn-terminal-primary"
          >
            <span>EXPLORE VELORA 1.0 HACKATHON</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={() => {
              sound.click(550, 0.03);
              onMeetCouncil();
            }}
            string="magnetic"
            className="btn-ghost-action"
          >
            MEET THE COUNCIL
          </button>

          {/* Marker Callout Doodle pointing to Hackathon */}
          <div className="hidden xl:flex items-center gap-2 rotate-[-2deg] translate-x-4 select-none">
            <span
              className="text-2xl text-yellow-tape font-marker font-bold tracking-wide"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              250+ registrations completed! 🔥
            </span>
            <svg
              className="w-10 h-10 text-yellow-tape"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14C14 26 28 34 42 22" />
              <path d="M34 18L43 21L39 30" />
            </svg>
          </div>
        </div>

        {/* Artsy Engineering Board: Interactive Sticky Notes & Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl pt-4">
          
          {/* Interactive Coffee Fuel Mug Doodle Note (Span 5 cols) */}
          <div
            string="tilt"
            onClick={handleCoffeeClick}
            className="hero-doodle-card md:col-span-5 bg-paper text-canvas border-2 border-canvas p-4 sm:p-5 shadow-hard-md rotate-[-1deg] hover:rotate-0 transition-transform cursor-pointer relative overflow-hidden select-none group"
            title="Click to sip coffee and boost engineering fuel!"
          >
            {/* Top Washi Tape Corner */}
            <div className="washi-tape washi-tape-yellow tape-torn-h -top-3 left-6 w-24 -rotate-2"></div>

            <div className="flex items-center justify-between pb-2 border-b border-canvas/20">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#640038]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
                  ENGINEERING FUEL STATION
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-pink bg-pink/10 px-2 py-0.5 border border-pink/30">
                CLICK TO SIP ☕
              </span>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-2xl font-bold text-canvas">
                  {coffeeSips} CUPS BREWED
                </span>
                <span className="font-mono text-xs text-canvas/70">
                  {coffeeMessage}
                </span>
              </div>

              {/* Hand-drawn Animated Coffee Cup SVG */}
              <div className="w-12 h-12 relative flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-canvas">
                  {/* Steam curls */}
                  <path d="M16 6C16 10 18 10 18 14" stroke="#FF4FA3" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                  <path d="M24 4C24 9 26 9 26 14" stroke="#C6FF3D" strokeWidth="2" strokeLinecap="round" className="animate-pulse delay-150" />
                  <path d="M32 6C32 10 34 10 34 14" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" className="animate-pulse delay-300" />
                  {/* Mug body */}
                  <path d="M10 16H36V34C36 38 32 42 28 42H18C14 42 10 38 10 34V16Z" fill="#F3EFE3" stroke="#0A0E17" strokeWidth="2.5" />
                  {/* Mug handle */}
                  <path d="M36 20H40C42 20 44 22 44 24V28C44 30 42 32 40 32H36" stroke="#0A0E17" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Interactive Lab Bulletin Sticky Note (Span 7 cols) */}
          <div
            string="tilt"
            onClick={handleNextBulletin}
            className="hero-doodle-card md:col-span-7 bg-surface-dark border-2 border-border-subtle p-4 sm:p-5 shadow-hard-md rotate-[0.5deg] hover:rotate-0 transition-transform cursor-pointer relative overflow-hidden group"
            title="Click to cycle next council bulletin"
          >
            {/* Top Washi Tape Corner */}
            <div className="washi-tape washi-tape-lime tape-torn-h -top-3 right-8 w-28 rotate-1"></div>

            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-lime" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  COUNCIL DISPATCH BOARD
                </span>
              </div>
              <span className="font-mono text-[11px] text-ash group-hover:text-lime transition-colors">
                [TAB {bulletinIndex + 1}/3 • CLICK TO CYCLE]
              </span>
            </div>

            <div className="pt-3 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] font-bold px-2 py-0.5 border"
                  style={{
                    color: activeBulletin.color,
                    borderColor: `${activeBulletin.color}40`,
                    backgroundColor: `${activeBulletin.color}15`,
                  }}
                >
                  {activeBulletin.tag}
                </span>
                <span className="font-mono text-xs text-ash">MITAOE IT Council</span>
              </div>
              <p className="font-mono text-sm sm:text-base text-white font-medium pt-0.5">
                {activeBulletin.text}
              </p>
            </div>
          </div>

        </div>

        {/* 4 Official Site Stats: Dedicated Domains, Expert Mentors, Members Strong, Registrations for 1st Event */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl pt-2">
          
          {/* Stat 1: Dedicated Domains */}
          <div
            string="tilt"
            className="hero-stat-card bg-surface-dark border border-border-subtle p-4 sm:p-5 flex flex-col gap-1.5 shadow-hard-md hover:border-lime/60 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ash font-bold uppercase tracking-wider">DOMAINS</span>
              <Compass className="w-4 h-4 text-lime" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-lime transition-colors">
              7 DEDICATED
            </span>
            <span className="font-mono text-[11px] text-lime font-medium uppercase">CYBER • AI • WEB3 • FINTECH</span>
          </div>

          {/* Stat 2: Expert Mentors */}
          <div
            string="tilt"
            className="hero-stat-card bg-surface-dark border border-border-subtle p-4 sm:p-5 flex flex-col gap-1.5 shadow-hard-md hover:border-pink/60 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ash font-bold uppercase tracking-wider">GUIDANCE</span>
              <Trophy className="w-4 h-4 text-pink" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-bold text-pink group-hover:text-white transition-colors">
              15+ EXPERT
            </span>
            <span className="font-mono text-[11px] text-[#FFD9E4] font-medium uppercase">INDUSTRY &amp; FACULTY MENTORS</span>
          </div>

          {/* Stat 3: Members Strong */}
          <div
            string="tilt"
            className="hero-stat-card bg-surface-dark border border-border-subtle p-4 sm:p-5 flex flex-col gap-1.5 shadow-hard-md hover:border-yellow-tape/60 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ash font-bold uppercase tracking-wider">COLLECTIVE</span>
              <Users className="w-4 h-4 text-yellow-tape" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#FFE07E] group-hover:text-white transition-colors">
              120+ STRONG
            </span>
            <span className="font-mono text-[11px] text-[#E9C339] font-medium uppercase">PASSIONATE IT STUDENTS</span>
          </div>

          {/* Stat 4: Registrations for 1st Event */}
          <div
            string="tilt"
            className="hero-stat-card bg-surface-dark border border-border-subtle p-4 sm:p-5 flex flex-col gap-1.5 shadow-hard-md hover:border-lime/60 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-ash font-bold uppercase tracking-wider">1ST EVENT</span>
              <Rocket className="w-4 h-4 text-lime" />
            </div>
            <span className="font-display text-2xl sm:text-3xl font-bold text-lime group-hover:text-white transition-colors">
              250+ TEAMS
            </span>
            <span className="font-mono text-[11px] text-[#DFE2EF] font-medium uppercase">REGISTERED FOR VELORA 1.0</span>
          </div>

        </div>

      </div>
    </section>
  );
};
