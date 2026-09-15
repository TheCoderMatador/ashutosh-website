"use client";

import { motion } from "motion/react";

export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12"
    >
      <p className="mb-2 text-sm uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
        {title}
      </h2>
    </motion.div>
  );
}
