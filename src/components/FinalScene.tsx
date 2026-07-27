import { motion } from "framer-motion";
import Petals from "./Petals";

const diyaCount = 9;

function Firework({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <motion.span
      className="absolute h-1 w-1 rounded-full"
      style={{ left, top, boxShadow: "0 0 0 0 rgba(236,210,145,0.9)" }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        boxShadow: [
          "0 0 0 0 rgba(236,210,145,0.9)",
          "0 0 0 26px rgba(236,210,145,0), 0 0 0 14px rgba(236,210,145,0.35)",
          "0 0 0 40px rgba(236,210,145,0)",
        ],
        scale: [0.6, 1.4, 1.6],
      }}
      transition={{ duration: 2.6, delay, repeat: Infinity, repeatDelay: 5 + Math.random() * 4 }}
    />
  );
}

export default function FinalScene() {
  return (
    <section className="relative overflow-hidden bg-maroon-dark py-28 md:py-36">
      <img
        src="/images/night-diyas.jpg"
        alt="Night scene of a palace by a lake with floating diyas and gentle fireworks"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark via-maroon-dark/70 to-maroon-dark" />
      <Petals count={12} variant="gold" />
      <Petals count={8} variant="pink" />

      <div className="pointer-events-none absolute inset-0">
        <Firework delay={0.3} left="20%" top="25%" />
        <Firework delay={1.8} left="70%" top="18%" />
        <Firework delay={3.2} left="45%" top="35%" />
        <Firework delay={2.4} left="85%" top="40%" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <span className="font-label text-xs tracking-[0.5em] text-gold-light">UNTIL WE MEET IN UDAIPUR</span>
          <h2 className="font-script mt-6 text-5xl leading-tight text-warmwhite md:text-7xl">
            With Love, We Await Your Presence
          </h2>
        </motion.div>

        <div className="mt-14 flex justify-center gap-3 md:gap-4" aria-hidden="true">
          {Array.from({ length: diyaCount }).map((_, i) => (
            <motion.svg
              key={i}
              width="26"
              height="34"
              viewBox="0 0 26 34"
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.6 }}
              style={{ animation: `diya-flicker ${2.4 + (i % 3) * 0.4}s ease-in-out ${i * 0.18}s infinite` }}
            >
              <ellipse cx="13" cy="26" rx="12" ry="6" fill="#9c7317" />
              <ellipse cx="13" cy="24" rx="9" ry="4.5" fill="#ecd291" />
              <path d="M13 20 C10 15 12 10 13 6 C14 10 16 15 13 20Z" fill="#f4b13a" />
              <path d="M13 17 C11.5 14 12.5 11 13 8 C13.5 11 14.5 14 13 17Z" fill="#fff2c7" />
            </motion.svg>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-body mt-14 text-sm tracking-[0.15em] text-warmwhite/60"
        >
          ISHAANI &amp; ARJUN · 12 DECEMBER 2026 · UDAIPUR, RAJASTHAN
        </motion.p>
        <p className="font-body mt-2 text-xs tracking-[0.2em] text-warmwhite/35">
          made with devotion, for our favourite people
        </p>
      </div>
    </section>
  );
}
