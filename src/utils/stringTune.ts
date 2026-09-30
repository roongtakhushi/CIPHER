import { useEffect } from 'react';
import {
  StringTune,
  StringMagnetic,
  StringTilt,
  StringSpotlight,
  StringMarquee,
} from '@fiddle-digital/string-tune';

let initialized = false;

export const initStringTune = () => {
  if (typeof window === 'undefined' || initialized) return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  try {
    const stringTune = StringTune.getInstance();
    // CRITICAL: Disable StringTune scroll interception so Lenis has 100% smooth control
    stringTune.scrollDesktopMode = 'disable';
    stringTune.scrollMobileMode = 'disable';

    stringTune.use(StringMagnetic);
    stringTune.use(StringTilt);
    stringTune.use(StringSpotlight);
    stringTune.use(StringMarquee);
    stringTune.start(60);
    initialized = true;
    console.log('[StringTune] Modules active: Magnetic, Tilt, Spotlight, Marquee (Scroll interception disabled for Lenis smoothness).');
  } catch (err) {
    console.warn('[StringTune] Initialization error:', err);
  }
};

export const useStringTune = () => {
  useEffect(() => {
    initStringTune();
  }, []);
};
