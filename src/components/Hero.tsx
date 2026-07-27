import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Petals from "./Petals";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-maroon-dark">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src="/images/palace-hero-bg.jpg"
          alt="Watercolor illustration of a Rajasthani palace beside a lotus pond at dusk"
          className="h-[120%] w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/70 via-maroon-dark/30 to-maroon-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-transparent to-maroon-dark/40" />
      </motion.div>

      <Petals count={10} variant="pink" />

      {/* ambient glowing particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold-light"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              animation: `particle-glow ${4 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-label mb-5 text-[0.65rem] tracking-[0.5em] text-gold-light md:text-xs"
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.1 }}
          className="font-script flex flex-wrap items-center justify-center gap-3 text-7xl leading-none text-warmwhite sm:text-8xl md:text-9xl"
        >
          <span>Ishaani</span>
          <span className="gold-text shimmer bg-clip-text text-5xl sm:text-6xl md:text-7xl">&amp;</span>
          <span>Arjun</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="my-6 h-px w-40 bg-gradient-to-r from-transparent via-gold-light to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 1 }}
          className="font-label text-sm tracking-[0.3em] text-warmwhite md:text-base"
        >
          12&nbsp;·&nbsp;12&nbsp;·&nbsp;2026&nbsp;&nbsp;—&nbsp;&nbsp;RAJWADA HERITAGE PALACE, UDAIPUR
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-8 max-w-md text-warmwhite/80"
        >
          <p className="font-display text-xl italic md:text-2xl">“सात जन्मों का साथ”</p>
          <p className="font-body mt-2 text-xs tracking-[0.1em] text-warmwhite/60">
            bound by love, blessed for seven lifetimes
          </p>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-warmwhite/60"
        >
          <span className="font-label text-[0.6rem] tracking-[0.4em]">SCROLL TO ENTER</span>
          <span className="h-8 w-px animate-pulse bg-gold-light/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
