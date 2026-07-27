import { useState } from "react";
import { startAmbientDrone, stopAmbientDrone } from "../lib/sound";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (playing) {
      stopAmbientDrone();
      setPlaying(false);
    } else {
      startAmbientDrone();
      setPlaying(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause background music" : "Play background music"}
      aria-pressed={playing}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/60 bg-maroon-dark/90 text-gold-light shadow-[0_8px_25px_rgba(0,0,0,0.4)] backdrop-blur transition-transform hover:scale-110"
    >
      {playing ? (
        <span className="flex items-end gap-[3px]" aria-hidden="true">
          <span className="h-2 w-[3px] animate-[pulse_1s_ease-in-out_infinite] bg-gold-light" />
          <span className="h-3.5 w-[3px] animate-[pulse_1.2s_ease-in-out_infinite] bg-gold-light" />
          <span className="h-2.5 w-[3px] animate-[pulse_0.9s_ease-in-out_infinite] bg-gold-light" />
        </span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
    </button>
  );
}
