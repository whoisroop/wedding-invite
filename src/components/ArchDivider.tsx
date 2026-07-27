import { motion } from "framer-motion";

interface ArchDividerProps {
  label?: string;
  flip?: boolean;
  tone?: "gold" | "ivory";
  className?: string;
}

// The recurring "threshold" motif: a jharokha-style scalloped archway that
// draws itself in gold whenever a new chapter of the tour comes into view —
// the visual rhyme for "passing through another doorway of the palace".
export default function ArchDivider({ label, flip = false, tone = "gold", className = "" }: ArchDividerProps) {
  const stroke = tone === "gold" ? "#c8992c" : "#f8f1e2";

  return (
    <div className={`relative flex w-full flex-col items-center ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 480 90"
        className="h-16 w-full max-w-xl md:h-20"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M4 88 C4 40 40 30 40 30 C40 12 60 4 80 14 C90 4 110 4 120 14 C130 4 150 4 160 14
             C170 4 190 4 200 14 C210 2 230 -4 240 14 C250 -4 270 2 280 14
             C290 4 310 4 320 14 C330 4 350 4 360 14 C370 4 390 12 400 14
             C400 30 440 12 440 30 C440 30 476 40 476 88"
          stroke={stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="240"
          cy="20"
          r="3"
          fill={stroke}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.5 }}
        />
      </svg>
      {label && (
        <span
          className={`font-label -mt-2 text-[0.65rem] tracking-[0.45em] text-gold-deep md:text-xs ${flip ? "rotate-180" : ""}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
