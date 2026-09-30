import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Clock } from 'lucide-react';
import { sound } from '../utils/sound';

interface TrendingNewsTickerProps {
  onReplaySketch?: () => void;
  sfxActive: boolean;
  onToggleSfx: () => void;
  currentTime: string;
}

const NOTICE_ITEMS = [
  {
    id: 'velora-sub',
    tag: 'DEADLINE',
    tagColor: '#FF4FA3',
    text: 'VELORA 1.0: Round 1 PPT & Idea Submissions close 5 April 2026, 23:59 IST',
    actionText: 'SUBMIT IDEA ↗',
    target: '#velora',
  },
  {
    id: 'velora-teams',
    tag: 'TRENDING',
    tagColor: '#C6FF3D',
    text: '250+ Teams Registered across 7 Deep-Tech Tracks • ₹1,00,000+ Prize Pool',
    actionText: 'VIEW TRACKS ↗',
    target: '#velora',
  },
  {
    id: 'ieee-collab',
    tag: 'PARTNERSHIP',
    tagColor: '#FFD84D',
    text: 'National 24-Hour Hackathon powered by CIPHER x IEEE Student Branch',
    actionText: 'READ DETAILS ↗',
    target: '#velora',
  },
  {
    id: 'council-roster',
    tag: 'COUNCIL',
    tagColor: '#60A5FA',
    text: 'Meet the 9 Executive Council Leads architecting campus technical culture',
    actionText: 'VIEW ROSTER ↗',
    target: '#council',
  },
  {
    id: 'campus-lab',
    tag: 'DISPATCH',
    tagColor: '#34D399',
    text: 'MITAOE Dept of Information Technology • Alandi, Pune — Lab 304 Dev Sprint',
    actionText: 'ABOUT CIPHER ↗',
    target: '#about',
  },
];

export const TrendingNewsTicker: React.FC<TrendingNewsTickerProps> = ({
  onReplaySketch,
  sfxActive,
  onToggleSfx,
  currentTime,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleNoticeClick = (target: string) => {
    sound.click(750, 0.03);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative w-full bg-[#0D1117] text-white border-b border-[#21262D] font-mono text-[11px] overflow-hidden select-none z-50 flex items-center h-8 sm:h-7.5"
      role="region"
      aria-label="Trending news and notices ticker"
    >
      {/* Left Static Badge */}
      <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 h-full bg-[#161B22] border-r border-[#30363D] z-10 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
        </span>
        <span className="font-bold text-lime tracking-wider flex items-center gap-1 text-[10px] sm:text-[11px]">
          <Flame className="w-3 h-3 text-pink hidden xs:inline-block" />
          <span>TRENDING</span>
          <span className="hidden sm:inline">NOTICE</span>
        </span>
      </div>

      {/* Marquee Gliding Track */}
      <div
        className="relative flex-1 overflow-hidden h-full flex items-center cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        title="Tap or hover to pause news ticker"
      >
        <div
          className={`flex items-center gap-8 whitespace-nowrap will-change-transform ${
            isPaused ? 'animate-marquee-paused' : 'animate-marquee-slow'
          }`}
          style={{
            animation: isPaused
              ? 'none'
              : 'marqueeTicker 38s linear infinite',
          }}
        >
          {/* Render two identical sets for seamless continuous looping */}
          {[...NOTICE_ITEMS, ...NOTICE_ITEMS].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleNoticeClick(item.target)}
              className="inline-flex items-center gap-2 group hover:text-lime transition-colors"
            >
              <span
                className="font-bold text-[9px] px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider text-canvas"
                style={{ backgroundColor: item.tagColor }}
              >
                {item.tag}
              </span>
              <span className="text-[#C9D1D9] text-[11px] group-hover:text-white transition-colors">
                {item.text}
              </span>
              <span className="text-lime text-[10px] underline underline-offset-2 opacity-75 group-hover:opacity-100 font-bold">
                {item.actionText}
              </span>
              <span className="text-[#30363D] mx-2">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Action & Clock Controls */}
      <div className="shrink-0 flex items-center gap-2 px-2 sm:px-3 h-full bg-[#161B22] border-l border-[#30363D] z-10 text-[10px] sm:text-[11px]">
        {/* Live IST Clock (Visible on md+) */}
        <div className="hidden md:flex items-center gap-1 text-ash/80 pr-2 border-r border-[#30363D]">
          <Clock className="w-3 h-3 text-[#FFD84D]" />
          <span>PUNE [IST]:</span>
          <span className="text-white font-bold">{currentTime || '--:--:--'}</span>
        </div>

        {/* Replay Intro Button */}
        {onReplaySketch && (
          <button
            onClick={() => {
              sound.click(600, 0.02);
              onReplaySketch();
            }}
            className="text-[#FFD84D] hover:text-white transition-colors cursor-pointer font-bold flex items-center gap-1 px-1.5 py-0.5 border border-transparent hover:border-[#30363D] rounded-sm min-h-[32px] sm:min-h-0"
            title="Replay handwritten calligraphy intro"
          >
            <Sparkles className="w-3 h-3 text-[#FFD84D]" />
            <span className="hidden sm:inline">REPLAY</span>
          </button>
        )}

        {/* SFX Audio Toggle Button */}
        <button
          onClick={onToggleSfx}
          className="flex items-center gap-1 text-ash hover:text-lime transition-colors cursor-pointer px-1.5 py-0.5 border border-transparent hover:border-[#30363D] rounded-sm min-h-[32px] sm:min-h-0"
          title="Toggle tactile mechanical audio feedback"
          aria-label="Toggle sound effects"
        >
          {sfxActive ? (
            <Volume2 className="w-3.5 h-3.5 text-lime" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-ash" />
          )}
          <span className={`hidden sm:inline ${sfxActive ? 'text-lime font-bold' : ''}`}>
            [SFX: {sfxActive ? 'ON' : 'OFF'}]
          </span>
        </button>
      </div>
    </div>
  );
};
