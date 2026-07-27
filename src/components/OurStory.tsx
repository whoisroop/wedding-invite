import { motion } from "framer-motion";
import Divider from "./Divider";

const chapters = [
  {
    year: "2019",
    title: "A Serendipitous Meeting",
    text: "What began as a passing acquaintance in a crowded room soon became the only conversation either of them wanted to have. Strangers, then friends — and then, something more.",
  },
  {
    year: "2021",
    title: "Falling in Step",
    text: "Late night calls turned into morning flights. Cities between them became bridges, not barriers. Every goodbye carried the quiet certainty of a future together.",
  },
  {
    year: "2023",
    title: "A Question of Forever",
    text: "As the sun set over the horizon, one question — simple, terrifying, and absolutely certain — changed everything. The answer was yes, before the words had even left.",
  },
  {
    year: "2024",
    title: "Two Worlds, One Family",
    text: "Families met over shared laughter and borrowed stories. Traditions intertwined, and what began as two became the beginning of something far greater.",
  },
  {
    year: "2026",
    title: "The Celebration Begins",
    text: "And now, on the 25th of November, every road leads to one place. A ceremony. A celebration. A lifetime.",
  },
];

export default function OurStory() {
  return (
    <section id="story" className="relative bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Divider label="OUR JOURNEY" />
          <h2 className="font-display mt-6 text-4xl text-charcoal md:text-5xl">A Love Story</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-lg text-charcoal-light/80 md:text-xl">
            Every great story begins with a single glance, a shared laugh, a moment that quietly changes everything.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-5 top-0 h-full w-px bg-gold/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-20">
            {chapters.map((c, i) => (
              <motion.div
                key={c.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative flex items-start gap-6 pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-14 md:text-right md:ml-auto" : "md:ml-0 md:pl-14"
                }`}
              >
                <span
                  className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-warmwhite md:top-0 ${
                    i % 2 === 0 ? "md:-left-5" : "md:-left-5"
                  } ${i === chapters.length - 1 ? "border-gold shadow-[0_0_12px_rgba(201,162,39,0.3)]" : "border-gold/40"}`}
                >
                  <span className={`h-3 w-3 rounded-full ${i === chapters.length - 1 ? "bg-gold" : "bg-gold/60"}`} />
                </span>
                <div>
                  <span className="font-label text-xs tracking-[0.3em] text-gold">{c.year}</span>
                  <h3 className="font-display mt-1 text-2xl text-charcoal md:text-3xl">{c.title}</h3>
                  <p className="font-body mt-2 text-base leading-relaxed text-charcoal-light/80 md:text-lg">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
