"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const DISCORD_ID = "1384032725014548591"
const AVATAR_URL = "https://cdn.discordapp.com/avatars/1384032725014548591/7cd39def3b965fb341902ed593e0e54b.png?size=256"
const BANNER_URL = "https://cdn.discordapp.com/banners/1384032725014548591/31bf8f10a891c61166f0cc54f115d5bd.png?size=512"

export function ProfileWidget() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-700",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* Expanded card */}
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto w-64"
            : "opacity-0 scale-90 pointer-events-none w-64"
        )}
        style={{ boxShadow: open ? "0 0 60px oklch(0.72 0.22 195 / 0.12)" : "none" }}
      >
        {/* Banner */}
        <div className="relative h-20 w-full overflow-hidden">
          <Image
            src={BANNER_URL}
            alt="DOPA banner"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60" />
        </div>

        {/* Avatar overlapping banner */}
        <div className="relative px-4 pb-4">
          <div className="absolute -top-7 left-4">
            <div className="rounded-xl overflow-hidden border-2 border-card h-14 w-14">
              <Image
                src={AVATAR_URL}
                alt="DOPA avatar"
                width={56}
                height={56}
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div className="pt-9 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-foreground text-sm">DOPA</span>
              <span className="text-muted-foreground/60 text-sm">— Heart</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">@strangepeoples</span>
          </div>

          <a
            href={`https://discord.com/users/${DISCORD_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full rounded-lg py-2 text-xs font-semibold text-white transition-all hover:brightness-110"
            style={{ background: "#5865F2" }}
          >
            <DiscordIcon className="h-3.5 w-3.5" />
            Message on Discord
          </a>
        </div>
      </div>

      {/* Avatar button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle profile"
        className={cn(
          "group relative h-12 w-12 rounded-xl overflow-hidden border-2 transition-all duration-200",
          "hover:scale-110 active:scale-95",
          open ? "border-primary shadow-[0_0_20px_oklch(0.72_0.22_195_/_0.35)]" : "border-border hover:border-primary/50"
        )}
      >
        <Image
          src={AVATAR_URL}
          alt="DOPA"
          width={48}
          height={48}
          className="object-cover"
          unoptimized
        />
        {/* Online dot */}
        <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-green-500" />
      </button>
    </div>
  )
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  )
}
