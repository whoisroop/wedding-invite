import { motion } from "framer-motion";
export default function FinalScene() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36" style={{ backgroundColor: "#1A1A1A" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold/30"
            style={{
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 53 + 11) % 100}%`,
              width: 2 + (i % 2),
              height: 2 + (i % 2),
              animation: `particle-rise ${6 + (i % 3)}s ease-in-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <span className="font-label text-xs tracking-[0.5em] text-gold">UNTIL WE MEET</span>
          <h2 className="font-display mt-6 text-4xl leading-tight text-warmwhite md:text-5xl">
            With Love, We Await Your Presence
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-12 flex justify-center"
        >
          <img
            src="images/logo.png"
            alt="Roop & Dhvani"
            className="h-28 w-auto object-contain md:h-36"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-body text-base tracking-[0.15em] text-warmwhite/60"
        >
          ROOP &amp; DHVANI · 25 NOVEMBER 2026
        </motion.p>
        <p className="font-body mt-3 text-sm tracking-[0.2em] text-warmwhite/30">
          made with love, for those we hold dear
        </p>
      </div>
    </section>
  );
}
