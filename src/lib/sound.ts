// Lightweight synthesized audio — no external files needed.
// A soft temple-bell chime for the curtain opening, and an ambient
// instrumental drone that can be toggled on/off for background music.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function playBellChime() {
  const audio = getCtx();
  const now = audio.currentTime;
  const strikes = [0, 0.55, 1.05];
  const freqs = [880, 1320, 1760];

  strikes.forEach((delay, i) => {
    const start = now + delay;
    const master = audio.createGain();
    master.gain.setValueAtTime(0, start);
    master.gain.linearRampToValueAtTime(0.22 / (i + 1), start + 0.02);
    master.gain.exponentialRampToValueAtTime(0.0001, start + 2.4);
    master.connect(audio.destination);

    freqs.forEach((f, idx) => {
      const osc = audio.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f * (1 + idx * 0.003), start);
      const g = audio.createGain();
      g.gain.setValueAtTime(1 / (idx + 1), start);
      osc.connect(g).connect(master);
      osc.start(start);
      osc.stop(start + 2.5);
    });
  });
}

let droneNodes: { stop: () => void } | null = null;

export function isDronePlaying() {
  return !!droneNodes;
}

export function startAmbientDrone() {
  if (droneNodes) return;
  const audio = getCtx();
  const master = audio.createGain();
  master.gain.setValueAtTime(0, audio.currentTime);
  master.gain.linearRampToValueAtTime(0.06, audio.currentTime + 2.5);
  master.connect(audio.destination);

  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(master);

  const baseFreqs = [130.81, 196.0, 164.81]; // C3, G3, E3 - warm open triad
  const oscs: OscillatorNode[] = [];
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 6;
  lfo.connect(lfoGain);
  lfo.start();

  baseFreqs.forEach((f, i) => {
    const osc = audio.createOscillator();
    osc.type = i === 0 ? "sine" : "triangle";
    osc.frequency.value = f;
    lfoGain.connect(osc.frequency);
    const g = audio.createGain();
    g.gain.value = i === 0 ? 0.6 : 0.3;
    osc.connect(g).connect(filter);
    osc.start();
    oscs.push(osc);
  });

  droneNodes = {
    stop: () => {
      const t = audio.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 1.2);
      setTimeout(() => {
        oscs.forEach((o) => o.stop());
        lfo.stop();
      }, 1300);
    },
  };
}

export function stopAmbientDrone() {
  droneNodes?.stop();
  droneNodes = null;
}
