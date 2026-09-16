export function AvatarFallback() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-full w-full"
      role="img"
      aria-label="Illustrated avatar waving hello"
    >
      <defs>
        <radialGradient id="ak-fb-head" cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="var(--color-surface)" />
          <stop offset="100%" stopColor="var(--color-background)" />
        </radialGradient>
        <linearGradient id="ak-fb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="224" rx="54" ry="9" fill="var(--color-border)" opacity="0.7" />
      <path d="M68 232c0-48 23-72 52-72s52 24 52 72Z" fill="url(#ak-fb-body)" />
      <circle
        cx="120"
        cy="106"
        r="58"
        fill="url(#ak-fb-head)"
        stroke="var(--color-border)"
        strokeWidth="2"
      />
      <circle cx="99" cy="102" r="5" fill="var(--color-foreground)" />
      <circle cx="141" cy="102" r="5" fill="var(--color-foreground)" />
      <path
        d="M100 126q20 14 40 0"
        stroke="var(--color-foreground)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M76 174q-15 6 -19 26"
        stroke="var(--color-accent)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M164 168q19 -6 27 -32"
        stroke="var(--color-accent)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
