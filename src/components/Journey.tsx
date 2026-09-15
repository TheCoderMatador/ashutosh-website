"use client";

import { motion } from "motion/react";
import { journey } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Journey" title="How it's gone so far" />

        <div className="relative border-l border-border pl-8 sm:pl-12">
          {journey.map((entry, i) => (
            <motion.div
              key={entry.org + entry.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pb-16 last:pb-0"
            >
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[calc(3rem+5px)]" />

              <p className="font-mono text-sm text-accent">{entry.year}</p>
              <h3 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
                {entry.org}
              </h3>
              <p className="mt-1 text-lg text-muted">{entry.role}</p>
              <p className="mt-3 max-w-xl text-foreground/80">
                {entry.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
