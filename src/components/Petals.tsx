import { useMemo } from "react";

interface PetalsProps {
  count?: number;
  className?: string;
  variant?: "pink" | "gold";
}

export default function Petals({ count = 14, className = "", variant = "pink" }: PetalsProps) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 9 + Math.random() * 8,
        size: 10 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 220,
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          <svg viewBox="0 0 32 32" style={{ transform: `rotate(${p.rotate}deg)` }}>
            {variant === "pink" ? (
              <path
                d="M16 2C20 8 30 10 30 17C30 24 23 30 16 30C9 30 2 24 2 17C2 10 12 8 16 2Z"
                fill="#e6a3c2"
                opacity="0.85"
              />
            ) : (
              <path
                d="M16 3C19 9 27 12 27 18C27 24 22 29 16 29C10 29 5 24 5 18C5 12 13 9 16 3Z"
                fill="#c8992c"
                opacity="0.8"
              />
            )}
          </svg>
        </span>
      ))}
    </div>
  );
}
