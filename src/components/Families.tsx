import { motion } from "framer-motion";
import Divider from "./Divider";

const families = [
  {
    side: "The Groom",
    name: "Family of Roop",
    parents: "Mr. & Mrs. Lala",
    members: ["Abhijit — Father", "Ruby — Mother", "Neha — Sister", "Son of Ruby Lala"],
  },
  {
    side: "The Bride",
    name: "Family of Dhvani",
    parents: "Mr. & Mrs. Shah",
    members: ["Atul — Father", "Sonal — Mother", "Manan — Brother", "Daughter of Reena Shah"],
  },
];

export default function Families() {
  return (
    <section id="families" className="relative bg-emerald py-24 md:py-32">
      <div className="linen-texture absolute inset-0 opacity-10" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Divider label="WITH LOVE AND BLESSINGS" light />
          <h2 className="font-display mt-6 text-4xl text-warmwhite md:text-5xl">Two Families, One Celebration</h2>
          <p className="font-body mx-auto mt-4 max-w-xl text-lg text-warmwhite/70 md:text-xl">
            Bound by love, united in joy — surrounded by those who matter most.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {families.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative border border-gold/25 bg-warmwhite p-10 text-center shadow-lg"
            >
              {["-top-2 -left-2 border-t-2 border-l-2", "-top-2 -right-2 border-t-2 border-r-2", "-bottom-2 -left-2 border-b-2 border-l-2", "-bottom-2 -right-2 border-b-2 border-r-2"].map(
                (pos, idx) => (
                  <span key={idx} className={`absolute h-5 w-5 border-gold/50 ${pos}`} />
                )
              )}

              <span className="font-label text-[0.6rem] tracking-[0.4em] text-gold">{f.side.toUpperCase()}</span>
              <h3 className="font-display mt-3 text-3xl text-charcoal md:text-4xl">{f.name}</h3>
              <div className="mx-auto my-4 h-px w-12 bg-gold/40" />
              <p className="font-body text-base text-charcoal-light/70">{f.parents}</p>
              <ul className="font-body mt-5 space-y-1.5 text-base text-charcoal/85">
                {f.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
