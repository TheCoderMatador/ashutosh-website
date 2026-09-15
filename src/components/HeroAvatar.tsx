"use client";

import { motion } from "motion/react";

export default function HeroAvatar({
  isFirstVisit,
  reduced,
}: {
  isFirstVisit: boolean;
  reduced: boolean;
}) {
  const showBubble = isFirstVisit && !reduced;

  return (
    <div className="relative flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [8, 0, 0, -4],
            scale: [0.9, 1, 1, 1],
          }}
          transition={{ duration: 2.2, times: [0, 0.18, 0.7, 1], delay: 0.5 }}
          className="absolute -top-2 right-2 z-10 rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-2 text-base font-medium text-foreground shadow-lg sm:right-8 sm:text-lg"
        >
          Hi! 👋
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 240 240"
            className="h-52 w-52 sm:h-64 sm:w-64"
            role="img"
            aria-label="An illustrated avatar waving hello"
          >
            <defs>
              <radialGradient id="ak-head-grad" cx="35%" cy="28%" r="75%">
                <stop offset="0%" stopColor="var(--color-surface)" />
                <stop offset="100%" stopColor="var(--color-background)" />
              </radialGradient>
              <linearGradient id="ak-body-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            <ellipse cx="120" cy="224" rx="54" ry="9" fill="var(--color-border)" opacity="0.7" />

            <path d="M68 232c0-48 23-72 52-72s52 24 52 72Z" fill="url(#ak-body-grad)" />

            <circle
              cx="120"
              cy="106"
              r="58"
              fill="url(#ak-head-grad)"
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

            <motion.g
              style={{ transformOrigin: "164px 168px" }}
              animate={reduced ? {} : { rotate: [0, -30, 6, -24, 0] }}
              transition={{
                duration: 1.1,
                delay: 0.4,
                ease: "easeInOut",
                repeat: reduced ? 0 : isFirstVisit ? 1 : 0,
                repeatDelay: 0.35,
              }}
            >
              <path
                d="M164 168q19 -6 27 -32"
                stroke="var(--color-accent)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
