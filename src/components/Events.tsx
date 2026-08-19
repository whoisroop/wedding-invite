import { motion } from "framer-motion";
import Divider from "./Divider";

interface EventItem {
  name: string;
  time: string;
  label: string;
  description: string;
  accent: string;
}

const events: EventItem[] = [
  {
    name: "Bridal Shower",
    time: "4:00 PM",
    label: "24 NOVEMBER",
    description: "An afternoon of joy in Dhvani's honor — laughter, games, and joyful anticipation as close friends shower the bride with love.",
    accent: "from-maroon-light/40 to-gold/10",
  },
  {
    name: "The Wedding Ceremony",
    time: "10:00 AM",
    label: "25 NOVEMBER",
    description: "The sacred moment — vows exchanged, garlands bestowed, and two souls united in the presence of those they love most.",
    accent: "from-emerald/40 to-emerald/10",
  },
  {
    name: "Reception",
    time: "7:30 PM",
    label: "25 NOVEMBER",
    description: "A night of celebration — dinner, dancing, laughter, and memories that will echo through the years.",
    accent: "from-gold/40 to-emerald/10",
  },
];

export default function Events() {
  return (
    <section id="events" className="relative bg-emerald py-24 md:py-32">
      <div className="linen-texture absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Divider label="THE CELEBRATIONS" light />
          <h2 className="font-display mt-6 text-4xl text-warmwhite md:text-5xl">A Weekend to Remember</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-lg text-warmwhite/70 md:text-xl">
            Three occasions, one celebration — a shower of love, a sacred ceremony, and a night to remember.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-warmwhite overflow-hidden"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${event.accent}`} />
              <div className="p-8">
                <span className="font-label text-[0.55rem] tracking-[0.35em] text-gold">{event.label}</span>
                <h3 className="font-display mt-2 text-2xl text-charcoal md:text-3xl">{event.name}</h3>
                <div className="my-4 h-px w-12 bg-gold/40" />
                <p className="font-body text-base text-charcoal-light/80">{event.description}</p>
                <div className="mt-6 flex items-center gap-2 text-gold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="font-label text-[0.6rem] tracking-[0.25em]">{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
