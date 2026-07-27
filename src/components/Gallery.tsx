import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "./Divider";

const photos = [
  {
    src: "https://images.pexels.com/photos/33195531/pexels-photo-33195531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    caption: "Traditions held close",
  },
  {
    src: "https://images.pexels.com/photos/30184621/pexels-photo-30184621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    caption: "Beneath the floral mandap",
  },
  {
    src: "https://images.pexels.com/photos/38274753/pexels-photo-38274753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    caption: "Blessings and celebration",
  },
  {
    src: "https://images.pexels.com/photos/12718210/pexels-photo-12718210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    caption: "Rituals passed down generations",
  },
  {
    src: "https://images.pexels.com/photos/30809696/pexels-photo-30809696.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    caption: "Two hands, one promise",
  },
  {
    src: "https://images.pexels.com/photos/34431714/pexels-photo-34431714.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
    caption: "A thousand small flames",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Divider label="MOMENTS" />
          <h2 className="font-display mt-6 text-4xl text-charcoal md:text-5xl">Our Gallery</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-lg text-charcoal-light/80 md:text-xl">
            A collection of memories, captured and cherished.
          </p>
        </div>

        <div className="mt-14 columns-2 gap-6 md:columns-3">
          {photos.map((p, i) => (
            <motion.button
              key={p.src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-sm border-[8px] border-warmwhite bg-warmwhite shadow-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl focus-visible:-translate-y-1.5 focus-visible:shadow-xl"
            >
              <span className="pointer-events-none absolute inset-0 z-10 border border-gold/40 rounded-sm" />
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="px-3 pb-3 pt-2 text-left">
                <div className="mb-1.5 h-px w-6 bg-gold/40" />
                <span className="font-label block text-[0.55rem] tracking-[0.25em] text-charcoal/60">{p.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-[85vh] max-w-2xl border-[10px] border-warmwhite shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="pointer-events-none absolute inset-0 border border-gold/60" />
              <img src={photos[active].src} alt={photos[active].caption} className="max-h-[75vh] w-full object-contain" />
              <div className="bg-warmwhite p-3 text-center">
                <span className="font-label text-xs tracking-[0.25em] text-charcoal">{photos[active].caption}</span>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close image"
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-warmwhite shadow-lg"
              >
                &#x2715;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
