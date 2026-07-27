import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#story", label: "Story" },
  { href: "#events", label: "Celebrations" },
  { href: "#families", label: "Families" },
  { href: "#gallery", label: "Gallery" },
  { href: "#venue", label: "Venue" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 1 }}
      className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-maroon-dark/85 via-maroon-dark/50 to-transparent"
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" className="font-script text-2xl text-warmwhite drop-shadow-md md:text-3xl">
          I &amp; A
        </a>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-label text-[0.65rem] tracking-[0.25em] text-warmwhite/80 transition-colors hover:text-gold-light"
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-gold-light transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-gold-light transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-gold-light transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-maroon-dark/95 md:hidden"
          >
            <div className="flex flex-col items-center gap-5 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-label text-xs tracking-[0.3em] text-warmwhite/85 hover:text-gold-light"
                >
                  {l.label.toUpperCase()}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
