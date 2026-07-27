import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export default function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [stage, setStage] = useState<"closed" | "opening" | "revealed" | "exiting">("closed");
  const interactedRef = useRef(false);

  const handleOpen = () => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    setStage("opening");
    setTimeout(() => setStage("revealed"), 1800);
    setTimeout(() => {
      setStage("exiting");
      setTimeout(onComplete, 1200);
    }, 5000);
  };

  const handleEnter = () => {
    if (stage !== "revealed") return;
    setStage("exiting");
    setTimeout(onComplete, 1200);
  };

  useEffect(() => {
    if (stage !== "closed") return;
    const onScroll = () => {
      if (interactedRef.current) return;
      interactedRef.current = true;
      setStage("opening");
      setTimeout(() => setStage("revealed"), 1800);
      setTimeout(() => {
        setStage("exiting");
        setTimeout(onComplete, 1200);
      }, 5000);
    };
    window.addEventListener("wheel", onScroll, { passive: true, once: true });
    window.addEventListener("touchmove", onScroll, { passive: true, once: true });
    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [stage, onComplete]);

  useEffect(() => {
    if (stage !== "revealed") return;
    const onScrollOrClick = () => handleEnter();
    window.addEventListener("wheel", onScrollOrClick, { passive: true, once: true });
    window.addEventListener("touchstart", onScrollOrClick, { passive: true, once: true });
    return () => {
      window.removeEventListener("wheel", onScrollOrClick);
      window.removeEventListener("touchstart", onScrollOrClick);
    };
  }, [stage]);

  return (
    <AnimatePresence>
      {stage !== "exiting" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ivory"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Warm ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[60vh] w-[60vh] rounded-full bg-gold/10 blur-[140px]" />
          </div>

          {/* Subtle linen texture */}
          <div className="linen-texture pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative flex flex-col items-center" style={{ perspective: 1500 }}>
            {/* Floating logo above envelope */}
            <AnimatePresence>
              {stage === "closed" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-16 md:-top-20 z-20 pointer-events-none"
                  style={{ animation: "float 3s ease-in-out infinite" }}
                >
                  <img
                    src="/images/logo.png"
                    alt=""
                    className="h-14 w-auto object-contain md:h-16 drop-shadow-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ENVELOPE */}
            <motion.div
              className="relative w-80 md:w-[420px]"
              animate={
                stage === "revealed"
                  ? { y: -80, opacity: 0.8, scale: 0.92 }
                  : stage === "exiting"
                    ? { y: -140, opacity: 0, scale: 0.85 }
                    : {}
              }
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{ animation: stage === "closed" ? "envelope-float 3.5s ease-in-out infinite" : undefined }}
            >
              {/* Outer gold border frame */}
              <div className="absolute -inset-3 rounded-sm border border-gold/30" />
              <div className="absolute -inset-[5px] rounded-sm border border-gold/10" />

              {/* Corner ornaments */}
              {[
                "-top-1 -left-1", "-top-1 -right-1",
                "-bottom-1 -left-1", "-bottom-1 -right-1",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute h-4 w-4 border-gold/50 ${pos} ${i < 2 ? "border-t-2 border-l-2" : "border-b-2 border-r-2"} ${i === 1 || i === 3 ? "border-l-0 border-r-2" : ""} ${i === 2 || i === 3 ? "border-t-0 border-b-2" : ""}`}
                  style={i === 1 ? { borderRight: "2px solid rgba(201,162,39,0.5)", borderTop: "2px solid rgba(201,162,39,0.5)", borderLeft: "none", borderBottom: "none" } : {}}
                />
              ))}

              {/* Envelope body */}
              <div className="relative rounded-sm bg-warmwhite shadow-[0_25px_60px_-20px_rgba(46,46,46,0.3)] h-52 md:h-60">
                {/* Inner decorative border */}
                <div className="absolute inset-x-3 inset-y-3 border border-gold/15" />

                {/* Embossed center area */}
                <div className="absolute inset-x-6 bottom-10 top-16 bg-ivory/40 flex items-center justify-center border border-gold/5">
                  <span className="font-display text-lg text-charcoal/10 italic tracking-wide">R &amp; D</span>
                </div>

                {/* Decorative gold line across envelope */}
                <div className="absolute top-[45%] left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

                {/* FLAP */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-36 md:h-40 origin-top"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 85%)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}  
                  animate={{ rotateX: stage !== "closed" ? 180 : 0 }}
                  transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: stage !== "closed" ? 0.3 : 0 }}
                >
                  {/* Flap background */}
                  <div className="absolute inset-0 bg-maroon" />
                  <div className="absolute inset-0 bg-gradient-to-b from-maroon-light/15 to-transparent" />

                  {/* Flap gold border line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/30" />

                  {/* WAX SEAL — only visible when flap is closed */}
                  {stage === "closed" && (
                    <motion.button
                      onClick={handleOpen}
                      aria-label="Open invitation"
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ animation: "seal-glow 2.5s ease-in-out infinite" }}
                    >
                      <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md" style={{ backgroundColor: "#EAE0D0" }}>
                        <img
                          src="/images/logo.png"
                          alt=""
                          className="h-9 w-auto object-contain md:h-10 drop-shadow-sm"
                        />
                      </div>
                    </motion.button>
                  )}
                </motion.div>

                {/* Logo on envelope front (visible when flap opens) */}
                <AnimatePresence>
                  {(stage === "opening" || stage === "revealed") && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10"
                    >
                      <img
                        src="/images/logo.png"
                        alt=""
                        className="h-14 w-auto object-contain md:h-16 drop-shadow-md"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* INVITATION CARD */}
            <AnimatePresence>
              {stage === "revealed" && (
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.95 }}
                  animate={{ y: -50, opacity: 1, scale: 1 }}
                  exit={{ y: -80, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute top-14 w-72 md:w-[360px] bg-warmwhite shadow-2xl border border-gold/30 p-10 md:p-12 text-center"
                >
                  {/* Card inner border */}
                  <div className="absolute inset-2 border border-gold/10 pointer-events-none" />

                  <span className="font-label text-[0.5rem] tracking-[0.5em] text-gold">
                    YOU ARE CORDIALLY INVITED
                  </span>

                  <div className="my-6 flex justify-center">
                    <img
                      src="/images/logo.png"
                      alt="Roop & Dhvani"
                      className="h-16 w-auto object-contain md:h-20"
                    />
                  </div>

                  <h1 className="font-display text-3xl md:text-4xl text-emerald tracking-wide">
                    <span className="text-gold">R</span>oop
                    <span className="mx-3 text-gold/40 text-xl">&amp;</span>
                    <span className="text-gold">D</span>hvani
                  </h1>

                  <div className="my-4 mx-auto h-px w-16 bg-gold/40" />

                  <p className="font-label text-xs tracking-[0.25em] text-charcoal-light/70">
                    25 NOVEMBER 2026
                  </p>

                  <div className="mt-6 pt-4 border-t border-gold/15">
                    <p className="font-body text-base text-charcoal-light/50 italic">
                      Together with their families
                    </p>
                  </div>

                  {/* Enter prompt */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-8"
                  >
                    <motion.button
                      onClick={handleEnter}
                      className="font-label group relative rounded-full border border-gold/50 px-8 py-3 text-[0.55rem] tracking-[0.35em] text-gold transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,162,39,0.25)] hover:border-gold hover:text-warmwhite hover:bg-gold/10 cursor-pointer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="relative z-10">ENTER THE CELEBRATION</span>
                    </motion.button>
                    <p className="font-body mt-2 text-[0.6rem] tracking-[0.15em] text-charcoal-light/25">
                      scroll or tap to enter
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CLOSED STATE CTA */}
            {stage === "closed" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-10 text-center"
              >
                <motion.button
                  onClick={handleOpen}
                  className="font-label group relative rounded-full border border-gold/60 px-10 py-4 text-xs tracking-[0.35em] text-gold transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,162,39,0.3)] hover:border-gold hover:text-warmwhite hover:bg-gold/10 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="relative z-10">OPEN INVITATION</span>
                </motion.button>
                <p className="font-body mt-3 text-xs tracking-[0.1em] text-charcoal-light/25">
                  scroll or tap to open · best viewed on a screen
                </p>
              </motion.div>
            )}

            {/* REVEALED STATE INSTRUCTION */}
            {stage === "opening" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body mt-6 text-xs tracking-[0.15em] text-charcoal-light/30"
              >
                preparing your invitation...
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
