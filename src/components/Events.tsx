import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ArchDivider from "./ArchDivider";

interface EventItem {
  name: string;
  time: string;
  venue: string;
  img: string;
  accent: string;
  desc: string;
}

interface Day {
  label: string;
  date: string;
  events: EventItem[];
}

const days: Day[] = [
  {
    label: "Day One",
    date: "December 10",
    events: [
      {
        name: "Haldi",
        time: "10:00 AM",
        venue: "Rathore Haveli Lawn",
        img: "/images/haldi-art.jpg",
        accent: "from-gold-deep to-gold-light",
        desc: "Turmeric, marigold, and laughter — the celebration's first blessing of colour.",
      },
      {
        name: "Mehendi",
        time: "4:00 PM",
        venue: "Rajwada Courtyard",
        img: "/images/mehendi-art.jpg",
        accent: "from-emerald to-lotus",
        desc: "Henna artists, live folk music, and patterns that will outlast the party.",
      },
    ],
  },
  {
    label: "Day Two",
    date: "December 11",
    events: [
      {
        name: "Sangeet",
        time: "7:00 PM",
        venue: "Lakeside Amphitheatre",
        img: "/images/sangeet-art.jpg",
        accent: "from-maroon-light to-gold",
        desc: "An evening of family choreography, old rivalries, and one surprise act.",
      },
    ],
  },
  {
    label: "Day Three",
    date: "December 12",
    events: [
      {
        name: "Wedding Ceremony",
        time: "8:00 AM",
        venue: "Main Mandap, Rajwada Palace",
        img: "/images/wedding-art.jpg",
        accent: "from-gold-deep via-gold to-gold-light",
        desc: "Vows exchanged beneath a marigold mandap, as the sun clears the lake mist.",
      },
      {
        name: "Reception",
        time: "7:30 PM",
        venue: "Durbar Hall, Rajwada Palace",
        img: "/images/reception-art.jpg",
        accent: "from-emerald-dark to-emerald",
        desc: "Dinner, dancing, and toasts beneath the palace chandeliers.",
      },
    ],
  },
];

function EventCard({ event }: { event: EventItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="group relative flex-1 overflow-hidden rounded-[2px] border border-gold/25 bg-warmwhite shadow-[0_18px_40px_-20px_rgba(54,10,19,0.5)] transition-shadow duration-500 will-change-transform hover:shadow-[0_25px_60px_-15px_rgba(54,10,19,0.55)]"
    >
      <div className={`h-1 w-full bg-gradient-to-r ${event.accent}`} />
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.img}
          alt={`Illustration for the ${event.name} ceremony`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-2 border border-gold-light/40" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-3xl text-maroon">{event.name}</h3>
        <div className="font-label mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.65rem] tracking-[0.25em] text-gold-deep">
          <span>{event.time}</span>
          <span>{event.venue}</span>
        </div>
        <p className="font-body mt-3 text-sm leading-relaxed text-maroon-dark/75">{event.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Events() {
  return (
    <section id="events" className="relative bg-maroon-dark py-24 md:py-32">
      <div className="silk-texture absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <ArchDivider label="THE CELEBRATIONS" tone="ivory" />
          <h2 className="font-display mt-2 text-4xl text-warmwhite md:text-5xl">Three Days, Five Ceremonies</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-sm text-warmwhite/70 md:text-base">
            Each function has its own colour, its own music, its own small magic.
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {days.map((day) => (
            <div key={day.label}>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-label text-xs tracking-[0.35em] text-gold-light">{day.label.toUpperCase()}</span>
                <span className="h-px flex-1 bg-gold-light/25" />
                <span className="font-body text-xs tracking-[0.2em] text-warmwhite/50">{day.date}, 2026</span>
              </div>
              <div className="flex flex-col gap-8 md:flex-row">
                {day.events.map((event) => (
                  <EventCard key={event.name} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
