export function Mark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" className="text-accent">
        <path d="M24 3 L30 18 L45 24 L30 30 L24 45 L18 30 L3 24 L18 18 Z" />
        <path d="M9.2 9.2 L24 15.3 L38.8 9.2 L32.7 24 L38.8 38.8 L24 32.7 L9.2 38.8 L15.3 24 Z" />
      </g>
      <path d="M17 30 v-6 a7 7 0 0 1 14 0 v6 z" fill="currentColor" className="text-accent-soft" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <Mark />
      <span className="leading-none">
        <span className="block font-display text-xl font-medium tracking-tight">Al-Makkawi</span>
        <span className="mt-1 block text-xs">Hajj, Umrah and tours</span>
      </span>
    </span>
  );
}
