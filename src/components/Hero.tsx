"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDown, Download } from "lucide-react";
import { site, heroWords } from "@/lib/content";
import HeroAvatar from "./HeroAvatar";
import { useFirstVisit } from "@/lib/useFirstVisit";

const NAME = site.name;

function NameReveal({
  baseDelay,
  reduced,
}: {
  baseDelay: number;
  reduced: boolean;
}) {
  const className =
    "font-serif text-[13vw] leading-[0.95] sm:text-[9vw] lg:text-[5.4rem] tracking-tight";

  if (reduced) {
    return <h1 className={className}>{NAME}</h1>;
  }

  let index = 0;

  return (
    <h1 aria-label={NAME} className={className}>
      {NAME.split(" ").map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((letter) => {
            const i = index++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: baseDelay + i * 0.03,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            );
          })}
          {w === 0 ? " " : null}
        </span>
      ))}
    </h1>
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroWords.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom min-w-[11ch]">
      {heroWords.map((word, i) => (
        <motion.span
          key={word}
          className="absolute inset-0 text-accent"
          initial={false}
          animate={
            i === index
              ? { y: 0, opacity: 1 }
              : { y: i < index ? "-100%" : "100%", opacity: 0 }
          }
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const visitStatus = useFirstVisit("ak-hero-seen");
  const prefersReducedMotion = !!useReducedMotion();
  const ready = visitStatus !== "loading";
  const isFirstVisit = visitStatus === "first";

  const nameDelay = prefersReducedMotion ? 0 : isFirstVisit ? 1.3 : 0.3;
  const afterNameDelay = nameDelay + (prefersReducedMotion ? 0.2 : 0.9);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="w-full lg:max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: Math.max(nameDelay - 0.3, 0.1), duration: 0.5 }}
            className="mb-4 text-sm uppercase tracking-[0.2em] text-muted"
          >
            Hello, I&apos;m
          </motion.p>

          {ready && <NameReveal baseDelay={nameDelay} reduced={prefersReducedMotion} />}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: afterNameDelay, duration: 0.6 }}
            className="mt-6 text-2xl sm:text-3xl tracking-tight text-muted"
          >
            <RoleCycler />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: afterNameDelay + 0.2, duration: 0.6 }}
            className="mt-8 max-w-xl text-lg text-muted"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: afterNameDelay + 0.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              Explore my work
            </a>
            <a
              href={site.resumeUrl}
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
            >
              <Download size={16} />
              Download résumé
            </a>
          </motion.div>
        </div>

        <div className="shrink-0">
          {ready && (
            <HeroAvatar isFirstVisit={isFirstVisit} reduced={prefersReducedMotion} />
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: afterNameDelay + 0.9, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
