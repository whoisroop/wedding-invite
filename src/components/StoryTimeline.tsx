import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ArchDivider from "./ArchDivider";

const chapters = [
  {
    year: "2021",
    title: "A Chance Meeting",
    text: "A cousin's wedding in Jaipur, a mismatched seating chart, and a conversation about old film music that outlasted the fireworks.",
  },
  {
    year: "2022",
    title: "Falling In Step",
    text: "Weekend trains between two cities, playlists traded like letters, and the slow, certain realisation that home had become a person.",
  },
  {
    year: "2024",
    title: "A Question at Sunset",
    text: "On the ghats of Lake Pichola as the sky turned to marigold, Arjun knelt with his grandmother's ring. Ishaani said yes before he finished the sentence.",
  },
  {
    year: "2025",
    title: "Two Families, One Table",
    text: "The Mehtas and the Rathores met over sweets and shrikhand, traded old stories, and began planning the celebration you're now part of.",
  },
  {
    year: "2026",
    title: "The Palace Opens",
    text: "This December, in Udaipur, every doorway of the Rajwada opens for one celebration — and we've saved a seat for you.",
  },
];

export default function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });

  return (
    <section id="story" className="relative bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <ArchDivider label="OUR STORY" />
          <h2 className="font-display mt-2 text-4xl text-maroon md:text-5xl">A Love, Chronicled</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-sm text-maroon-light/80 md:text-base">
            Every royal romance has a timeline. Here is ours, one chapter at a time.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-maroon/15 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-gold-light via-gold to-gold-deep"
              style={{ height: "100%", scaleY: scrollYProgress }}
            />
          </div>

          <div className="space-y-14 md:space-y-20">
            {chapters.map((c, i) => (
              <motion.div
                key={c.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`relative flex items-start gap-6 pl-12 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
                }`}
              >
                <span
                  className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-warmwhite shadow-md md:top-0 ${
                    i % 2 === 0 ? "md:-right-4 md:left-auto" : "md:-left-4"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-gold" />
                </span>
                <div>
                  <span className="font-label text-xs tracking-[0.3em] text-gold-deep">{c.year}</span>
                  <h3 className="font-display mt-1 text-2xl text-maroon md:text-3xl">{c.title}</h3>
                  <p className="font-body mt-2 text-sm leading-relaxed text-maroon-dark/75 md:text-base">{c.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
