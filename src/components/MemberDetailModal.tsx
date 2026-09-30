import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Operative } from '../data/council';
import { OperativeDoodle } from './OperativeDoodle';
import { sound } from '../utils/sound';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface MemberDetailModalProps {
  member: Operative | null;
  allMembers: Operative[];
  onClose: () => void;
  onSelectMember: (member: Operative) => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  member,
  allMembers,
  onClose,
  onSelectMember,
}) => {
  useEffect(() => {
    if (!member) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.click(400, 0.02);
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allMembers.findIndex((m) => m.id === member.id);
        if (currentIndex > 0) {
          sound.click(550, 0.02);
          onSelectMember(allMembers[currentIndex - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allMembers.findIndex((m) => m.id === member.id);
        if (currentIndex < allMembers.length - 1) {
          sound.click(650, 0.02);
          onSelectMember(allMembers[currentIndex + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [member, allMembers, onClose, onSelectMember]);

  if (!member) return null;

  const currentIndex = allMembers.findIndex((m) => m.id === member.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allMembers.length - 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPrev) {
      sound.click(550, 0.02);
      onSelectMember(allMembers[currentIndex - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) {
      sound.click(650, 0.02);
      onSelectMember(allMembers[currentIndex + 1]);
    }
  };

  return createPortal(
    <div
      onClick={() => {
        sound.click(400, 0.02);
        onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-canvas/85 backdrop-blur-sm animate-fadeIn cursor-pointer"
    >
      {/* Modal Dialog Container / Bottom Sheet on Mobile */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[88vh] overflow-y-auto bg-paper text-canvas border-2 border-canvas shadow-hard-lg p-5 sm:p-7 flex flex-col gap-3.5 cursor-default select-none animate-scaleIn sm:rotate-[-0.5deg] rounded-t-lg sm:rounded-none"
        style={{
          paddingBottom: 'max(18px, env(safe-area-inset-bottom, 18px))',
        }}
      >
        {/* Mobile Pull Grab Handle */}
        <div className="w-10 h-1 bg-canvas/30 rounded-full mx-auto sm:hidden -mt-1 mb-0.5"></div>

        {/* Top Washi Tape (Desktop) */}
        <div className="hidden sm:block washi-tape washi-tape-yellow tape-torn-h -top-3 left-1/2 -translate-x-1/2 w-32 rotate-1"></div>

        {/* Close Button Top Right */}
        <button
          onClick={() => {
            sound.click(400, 0.02);
            onClose();
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white border border-canvas hover:bg-pink hover:text-white transition-colors cursor-pointer shadow-hard-sm"
          title="Close [ESC]"
          aria-label="Close dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Bar */}
        <div className="flex items-center justify-between pb-2.5 border-b-2 border-dashed border-canvas/20 pr-10 sm:pr-0">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-canvas"
              style={{ backgroundColor: member.pinColor }}
            ></span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-canvas">
              COUNCIL DOSSIER • {member.code}
            </span>
          </div>

          {member.badge && (
            <span
              className="font-mono text-[10px] font-bold px-2 py-0.5 border border-canvas shadow-sm uppercase shrink-0"
              style={{ backgroundColor: member.badgeColor || '#FFD84D' }}
            >
              ★ {member.badge} ★
            </span>
          )}
        </div>

        {/* Polaroid Picture Frame with Custom Character Doodle */}
        <div className="relative w-full aspect-square max-h-[260px] sm:max-h-none bg-[#FBF8EF] border-2 border-canvas p-3 sm:p-4 flex flex-col items-center justify-center shadow-inner overflow-hidden">
          {/* Dot Grid Paper Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#262A34 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Status Tag */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 font-mono text-[10px] bg-white text-canvas border border-canvas px-2 py-0.5 font-bold shadow-hard-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>
            <span>{member.status}</span>
          </div>

          <div className="w-36 h-36 sm:w-48 sm:h-48 relative flex items-center justify-center">
            <OperativeDoodle id={member.id} className="w-full h-full" />
          </div>
        </div>

        {/* Member Details */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-canvas tracking-tight">
              {member.name}
            </h3>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-pink uppercase px-2 py-0.5 bg-pink/10 border border-pink/30 shrink-0">
              {member.role}
            </span>
          </div>

          <div className="pt-1.5 border-t border-dashed border-canvas/20">
            <p
              className="text-xl sm:text-2xl text-canvas font-marker leading-snug"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              {member.quote}
            </p>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-2.5 border-t border-dashed border-canvas/20 flex items-center justify-between font-mono text-xs text-canvas/70">
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            className={`flex items-center justify-center gap-1 px-3 py-2 min-h-[44px] border border-canvas bg-white shadow-sm transition-all ${
              hasPrev ? 'hover:bg-lime cursor-pointer' : 'opacity-40 cursor-not-allowed'
            }`}
            aria-label="Previous council frame"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-bold">PREV [←]</span>
          </button>

          <span className="font-bold text-canvas text-[11px] sm:text-xs">
            FRAME {currentIndex + 1} OF {allMembers.length}
          </span>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`flex items-center justify-center gap-1 px-3 py-2 min-h-[44px] border border-canvas bg-white shadow-sm transition-all ${
              hasNext ? 'hover:bg-lime cursor-pointer' : 'opacity-40 cursor-not-allowed'
            }`}
            aria-label="Next council frame"
          >
            <span className="font-bold">NEXT [→]</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
