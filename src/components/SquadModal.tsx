import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { X, CheckCircle, AlertCircle, Loader2, ExternalLink, ArrowRight } from 'lucide-react';
import { VELORA_HACKATHON_INFO } from '../data/events';

interface SquadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SquadModal: React.FC<SquadModalProps> = ({ isOpen, onClose }) => {
  const [squadName, setSquadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [teamSize, setTeamSize] = useState('4');
  const [track, setTrack] = useState('Agentic AI / AI-ML');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!squadName.trim() || !leadEmail.trim()) {
      setError('Please provide your squad name and contact email.');
      sound.beep();
      return;
    }
    setError('');
    setSubmitting(true);
    sound.click(700, 0.04);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      sound.beep();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C6FF3D', '#FF4FA3', '#FFD84D', '#F3EFE3'],
        });
      } catch (err) {}
    }, 700);
  };

  const handleReset = () => {
    setSuccess(false);
    setSquadName('');
    setLeadEmail('');
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-canvas/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Window Container */}
      <div
        className="relative w-full max-w-lg bg-surface-dark border-2 border-lime shadow-hard-lg overflow-hidden rounded-t-lg sm:rounded-none max-h-[88vh] overflow-y-auto"
        style={{
          paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
        }}
      >
        {/* Mobile Pull Grab Handle */}
        <div className="w-10 h-1 bg-border-subtle rounded-full mx-auto sm:hidden mt-2 mb-0"></div>

        {/* Top Header Bar */}
        <div className="bg-[#181B25] px-5 py-3 border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-lime"></span>
            <span className="font-mono text-xs text-white font-bold tracking-wider">
              VELORA 1.0 • SQUAD REGISTRATION
            </span>
          </div>
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="text-ash hover:text-white transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
            aria-label="Close registration modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unstop Banner Callout */}
        <div className="bg-[#121826] px-5 py-2.5 border-b border-border-subtle flex items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#FFD84D] font-bold">OFFICIAL PORTAL:</span>
          <a
            href={VELORA_HACKATHON_INFO.unstopUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="text-white hover:text-lime underline flex items-center gap-1 font-bold min-h-[36px]"
          >
            <span>Register on Unstop</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 md:p-8">
          {success ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 bg-lime/20 border-2 border-lime flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-lime" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                SQUAD RSVP RECORDED!
              </h3>
              <p className="font-body text-sm text-[#DFE2EF]/80 max-w-sm">
                Squad <strong>{squadName}</strong> ({teamSize} members) has been logged for <strong>{track}</strong>.
              </p>
              <div className="bg-[#181B25] border border-border-subtle p-3 w-full font-mono text-xs text-ash text-left flex flex-col gap-1">
                <div>✦ STAGE 1 DEADLINE: 5 April 2026, 11:59 PM (PPT + 5-6 min video)</div>
                <div>✦ GRAND FINALE: 11 April 2026 (24hr In-Person Hackathon)</div>
                <div>✦ LOCATION: MITAOE Campus, Alandi, Pune</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                <a
                  href={VELORA_HACKATHON_INFO.unstopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="btn-terminal-primary w-full sm:flex-1 text-center min-h-[48px] flex items-center justify-center"
                >
                  COMPLETE ON UNSTOP ↗
                </a>
                <button
                  onClick={handleReset}
                  className="btn-ghost-action w-full sm:w-auto cursor-pointer min-h-[48px] flex items-center justify-center"
                >
                  CLOSE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  VELORA 1.0 — DARE TO COMPETE
                </h3>
                <p className="font-body text-xs text-ash">
                  A 24-hour national-level hackathon powered by CIPHER x IEEE. Team Size: 2–5 members.
                </p>
              </div>

              {error && (
                <div className="bg-[#93000A]/30 border border-[#FF334B] p-3 flex items-center gap-2 text-xs font-mono text-[#FFB4AB]">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#FF334B]" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs font-bold text-white uppercase">
                  Squad / Team Name
                </label>
                <input
                  type="text"
                  inputMode="text"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  placeholder="e.g. CyberKnights, NeuralForge"
                  className="bg-canvas border border-border-subtle p-3 font-mono text-base text-white outline-none focus:border-lime min-h-[44px]"
                  disabled={submitting}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-xs font-bold text-white uppercase">
                    Lead Contact Email
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="leader@college.edu"
                    className="bg-canvas border border-border-subtle p-3 font-mono text-base text-white outline-none focus:border-lime min-h-[44px]"
                    disabled={submitting}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-mono text-xs font-bold text-white uppercase">
                    Team Size (2–5)
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="bg-canvas border border-border-subtle p-3 font-mono text-base text-white outline-none focus:border-lime min-h-[44px]"
                    disabled={submitting}
                  >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members</option>
                    <option value="5">5 Members</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs font-bold text-white uppercase">
                  Target Track (7 Official Tracks)
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="bg-canvas border border-border-subtle p-3 font-mono text-base text-white outline-none focus:border-lime min-h-[44px]"
                  disabled={submitting}
                >
                  {VELORA_HACKATHON_INFO.tracks.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name} — {t.desc.slice(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-terminal-primary w-full justify-center min-h-[48px] flex items-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>LOGGING SQUAD...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM SQUAD RSVP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center font-mono text-[11px] text-ash">
                  <span>Official registrations also open on </span>
                  <a
                    href={VELORA_HACKATHON_INFO.unstopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime underline font-bold"
                  >
                    Unstop Listing
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
