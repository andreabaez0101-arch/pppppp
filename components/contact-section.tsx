"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const DISCORD_USER = "strangepeoples"
const DISCORD_ID = "1384032725014548591"

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
)

export function ContactSection() {
  const { ref: headRef, inView: headIn } = useInView()
  const { ref: cardRef, inView: cardIn } = useInView()
  const { ref: tagsRef, inView: tagsIn } = useInView()

  return (
    <section id="contact" className="border-t border-border py-32 px-4">
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center gap-10">
        {/* Header */}
        <div
          ref={headRef}
          className={cn(
            "flex flex-col gap-2 transition-all duration-700",
            headIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">— Contact</span>
          <h2 className="text-4xl font-bold text-foreground text-balance">
            Ready to build something great?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-pretty leading-relaxed">
            Hit me up on Discord. I&apos;ll get back to you fast. Tell me what you need and let&apos;s get started.
          </p>
        </div>

        {/* Discord card */}
        <div
          ref={cardRef}
          className={cn(
            "w-full max-w-sm rounded-2xl border border-border bg-card overflow-hidden",
            "transition-all duration-700 hover:border-primary/20",
            "hover:shadow-[0_0_60px_oklch(0.72_0.22_195_/_0.08)]",
            cardIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Card top band */}
          <div
            className="h-1 w-full"
            style={{ background: "oklch(0.72 0.22 195)" }}
          />

          <div className="p-6 flex flex-col gap-5">
            {/* Identity row */}
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "oklch(0.45 0.2 270 / 0.15)", border: "1px solid oklch(0.45 0.2 270 / 0.25)" }}
              >
                <DiscordIcon className="h-5 w-5 text-[#5865F2]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-base font-bold text-foreground">{DISCORD_USER}</span>
                <span className="font-mono text-xs text-muted-foreground">@{DISCORD_USER} · Discord</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://discord.com/users/${DISCORD_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background: "#5865F2",
                boxShadow: "0 0 24px #5865F240",
              }}
            >
              <DiscordIcon className="h-4 w-4 text-white" />
              Message on Discord
            </a>
          </div>
        </div>

        {/* Tags */}
        <div
          ref={tagsRef}
          className={cn(
            "flex flex-wrap justify-center gap-2.5 transition-all duration-700",
            tagsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          {["High Quality", "Optimized", "Clean Code", "Fast Delivery", "FiveM Expert"].map((tag, i) => (
            <span
              key={tag}
              className={cn(
                "rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground",
                "transition-all duration-500",
                tagsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={{ transitionDelay: `${200 + i * 60}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
