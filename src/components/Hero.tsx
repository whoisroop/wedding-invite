import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-emerald">
      <div className="linen-texture absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-dark/40 via-transparent to-emerald-dark/60" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold-light"
            style={{
              left: `${(i * 29 + 7) % 100}%`,
              top: `${(i * 41 + 13) % 100}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              opacity: 0.5,
              animation: `particle-rise ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-label mb-6 text-[0.6rem] tracking-[0.5em] text-gold-light"
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          className="mb-6"
        >
          <img
            src="/images/logo.png"
            alt="Roop & Dhvani"
            className="h-36 w-auto object-contain md:h-48"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-display text-4xl tracking-[0.15em] text-warmwhite sm:text-5xl md:text-6xl"
        >
          <span className="text-gold">R</span>oop
          <span className="mx-4 text-gold/60 text-2xl md:text-3xl">&amp;</span>
          <span className="text-gold">D</span>hvani
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="my-6 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-label text-sm tracking-[0.3em] text-warmwhite/80"
        >
          25 · NOVEMBER · 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-warmwhite/50"
        >
          <span className="font-label text-[0.55rem] tracking-[0.4em]">SCROLL TO EXPLORE</span>
          <span className="h-8 w-px bg-gold/60" style={{ animation: "gold-pulse 2s ease-in-out infinite" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
