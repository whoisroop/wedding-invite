import { motion } from "framer-motion";

interface DividerProps {
  label?: string;
  light?: boolean;
  className?: string;
}

export default function Divider({ label, light = false, className = "" }: DividerProps) {
  const barColor = light ? "bg-gold/40" : "bg-gold";
  const textColor = light ? "text-gold-light" : "text-gold";

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex items-center gap-4 w-full max-w-xs">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`h-px flex-1 origin-left ${barColor}`}
        />
        <svg width="12" height="12" viewBox="0 0 12 12" className="shrink-0" aria-hidden="true">
          <circle cx="6" cy="6" r="1.5" fill={light ? "#E0BE4F" : "#C9A227"} opacity="0.7" />
          <circle cx="6" cy="6" r="5" fill="none" stroke={light ? "#E0BE4F" : "#C9A227"} strokeWidth="0.5" opacity="0.4" />
        </svg>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`h-px flex-1 origin-right ${barColor}`}
        />
      </div>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`font-label text-[0.6rem] tracking-[0.45em] ${textColor}`}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
