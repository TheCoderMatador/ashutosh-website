"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { site } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Portfolio message from ${name || "..."}`
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;

  return (
    <section id="contact" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Contact" title="Let's talk" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            action={mailtoHref}
            method="get"
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col gap-2 text-sm text-muted">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-md border border-border bg-transparent px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                placeholder="Your name"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-muted">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md border border-border bg-transparent px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                placeholder="you@example.com"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-muted">
              Message
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="resize-none rounded-md border border-border bg-transparent px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                placeholder="What's on your mind?"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
            >
              <Send size={16} />
              Send message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 text-xl tracking-tight transition-colors hover:text-accent"
            >
              <Mail size={20} className="text-muted group-hover:text-accent" />
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-xl tracking-tight transition-colors hover:text-accent"
            >
              <LinkedinIcon size={20} className="text-muted group-hover:text-accent" />
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-xl tracking-tight transition-colors hover:text-accent"
            >
              <GithubIcon size={20} className="text-muted group-hover:text-accent" />
              GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
