class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public click(freq = 600, duration = 0.02) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  public thud() {
    this.click(180, 0.04);
  }

  public beep() {
    this.click(820, 0.03);
  }

  public toggle(): boolean {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) this.beep();
    return this.enabled;
  }
}

export const sound = new SoundEngine();
