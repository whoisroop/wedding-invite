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
    setTimeout(() => setStage("revealed"), 2200);
    setTimeout(() => {
      setStage("exiting");
      setTimeout(onComplete, 1200);
    }, 5500);
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
      setTimeout(() => setStage("revealed"), 2200);
      setTimeout(() => {
        setStage("exiting");
        setTimeout(onComplete, 1200);
      }, 5500);
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
                    src="images/logo.png"
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
                  className="absolute inset-x-0 top-0 origin-top z-20"
                  style={{
                    height: "100%",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  animate={{ rotateX: stage !== "closed" ? 180 : 0 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.72, 0, 0.28, 1],
                      delay: stage !== "closed" ? 0.7 : 0,
                    }}
                >
                  <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                    {/* Maroon V fill */}
                    <path d="M0,0 L400,0 L200,108 Z" fill="#7A1F2A" />
                    <path d="M0,0 L400,0 L200,108 Z" fill="url(#flapGrad)" opacity="0.15" />
                    <defs>
                      <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#9A2F3A" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    {/* Single thin gold V-line — constant 12-unit perpendicular inset from flap edge */}
                    <path d="M58,18 L200,94 L342,18" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" vectorEffect="non-scaling-stroke" />
                  </svg>
                </motion.div>



                {/* WAX SEAL — flex-centering avoids transform conflict with exit */}
                <AnimatePresence>
                  {stage === "closed" && (
                    <motion.div
                      key="wax-seal"
                      className="absolute z-30 left-0 right-0 flex justify-center pointer-events-none"
                      style={{ top: "39%" }}
                      exit={{ opacity: 0, scale: 0.7, y: 8 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                    >
                      <motion.button
                        onClick={handleOpen}
                        disabled={stage !== "closed"}
                        aria-label="Open invitation"
                        className="outline-none focus:outline-none focus-visible:outline-none cursor-pointer flex items-center justify-center select-none pointer-events-auto"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                        whileHover={stage === "closed" ? { scale: 1.06 } : {}}
                        whileTap={stage === "closed" ? { scale: 0.95 } : {}}
                      >
                        <img
                          src="images/stamp-seal-transparent.png"
                          alt=""
                          className="h-20 w-auto md:h-24"
                          style={{ filter: "drop-shadow(0 0 10px rgba(201,162,39,0.35))" }}
                        />
                      </motion.button>
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
                  <div className="absolute inset-2 border border-gold/10 pointer-events-none" />

                  <span className="font-label text-[0.5rem] tracking-[0.5em] text-gold">
                    YOU ARE CORDIALLY INVITED
                  </span>

                  <div className="my-6 flex justify-center">
                    <img
                      src="images/logo.png"
                      alt="Roop & Dhvani"
                      className="h-16 w-auto object-contain md:h-20"
                    />
                  </div>

                  <h1 className="font-display text-3xl md:text-4xl text-maroon tracking-wide">
                    <span className="text-gold-shine">R</span>oop
                    <span className="mx-3 text-gold/40 text-xl">&amp;</span>
                    <span className="text-gold-shine">D</span>hvani
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

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-8"
                  >
                    <motion.button
                      onClick={handleEnter}
                      className="btn-reveal font-label px-8 py-3 text-[0.55rem] tracking-[0.35em] cursor-pointer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>ENTER THE CELEBRATION</span>
                    </motion.button>
                    <p className="font-body mt-2 text-[0.6rem] tracking-[0.15em] text-charcoal-light/25">
                      Tap or Scroll
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
                  className="btn-reveal font-label px-10 py-4 text-xs tracking-[0.35em] cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>OPEN INVITATION</span>
                </motion.button>
                <p className="font-body mt-3 text-xs tracking-[0.1em] text-charcoal-light/25">
                  Tap or Scroll
                </p>
              </motion.div>
            )}

            {stage === "opening" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body mt-6 text-xs tracking-[0.15em] text-charcoal-light/30"
              >
                Preparing Your Invitation...
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
