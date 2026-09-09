import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Divider from "./Divider";

export default function RSVP() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("accessKey", import.meta.env.VITE_STATICFORMS_API_KEY);
    data.append("subject", "Wedding RSVP Submission");
    const payload = Object.fromEntries(data);

    try {
      const res = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  const buttonStyle = open ? {
    height: "auto",
    opacity: 1,
    marginTop: 24,
  } : {
    height: 0,
    opacity: 0,
    marginTop: 0,
  };

  return (
    <section id="rsvp" className="relative bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Divider label="RSVP" />
        <h2 className="font-display mt-6 text-4xl text-charcoal md:text-5xl">Seal Your Attendance</h2>
        <p className="font-body mx-auto mt-4 max-w-md text-lg text-charcoal-light/80 md:text-xl">
          Kindly respond by November 25th, 2026 — we look forward to celebrating with you.
        </p>

        <div className="relative mx-auto mt-14 max-w-md" style={{ perspective: 1400 }}>
          {/* ground shadow */}
          <div aria-hidden className="absolute -bottom-4 left-1/2 h-6 w-4/5 -translate-x-1/2 rounded-[50%] bg-charcoal/15 blur-lg" />

          {/* envelope body */}
          <div className="relative rounded-sm bg-warmwhite shadow-[0_25px_60px_-20px_rgba(46,46,46,0.35)]">
            {/* inner gold frame */}
            <div className="pointer-events-none absolute inset-x-3 inset-y-3 z-0 border border-gold/15" />
            {/* corner ornaments */}
            {[
              "top-1 left-1 border-t-2 border-l-2",
              "top-1 right-1 border-t-2 border-r-2",
              "bottom-1 left-1 border-b-2 border-l-2",
              "bottom-1 right-1 border-b-2 border-r-2",
            ].map((pos, idx) => (
              <span key={idx} className={`pointer-events-none absolute z-0 h-5 w-5 border-gold/50 ${pos}`} />
            ))}

            <div className="relative flex h-56 items-center justify-center overflow-hidden p-6 text-center">
              {open ? (
                <div className="relative">
                  <p className="font-body text-lg italic leading-relaxed text-charcoal/70">
                    Say something future-us will laugh about.
                  </p>
                  <div className="mx-auto my-3 flex items-center gap-3">
                    <span className="h-px flex-1 bg-gold/40" />
                    <span className="font-label text-[0.6rem] text-gold">&#10086;</span>
                    <span className="h-px flex-1 bg-gold/40" />
                  </div>
                  <p className="font-display text-2xl text-maroon">
                    Roop <span className="text-gold">&amp;</span> Dhvani
                  </p>
                </div>
              ) : (
                <>
                  <span className="pointer-events-none absolute font-display text-4xl text-maroon/5 italic select-none">
                    R&amp;D
                  </span>
                  <div className="relative self-end pb-2">
                    <p className="font-body text-2xl text-charcoal/60 italic">We request the pleasure.</p>
                  </div>
                </>
              )}
            </div>

            {/* lower front chevron */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-full bg-gradient-to-b from-transparent to-gold/5"
              style={{ clipPath: "polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)" }}
            />

            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 z-[2] h-32 origin-top"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 88%)", backfaceVisibility: "hidden" }}
              animate={{ rotateX: open ? 180 : 0 }}
              transition={{ duration: 0.9, ease: [0.32, 0.72, 0.28, 1] }}
            >
              <div className="h-full w-full bg-gradient-to-b from-maroon-light to-maroon" />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 160"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M46,0 L200,96 L354,0" fill="none" stroke="#C9A227" strokeWidth="1.5" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
              </svg>
            </motion.div>

            {/* wax seal OPEN button */}
            {!open && (
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open the RSVP envelope"
                className="font-label absolute left-1/2 top-20 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full text-[0.5rem] tracking-[0.15em] text-warmwhite"
                style={{
                  background: "radial-gradient(circle at 32% 28%, #E0BE4F 0 10%, #C9A227 45%, #A07E1A 100%)",
                  boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.3), inset -3px -3px 5px rgba(80,40,4,0.3), 0 6px 12px rgba(160,126,26,0.45)",
                }}
              >
                <span className="absolute inset-1.5 rounded-full border border-warmwhite/45" />
                OPEN
              </motion.button>
            )}
          </div>

          {/* form */}
          <motion.div
            initial={false}
            animate={buttonStyle}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border border-gold/30 bg-warmwhite p-8 text-left shadow-md">
              {sent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <p className="font-display text-2xl text-charcoal">Thank you!</p>
                  <p className="font-body mt-2 text-lg text-charcoal-light/75">
                    Your response has been received. We can't wait to celebrate with you.
                  </p>
                </motion.div>
              ) : error ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <p className="font-display text-2xl text-charcoal">Something went wrong</p>
                  <p className="font-body mt-2 text-lg text-charcoal-light/75">
                    Please try again or reach out to us directly.
                  </p>
                  <button
                    onClick={() => setError(false)}
                    className="font-label mt-4 rounded-full border border-gold px-6 py-2 text-xs tracking-[0.25em] text-gold"
                  >
                    TRY AGAIN
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="font-label text-[0.6rem] tracking-[0.25em] text-gold">
                      FULL NAME
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      placeholder="Your name"
                      className="font-body mt-2 w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal outline-none focus:border-gold text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="guests" className="font-label text-[0.6rem] tracking-[0.25em] text-gold">
                        GUESTS
                      </label>
                      <input
                        id="guests"
                        name="guests"
                        type="number"
                        min={1}
                        max={6}
                        defaultValue={1}
                        className="font-body mt-2 w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal outline-none focus:border-gold text-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="font-label text-[0.6rem] tracking-[0.25em] text-gold">
                        PHONE
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                        placeholder="Your phone"
                        className="font-body mt-2 w-full border-b border-charcoal/20 bg-transparent py-2 text-charcoal outline-none focus:border-gold text-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="font-label text-[0.6rem] tracking-[0.25em] text-gold">
                      MESSAGE FOR THE COUPLE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Your blessings, in a few words"
                      className="font-body mt-2 w-full resize-none border-b border-charcoal/20 bg-transparent py-2 text-charcoal outline-none focus:border-gold text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-label w-full rounded-full bg-emerald py-3 text-xs tracking-[0.3em] text-warmwhite transition-transform hover:scale-[1.02]"
                  >
                    SEND RSVP
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
