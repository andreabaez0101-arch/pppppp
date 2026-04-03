"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useInView } from "@/hooks/use-in-view"
import { scriptProducts, uiProducts, TAG_COLORS, TAG_TEXT, type ShopItem } from "@/lib/shop-data"
import { cn } from "@/lib/utils"

const TABS = [
  {
    id: "scripts",
    label: "Scripts",
    description: "Game systems, events, mechanics",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    items: scriptProducts,
  },
  {
    id: "ui",
    label: "UI & Interfaces",
    description: "ImGui menus, HUDs, phone apps, full interfaces",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    items: uiProducts,
  },
]

export function ShopSection() {
  const [activeTab, setActiveTab] = useState("scripts")
  const { ref: headerRef, inView: headerIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView(0.03)
  const tab = TABS.find((t) => t.id === activeTab)!
  const isUI = activeTab === "ui"

  return (
    <section id="scripts" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "mb-12 transition-all duration-700",
            headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">— Shop</span>
          <h2 className="mt-1 text-4xl font-bold text-foreground">What do you need?</h2>
          <p className="mt-2 text-muted-foreground text-pretty max-w-xl">
            Select any items and the total calculates automatically. Send the order to Discord when ready.
          </p>
        </div>

        {/* Tabs */}
        <div
          className={cn(
            "mb-8 flex gap-3 transition-all duration-700 delay-100",
            headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200",
                activeTab === t.id
                  ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_20px_oklch(0.72_0.22_195_/_0.12)]"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {t.icon}
              <span>{t.label}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                  activeTab === t.id ? "bg-primary/20 text-primary" : "bg-border text-muted-foreground"
                )}
              >
                {t.items.length}
              </span>
            </button>
          ))}
        </div>

        <p className="mb-6 font-mono text-xs text-muted-foreground uppercase tracking-widest">
          {tab.description}
        </p>

        {/* Grid — single observer on the wrapper */}
        <div
          ref={gridRef}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tab.items.map((item, i) => (
            <ProductCard
              key={item.id}
              item={item}
              index={i}
              gridVisible={gridIn}
              comingSoon={isUI}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  item,
  index,
  gridVisible,
  comingSoon,
}: {
  item: ShopItem
  index: number
  gridVisible: boolean
  comingSoon: boolean
}) {
  const { toggle, isSelected } = useCart()
  const selected = isSelected(item.id)
  const selectable = !!item.price && !comingSoon

  function handleAdd() {
    if (!selectable) return
    toggle({
      id: item.id,
      name: item.name,
      price: item.price!,
      numericPrice: item.numericPrice,
      category: "Order",
    })
  }

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-500",
        selected
          ? "border-primary/60 shadow-[0_0_28px_oklch(0.72_0.22_195_/_0.18)]"
          : "border-border hover:border-primary/30 hover:shadow-[0_0_20px_oklch(0.72_0.22_195_/_0.08)]",
        gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${(index % 9) * 50}ms`, willChange: "transform, opacity" }}
    >
      {/* Coming Soon overlay */}
      {comingSoon && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-background/70 backdrop-blur-[2px]">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-primary">
            Coming Soon
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">Available shortly</span>
        </div>
      )}

      {/* Preview image */}
      {item.preview && (
        <div className="relative h-36 w-full overflow-hidden border-b border-border/50">
          <Image
            src={item.preview}
            alt={`${item.name} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className={cn("flex flex-col gap-3 flex-1", item.preview ? "p-4" : "p-5")}>
        {/* Name + tag */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-foreground leading-tight">{item.name}</h3>
            {item.tag && (
              <span
                className="inline-block w-fit rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold"
                style={{
                  background: TAG_COLORS[item.tag] ?? "oklch(0.72 0.22 195 / 0.12)",
                  color: TAG_TEXT[item.tag] ?? "oklch(0.72 0.22 195)",
                }}
              >
                {item.tag}
              </span>
            )}
          </div>
          <span
            className="shrink-0 rounded-lg border border-border/50 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wide text-muted-foreground"
            title={item.encrypted ? "Encrypted — closed source" : "Open source"}
          >
            {item.encrypted ? "ENC" : "OPEN"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground flex-1">{item.description}</p>

        {/* Price + action */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <span className="font-mono text-lg font-bold text-primary">
            {item.price ?? item.range}
          </span>
          {selectable ? (
            <button
              onClick={handleAdd}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200",
                selected
                  ? "bg-primary/20 text-primary border border-primary/40 hover:bg-primary/10"
                  : "bg-primary text-background hover:brightness-110 active:scale-95"
              )}
            >
              {selected ? (
                <>
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Add
                </>
              )}
            </button>
          ) : comingSoon ? (
            <span className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground/40">
              Soon
            </span>
          ) : (
            <span className="rounded-xl border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground">
              Quote
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
