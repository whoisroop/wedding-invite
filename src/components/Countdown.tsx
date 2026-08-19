import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-11-25T00:00:00+05:30").getTime();

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

  const finished = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  return (
    <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-label text-xs tracking-[0.5em] text-gold"
        >
          SAVE THE DATE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-display mt-3 text-3xl text-charcoal md:text-4xl"
        >
          {finished ? "Forever Has Begun" : "Counting Down to Forever"}
        </motion.h2>

        {finished ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-14 flex max-w-lg flex-col items-center gap-3"
          >
            <p className="font-display text-2xl leading-snug text-gold md:text-3xl">
              The timer stopped. Our story didn't.
            </p>
            <div className="my-1 h-px w-24 bg-gold/40" />
            <p className="font-body text-lg italic text-gold/85">
              Officially stuck with each other, happily of course.
            </p>
          </motion.div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative border border-gold/30 bg-warmwhite px-4 py-8 shadow-md"
              >
                <div className="absolute inset-0 border border-gold/10 m-[2px]" />
                <span className="font-display relative block text-4xl text-emerald md:text-5xl">
                  {String(u.value).padStart(2, "0")}
                </span>
                <span className="font-label relative mt-2 block text-[0.55rem] tracking-[0.35em] text-charcoal-light">
                  {u.label.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="font-body mt-10 text-base text-charcoal-light/70"
        >
          25 November 2026
        </motion.p>
      </div>
    </section>
  );
}
