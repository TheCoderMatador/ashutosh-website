"use client";

import { motion } from "motion/react";
import { Download, FileText } from "lucide-react";
import { site } from "@/lib/content";

export default function Resume() {
  return (
    <section id="resume" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-8 rounded-lg border border-border px-8 py-12 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-accent">
              Résumé
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              Want the full story on paper?
            </h2>
          </div>

          <div className="flex shrink-0 flex-wrap gap-4">
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
            >
              <FileText size={16} />
              View résumé
            </a>
            <a
              href={site.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
