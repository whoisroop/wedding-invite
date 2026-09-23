import { motion } from "framer-motion";
import Divider from "./Divider";

const address = "Venue details to be announced";
const mapLocation = "Adajan, Surat, Gujarat";
const mapsQuery = encodeURIComponent(mapLocation);

export default function Venue() {
  return (
    <section id="venue" className="relative py-24 md:py-32" style={{ backgroundColor: "#0A3F34" }}>
      <div className="linen-texture absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Divider label="THE VENUE" light />
          <h2 className="font-display mt-6 text-4xl text-warmwhite md:text-5xl">Where It All Happens</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mt-14"
        >
          <div className="relative bg-warmwhite px-6 py-10 shadow-xl md:px-14 md:py-14">
            <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="font-label text-xs tracking-[0.4em] text-gold">WEDDING DINNER</span>
                <h3 className="font-display mt-2 text-3xl text-charcoal md:text-4xl">Celebration Venue</h3>
                <p className="font-body mt-3 text-lg leading-relaxed text-charcoal-light/80">
                  {address}
                </p>
                <p className="font-body mt-4 text-base text-charcoal-light/70">
                  Further details, including the venue name, address, and directions, will appear here closer to the date.
                  But rest assured, it’s happening in Surat!
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-label rounded-full bg-emerald px-6 py-3 text-[0.6rem] tracking-[0.3em] text-warmwhite shadow-md transition-transform hover:scale-105"
                  >
                    VIEW ON MAP
                  </a>
                </div>
              </div>

              <div className="relative h-72 overflow-hidden border-4 border-warmwhite shadow-lg md:h-96">
                <iframe
                  title="Venue map"
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
