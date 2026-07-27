import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Petals from "./Petals";
import { playBellChime } from "../lib/sound";

const embroideryPattern =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><g fill='none' stroke='%23ecd291' stroke-width='1' opacity='0.55'><circle cx='30' cy='30' r='14'/><circle cx='30' cy='30' r='6'/><path d='M30 8 L30 16 M30 44 L30 52 M8 30 L16 30 M44 30 L52 30'/></g></svg>\")";

interface CurtainIntroProps {
  onOpened: () => void;
}

export default function CurtainIntro({ onOpened }: CurtainIntroProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "gone">("closed");

  const handleOpen = () => {
    if (stage !== "closed") return;
    try {
      playBellChime();
    } catch {
      /* audio may be blocked; visuals still proceed */
    }
    setStage("opening");
    onOpened();
    window.setTimeout(() => setStage("gone"), 2600);
  };

  return (
    <AnimatePresence>
      {stage !== "gone" && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-maroon-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* warm glow behind curtains */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[60vh] w-[60vh] rounded-full bg-gold/40 blur-[120px]" />
          </div>

          {stage === "opening" && (
            <div className="absolute inset-0 z-10">
              <Petals count={22} variant="gold" />
              <Petals count={16} variant="pink" />
            </div>
          )}

          {/* monogram */}
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 text-center"
            animate={stage === "opening" ? { opacity: [1, 1, 0] } : {}}
            transition={{ duration: 2.2, times: [0, 0.55, 1] }}
          >
            <motion.img
              src="/images/mandala-monogram.png"
              alt=""
              className="h-28 w-28 rounded-full object-cover shadow-[0_0_60px_rgba(200,153,44,0.55)] md:h-36 md:w-36"
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <motion.p
              className="font-label text-xs tracking-[0.5em] text-gold-light"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              YOU ARE INVITED
            </motion.p>
          </motion.div>

          {/* left curtain */}
          <motion.div
            className="curtain-fold absolute inset-y-0 left-0 w-1/2 origin-left shadow-[inset_-30px_0_60px_rgba(0,0,0,0.45)]"
            style={{ animation: stage === "closed" ? "curtain-idle-left 6s ease-in-out infinite" : undefined }}
            animate={stage === "opening" ? { x: "-102%" } : { x: 0 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
          >
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: embroideryPattern }} />
            <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-gold-light via-gold to-gold-deep" />
            <div className="absolute right-3 top-0 h-full w-[3px] bg-gold-light/70" />
            {/* tassels */}
            <div className="absolute -bottom-6 right-0 flex translate-x-1/2 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="tassel h-16 w-2 rounded-b-full shadow-md md:h-20" />
              ))}
            </div>
          </motion.div>

          {/* right curtain */}
          <motion.div
            className="curtain-fold absolute inset-y-0 right-0 w-1/2 origin-right shadow-[inset_30px_0_60px_rgba(0,0,0,0.45)]"
            style={{ animation: stage === "closed" ? "curtain-idle-right 6s ease-in-out infinite" : undefined }}
            animate={stage === "opening" ? { x: "102%" } : { x: 0 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
          >
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: embroideryPattern }} />
            <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-gold-light via-gold to-gold-deep" />
            <div className="absolute left-3 top-0 h-full w-[3px] bg-gold-light/70" />
            <div className="absolute -bottom-6 left-0 flex -translate-x-1/2 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="tassel h-16 w-2 rounded-b-full shadow-md md:h-20" />
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          {stage === "closed" && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 px-6 text-center">
              <span className="font-label text-[0.65rem] tracking-[0.5em] text-gold-light md:text-xs">
                THE RATHORE &amp; MEHTA WEDDING
              </span>
              <h1 className="font-script text-6xl text-warmwhite drop-shadow-[0_0_20px_rgba(200,153,44,0.5)] md:text-8xl">
                Ishaani &amp; Arjun
              </h1>
              <motion.button
                onClick={handleOpen}
                className="font-label group relative mt-4 overflow-hidden rounded-full border border-gold-light/70 px-10 py-4 text-xs tracking-[0.35em] text-gold-light transition-colors hover:text-maroon-dark"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-light via-gold to-gold-deep transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">OPEN INVITATION</span>
              </motion.button>
              <p className="font-body text-[0.7rem] tracking-[0.15em] text-warmwhite/50">
                best experienced with sound on
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
