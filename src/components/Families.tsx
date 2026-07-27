import { motion } from "framer-motion";
import ArchDivider from "./ArchDivider";

const families = [
  {
    side: "The Bride",
    name: "Mehta Family",
    parents: "Mr. Rajendra Mehta & Mrs. Kavita Mehta",
    members: ["Ishaani Mehta — Bride", "Rohan Mehta — Brother", "Meera Mehta — Sister-in-law"],
  },
  {
    side: "The Groom",
    name: "Rathore Family",
    parents: "Mr. Vikram Singh Rathore & Mrs. Sunita Rathore",
    members: ["Arjun Singh Rathore — Groom", "Diya Rathore — Sister", "Kunal Rathore — Cousin"],
  },
];

export default function Families() {
  return (
    <section id="families" className="relative bg-warmwhite py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <ArchDivider label="WITH LOVE AND BLESSINGS" />
          <h2 className="font-display mt-2 text-4xl text-maroon md:text-5xl">Two Families, United</h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {families.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative border border-gold/40 bg-ivory p-10 text-center shadow-[0_20px_50px_-25px_rgba(54,10,19,0.4)]"
            >
              {["-top-2 -left-2 border-t-2 border-l-2", "-top-2 -right-2 border-t-2 border-r-2", "-bottom-2 -left-2 border-b-2 border-l-2", "-bottom-2 -right-2 border-b-2 border-r-2"].map(
                (pos, idx) => (
                  <span key={idx} className={`absolute h-6 w-6 border-gold ${pos}`} />
                )
              )}

              <span className="font-label text-[0.65rem] tracking-[0.4em] text-gold-deep">{f.side.toUpperCase()}</span>
              <h3 className="font-display mt-3 text-3xl text-maroon md:text-4xl">{f.name}</h3>
              <div className="mx-auto my-4 h-px w-16 bg-gold" />
              <p className="font-body text-sm text-maroon-dark/70">{f.parents}</p>
              <ul className="font-body mt-5 space-y-1.5 text-sm text-maroon-dark/85">
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
