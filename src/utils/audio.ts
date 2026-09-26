/**
 * Web Audio API synthesizer for realistic mechanical sound effects:
 * - Page flip sound (fluttering paper)
 * - Polaroid camera shutter click
 * - Cute sparkle chime
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(enabled?: boolean) {
    if (enabled !== undefined) {
      this.soundEnabled = enabled;
    } else {
      this.soundEnabled = !this.soundEnabled;
    }
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // Realistic paper flutter / page flip
  public playPageFlip() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // White noise burst for paper friction
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.15);
      filter.Q.value = 1.2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.17);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    } catch {
      // Ignore audio failure
    }
  }

  // Camera shutter click
  public playCameraShutter() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // First quick click
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1400, now);
      osc1.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      // Second shutter slap
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(600, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.16);
      gain2.gain.setValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.17);
    } catch {
      // Ignore
    }
  }

  // Cheerful chime / sparkle when memory is posted
  public playSparkle() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = now + i * 0.07;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    } catch {
      // Ignore
    }
  }

  // Cute pop sound for opening gifts
  public playPop() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore
    }
  }

  // Celebratory birthday fanfare
  public playFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = now + i * 0.08;
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.46);
      });
    } catch {
      // Ignore
    }
  }

  // Music Box Melody for Vinyl Record
  private musicBoxTimer: number | null = null;
  public startMusicBox(onStop?: () => void): () => void {
    if (!this.soundEnabled) return () => {};
    this.stopMusicBox();
    this.initContext();
    if (!this.ctx) return () => {};

    // Sweet nostalgic music box notes (melody: gentle romantic music box)
    const melody = [
      { note: 523.25, d: 0.4 }, // C5
      { note: 659.25, d: 0.4 }, // E5
      { note: 783.99, d: 0.5 }, // G5
      { note: 1046.5, d: 0.6 }, // C6
      { note: 987.77, d: 0.4 }, // B5
      { note: 783.99, d: 0.4 }, // G5
      { note: 880.00, d: 0.5 }, // A5
      { note: 659.25, d: 0.6 }, // E5
      { note: 698.46, d: 0.4 }, // F5
      { note: 783.99, d: 0.4 }, // G5
      { note: 659.25, d: 0.5 }, // E5
      { note: 523.25, d: 0.8 }, // C5
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.ctx || !this.soundEnabled) return;
      const current = melody[noteIdx % melody.length];
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Chime bell timbre: sine + harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(current.note, now);
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + current.d * 1.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + current.d * 1.6);
      
      noteIdx++;
      this.musicBoxTimer = window.setTimeout(playNextNote, current.d * 1000);
    };

    playNextNote();

    return () => {
      this.stopMusicBox();
      onStop?.();
    };
  }

  public stopMusicBox() {
    if (this.musicBoxTimer !== null) {
      clearTimeout(this.musicBoxTimer);
      this.musicBoxTimer = null;
    }
  }
}

export const sfx = new SoundEffects();
