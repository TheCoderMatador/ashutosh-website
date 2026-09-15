"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { selectedWork } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function SelectedWork() {
  return (
    <section id="work" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Selected Work" title="Projects" />

        <div className="flex flex-col">
          {selectedWork.map((project, i) => (
            <motion.a
              key={project.title + i}
              href={project.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col gap-3 border-t border-border py-8 transition-colors last:border-b hover:bg-surface sm:flex-row sm:items-center sm:gap-8 sm:px-4"
            >
              <span className="font-mono text-sm text-muted">
                {project.index}
              </span>

              <div className="flex-1">
                <h3 className="flex items-center gap-2 text-2xl tracking-tight sm:text-3xl">
                  {project.title}
                  <ArrowUpRight
                    size={20}
                    className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </h3>
                <p className="mt-2 max-w-xl text-muted">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
