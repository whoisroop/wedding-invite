import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-12-12T08:00:00+05:30").getTime();

function getRemaining() {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-ivory py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="font-label text-xs tracking-[0.5em] text-gold-deep">SAVE THE DATE</span>
        <h2 className="font-display mt-2 text-3xl text-maroon md:text-4xl">Until the Vows Are Spoken</h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {units.map((u) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-sm border border-gold/40 bg-warmwhite px-4 py-8 shadow-[0_0_30px_-8px_rgba(200,153,44,0.45)]"
            >
              <div className="absolute inset-2 border border-gold-light/40" />
              <span className="font-display gold-text shimmer relative block text-5xl md:text-6xl">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="font-label relative mt-2 block text-[0.6rem] tracking-[0.35em] text-maroon-light">
                {u.label.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
