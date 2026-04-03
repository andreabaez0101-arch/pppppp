"use client"

import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const BUYERS = [
  { name: "velasquezCzx",    avatar: "https://cdn.pfps.gg/pfps/11378-hiromi-higuruma.png", item: "HUD Pack Premium",           amount: 45,  date: "2d ago" },
  { name: "xShadowRogue",    avatar: "https://cdn.pfps.gg/pfps/96107-angel.jpeg",          item: "Drug System v2",             amount: 30,  date: "3d ago" },
  { name: "d34thbydesign",   avatar: "https://cdn.pfps.gg/pfps/54774-sexy-death.gif",      item: "Custom Script (Full)",       amount: 120, date: "4d ago" },
  { name: "mikuonthesticks", avatar: "https://cdn.pfps.gg/pfps/48054-black-miku.jpeg",     item: "Inventory UI Redesign",      amount: 55,  date: "5d ago" },
  { name: "latinavibes__",   avatar: "https://cdn.pfps.gg/pfps/35120-latina-baddie.png",   item: "Police MDT Script",          amount: 40,  date: "6d ago" },
  { name: "sk3l3.ton",       avatar: "https://cdn.pfps.gg/pfps/48164-skeleton.jpeg",       item: "Gang Territory System",      amount: 35,  date: "1w ago" },
  { name: "fvck_yxu",        avatar: "https://cdn.pfps.gg/pfps/16261-white-boy-fuck-you.gif", item: "Vehicle Boost Script",    amount: 25,  date: "1w ago" },
  { name: "koochy.wav",      avatar: "https://cdn.pfps.gg/pfps/26098-koochy.png",          item: "Mechanic Job Overhaul",      amount: 50,  date: "1w ago" },
  { name: "coolcatszn",      avatar: "https://cdn.pfps.gg/pfps/99043-cool-cat-with-sunglasses.jpeg", item: "Robbery Script",  amount: 30,  date: "2w ago" },
  { name: "izumiRP",         avatar: "https://cdn.pfps.gg/pfps/47257-izumi-shinomura.png", item: "Custom UI (Full)",           amount: 95,  date: "2w ago" },
  { name: "sasor1.exe",      avatar: "https://cdn.pfps.gg/pfps/4874-sasori.png",           item: "Drug System v2",             amount: 30,  date: "2w ago" },
  { name: "eazytype",        avatar: "https://cdn.pfps.gg/pfps/89302-eazy-e.png",          item: "HUD Pack Basic",             amount: 20,  date: "3w ago" },
  { name: "alx.dev",         avatar: "https://cdn.pfps.gg/pfps/36802-alx.gif",             item: "Fix & Optimize (Full)",      amount: 40,  date: "3w ago" },
  { name: "egirlenjoyer",    avatar: "https://cdn.pfps.gg/pfps/7654-egirl-one.jpeg",       item: "Inventory UI Redesign",      amount: 55,  date: "3w ago" },
]

const STATUS_COLORS: Record<number, string> = {
  0: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  1: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  2: "text-primary bg-primary/10 border-primary/20",
  3: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
}

export function BuyersTable() {
  const { ref, inView } = useInView()

  return (
    <section id="buyers" className="py-20 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            "mb-10 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">Recent Buyers</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <p className="text-center text-sm text-muted-foreground">Real clients. Real work. Delivered.</p>
        </div>

        {/* Table */}
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 delay-100",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Table header */}
          <div className="grid grid-cols-[2fr_3fr_1fr_1fr] gap-4 border-b border-border px-5 py-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">User</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Script / Service</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Paid</span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">When</span>
          </div>

          {/* Rows */}
          {BUYERS.map((b, i) => (
            <div
              key={b.name}
              className={cn(
                "grid grid-cols-[2fr_3fr_1fr_1fr] gap-4 items-center px-5 py-3.5 transition-all duration-500 border-b border-border/50 last:border-0 hover:bg-white/[0.02]",
                inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{ transitionDelay: inView ? `${120 + i * 40}ms` : "0ms" }}
            >
              {/* User */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image src={b.avatar} alt={b.name} fill unoptimized className="object-cover" />
                </div>
                <span className="truncate text-sm font-medium text-foreground">{b.name}</span>
              </div>

              {/* Item */}
              <span className="truncate text-sm text-muted-foreground">{b.item}</span>

              {/* Amount */}
              <span className="text-right font-mono text-sm font-bold text-primary">${b.amount}</span>

              {/* Date */}
              <span className="text-right font-mono text-xs text-muted-foreground">{b.date}</span>
            </div>
          ))}

          {/* Footer total */}
          <div className="flex items-center justify-between border-t border-border bg-white/[0.015] px-5 py-3">
            <span className="font-mono text-xs text-muted-foreground">{BUYERS.length} transactions</span>
            <span className="font-mono text-sm font-bold text-primary">
              Total ${BUYERS.reduce((s, b) => s + b.amount, 0)}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
