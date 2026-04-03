"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const DISCORD_ID = "1384032725014548591"

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
)

type Props = {
  open: boolean
  onClose: () => void
}

export function ReportModal({ open, onClose }: Props) {
  const { items, total, clear } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  // Close on overlay click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (e.target === overlayRef.current) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  // Group by category
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? []
    acc[item.category].push(item)
    return acc
  }, {})

  const reportText = [
    "📋 DOPA - WORKS | Script Order",
    "─────────────────────────────",
    ...Object.entries(grouped).flatMap(([cat, scripts]) => [
      `\n[${cat}]`,
      ...scripts.map((s) => `  • ${s.name} — ${s.price}`),
    ]),
    "\n─────────────────────────────",
    `TOTAL: $${total}`,
    "\nContact: @strangepeoples on Discord",
  ].join("\n")

  function handleCopy() {
    navigator.clipboard.writeText(reportText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDiscord() {
    window.open(`https://discord.com/users/${DISCORD_ID}`, "_blank")
  }

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center px-4",
        "bg-background/80 backdrop-blur-sm",
        "transition-all duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden",
          "transition-all duration-300",
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="font-bold text-foreground">Order Summary</h3>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {items.length} script{items.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-border/50 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Script list */}
        <div className="max-h-64 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {Object.entries(grouped).map(([cat, scripts]) => (
            <div key={cat}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">{cat}</p>
              <div className="flex flex-col gap-1.5">
                {scripts.map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80">{s.name}</span>
                    <span className="font-mono text-sm font-semibold text-primary">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="font-mono text-xl font-bold text-primary">${total}</span>
        </div>

        {/* Instructions */}
        <div className="px-6 pb-2">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Copy the report and send it to <span className="text-foreground font-semibold">@strangepeoples</span> on Discord.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button
            onClick={handleCopy}
            className={cn(
              "flex-1 rounded-xl border py-3 text-sm font-semibold transition-all duration-200",
              copied
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border bg-transparent text-foreground hover:bg-border/30"
            )}
          >
            {copied ? "Copied!" : "Copy Report"}
          </button>
          <button
            onClick={handleDiscord}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-150 hover:scale-[1.02] active:scale-95"
            style={{ background: "#5865F2", boxShadow: "0 0 20px #5865F230" }}
          >
            <DiscordIcon className="h-4 w-4" />
            Open Discord
          </button>
        </div>
      </div>
    </div>
  )
}
