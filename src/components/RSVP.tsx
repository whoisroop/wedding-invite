import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Divider from "./Divider";

export default function RSVP() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
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
          Kindly respond by November 10th, 2026 — we look forward to celebrating with you.
        </p>

        <div className="relative mx-auto mt-14 max-w-md" style={{ perspective: 1400 }}>
          {/* envelope body */}
          <div className="relative rounded-sm bg-warmwhite shadow-xl">
            <div className="relative flex h-56 items-end justify-center overflow-hidden p-6">
              {!open && (
                <p className="font-body text-2xl text-charcoal/60 italic">Roop &amp; Dhvani request the pleasure...</p>
              )}
            </div>

            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 h-32 origin-top bg-maroon"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 85%)" }}
              animate={{ rotateX: open ? 180 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />

            {!open && (
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open the RSVP envelope"
                className="font-label absolute left-1/2 top-20 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-warmwhite text-[0.5rem] tracking-[0.15em] shadow-lg"
              >
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
