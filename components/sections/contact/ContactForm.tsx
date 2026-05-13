"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import GradientButton from "@/components/ui/GradientButton";

const socials = [
  { label: "GitHub", href: "https://github.com/MohamedAliBouzir", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamedali-bouzir/", icon: Linkedin },
  { label: "Email", href: "mailto:bzr.medali@gmail.com", icon: Mail },
];

export default function ContactForm() {
  const setCursorVariant = useUIStore((s) => s.setCursorVariant);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-start">
      {/* Left: info */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-8"
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Contact</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">
            Let&apos;s build something{" "}
            <span className="aurora-gradient-text">great together</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Have a project in mind or want to discuss an opportunity? I&apos;m available
            for freelance work and full-time positions. Let&apos;s talk.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="flex items-center gap-4 group cursor-none"
            >
              <div className="w-10 h-10 rounded-xl glass border border-border/50 group-hover:border-accent/40 flex items-center justify-center transition-colors duration-300">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Availability badge */}
        <div className="flex items-center gap-3 glass rounded-xl px-5 py-4 border border-aurora-emerald/20 w-fit">
          <span className="w-2.5 h-2.5 rounded-full bg-aurora-emerald animate-pulse flex-shrink-0" />
          <span className="text-sm text-muted-foreground">
            Available for new projects — <span className="text-foreground font-medium">let&apos;s connect</span>
          </span>
        </div>
      </motion.div>

      {/* Right: form */}
      <motion.form
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="glass rounded-xl px-4 py-3 text-sm border border-border/50 focus:border-accent/60 focus:outline-none transition-colors duration-300 bg-transparent placeholder:text-muted-foreground/40"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="glass rounded-xl px-4 py-3 text-sm border border-border/50 focus:border-accent/60 focus:outline-none transition-colors duration-300 bg-transparent placeholder:text-muted-foreground/40"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Subject
          </label>
          <input
            type="text"
            placeholder="Project inquiry / Collaboration / ..."
            className="glass rounded-xl px-4 py-3 text-sm border border-border/50 focus:border-accent/60 focus:outline-none transition-colors duration-300 bg-transparent placeholder:text-muted-foreground/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Message
          </label>
          <textarea
            required
            rows={5}
            placeholder="Tell me about your project..."
            className="glass rounded-xl px-4 py-3 text-sm border border-border/50 focus:border-accent/60 focus:outline-none transition-colors duration-300 bg-transparent placeholder:text-muted-foreground/40 resize-none"
          />
        </div>

        <GradientButton
          type="submit"
          disabled={sending || sent}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60 cursor-none"
        >
          {sent ? (
            "Message sent! ✓"
          ) : sending ? (
            "Sending..."
          ) : (
            <>
              Send message <Send className="w-4 h-4" />
            </>
          )}
        </GradientButton>
      </motion.form>
    </div>
  );
}
