import { motion } from "framer-motion";
import ArchDivider from "./ArchDivider";

const address = "Rajwada Heritage Palace, Lake Pichola Road, Udaipur, Rajasthan 313001";
const mapsQuery = encodeURIComponent(address);

export default function Venue() {
  return (
    <section id="venue" className="relative bg-maroon-dark py-24 md:py-32">
      <div className="silk-texture absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <ArchDivider label="FIND YOUR WAY" tone="ivory" />
          <h2 className="font-display mt-2 text-4xl text-warmwhite md:text-5xl">The Venue Scroll</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative mt-14"
        >
          <div className="h-4 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep shadow-md" />
          <div className="paper-grain relative bg-ivory px-6 py-10 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] md:px-14 md:py-14">
            <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="font-label text-xs tracking-[0.4em] text-gold-deep">THE CEREMONY &amp; RECEPTION</span>
                <h3 className="font-display mt-2 text-3xl text-maroon md:text-4xl">Rajwada Heritage Palace</h3>
                <p className="font-body mt-3 text-sm leading-relaxed text-maroon-dark/75 md:text-base">
                  {address}
                </p>
                <p className="font-body mt-4 text-sm text-maroon-dark/75">
                  All ceremonies from December 10–12 take place within the palace grounds. Palace gates open one
                  hour before each function; heritage attire and comfortable footwear for the mandap lawn are
                  recommended.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-label rounded-full bg-maroon px-6 py-3 text-[0.65rem] tracking-[0.3em] text-warmwhite shadow-md transition-transform hover:scale-105"
                  >
                    GET DIRECTIONS
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-label rounded-full border border-gold px-6 py-3 text-[0.65rem] tracking-[0.3em] text-maroon transition-colors hover:bg-gold hover:text-warmwhite"
                  >
                    VIEW ON MAP
                  </a>
                </div>

                <div className="mt-8 border-t border-gold/30 pt-6">
                  <span className="font-label text-[0.65rem] tracking-[0.3em] text-gold-deep">WEDDING COORDINATORS</span>
                  <p className="font-body mt-2 text-sm text-maroon-dark/80">Rohan Mehta — +91 98765 43210</p>
                  <p className="font-body text-sm text-maroon-dark/80">Diya Rathore — +91 91234 56789</p>
                </div>
              </div>

              <div className="relative h-72 overflow-hidden border-4 border-warmwhite shadow-lg md:h-96">
                <iframe
                  title="Venue map"
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  className="h-full w-full grayscale-[15%] sepia-[10%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          <div className="h-4 rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-deep shadow-md" />
        </motion.div>
      </div>
    </section>
  );
}
