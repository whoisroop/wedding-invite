import { motion } from "framer-motion";
import Divider from "./Divider";

const chapters = [
  {
    year: "2020",
    title: "A Serendipitous Meeting",
    text: "A single “hi” through the blur of online classes became the only conversation that ever mattered. What followed was a friendship filled with endless conversations, shared laughs, and countless little moments they’ll always cherish.",
  },
  {
    year: "2022",
    title: "Finding the Same Rhythm",
    text: "Their first dance was never about the steps. It was about two hearts finding the same beat. When the song ended, the rhythm stayed.",
  },
  {
    year: "2023",
    title: "Something More",
    text: "Somewhere along the way, a beautiful friendship quietly became something more. And just like that, a new chapter began.",
  },
  {
    year: "2024",
    title: "The Winning Pair",
    text: "They graduated side by side. Who would have thought the first and second rank holders would end up being each other’s biggest cheerleaders?",
  },
  {
    year: "2025",
    title: "Still Us",
    text: "Their worlds took them in different directions. The miles grew, but somehow, they stayed close — still choosing each other, every day.",
  },
  {
    year: "2026",
    title: "The Celebration Begins",
    text: "In March, a ring said everything. Two families came together, blending traditions to build one story. And now, a beautiful new chapter begins — all because of one simple “hi.”",
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
                key={i}
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
