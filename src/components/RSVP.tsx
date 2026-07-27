import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import ArchDivider from "./ArchDivider";

export default function RSVP() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // To connect this form to Google Sheets: create a Google Form with matching
    // fields, then point this form's `action` to the Form's `formResponse` URL
    // (with `target="hidden_iframe"`), or swap this handler for a fetch() call
    // to a Google Apps Script Web App endpoint.
    setSent(true);
  };

  return (
    <section id="rsvp" className="relative bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <ArchDivider label="RSVP" />
        <h2 className="font-display mt-2 text-4xl text-maroon md:text-5xl">Seal Your Attendance</h2>
        <p className="font-body mx-auto mt-4 max-w-md text-sm text-maroon-light/80 md:text-base">
          Kindly respond by November 15th, 2026 — open the envelope to let us know you're coming.
        </p>

        <div className="relative mx-auto mt-14 max-w-md" style={{ perspective: 1400 }}>
          {/* envelope body */}
          <div className="relative rounded-sm bg-sandstone shadow-[0_25px_60px_-20px_rgba(54,10,19,0.5)]">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 top-10 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, transparent 49.5%, rgba(92,15,30,0.15) 50%), linear-gradient(-135deg, transparent 49.5%, rgba(92,15,30,0.15) 50%)",
                backgroundSize: "100% 100%",
              }}
            />
            <div className="relative flex h-64 items-end justify-center overflow-hidden p-6">
              {!open && (
                <p className="font-script mb-6 text-3xl text-maroon">Ishaani &amp; Arjun request the pleasure...</p>
              )}
            </div>

            {/* flap */}
            <motion.div
              className="absolute inset-x-0 top-0 h-32 origin-top bg-gradient-to-b from-maroon-light to-maroon"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 85%)" }}
              animate={{ rotateX: open ? 180 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />

            {/* wax seal / open button */}
            {!open && (
              <motion.button
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open the RSVP envelope"
                className="font-label absolute left-1/2 top-24 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold-light via-gold to-gold-deep text-[0.55rem] tracking-[0.15em] text-maroon-dark shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
              >
                OPEN
              </motion.button>
            )}
          </div>

          {/* form slides out below */}
          <motion.div
            initial={false}
            animate={open ? { height: "auto", opacity: 1, marginTop: 24 } : { height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border border-gold/40 bg-warmwhite p-8 text-left shadow-lg">
              {sent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <p className="font-display text-2xl text-maroon">Thank you!</p>
                  <p className="font-body mt-2 text-sm text-maroon-dark/75">
                    Your response has been received. We can't wait to celebrate with you.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="font-label text-[0.65rem] tracking-[0.25em] text-gold-deep">
                      FULL NAME
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      placeholder="Your name"
                      className="font-body mt-2 w-full border-b border-maroon/30 bg-transparent py-2 text-maroon-dark outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="guests" className="font-label text-[0.65rem] tracking-[0.25em] text-gold-deep">
                        GUESTS
                      </label>
                      <input
                        id="guests"
                        name="guests"
                        type="number"
                        min={1}
                        max={6}
                        defaultValue={1}
                        className="font-body mt-2 w-full border-b border-maroon/30 bg-transparent py-2 text-maroon-dark outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="font-label text-[0.65rem] tracking-[0.25em] text-gold-deep">
                        PHONE
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                        placeholder="+91"
                        className="font-body mt-2 w-full border-b border-maroon/30 bg-transparent py-2 text-maroon-dark outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="font-label text-[0.65rem] tracking-[0.25em] text-gold-deep">
                      MESSAGE FOR THE COUPLE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Your blessings, in a few words"
                      className="font-body mt-2 w-full resize-none border-b border-maroon/30 bg-transparent py-2 text-maroon-dark outline-none focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-label w-full rounded-full bg-maroon py-3 text-xs tracking-[0.3em] text-warmwhite transition-transform hover:scale-[1.02]"
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
