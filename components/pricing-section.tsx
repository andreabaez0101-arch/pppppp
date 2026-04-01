"use client"

import { useInView } from "@/hooks/use-in-view"
import { pricingCategories, type PricingItem } from "@/lib/pricing-data"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

export function PricingSection() {
  return (
    <section id="scripts" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeader />
        <div className="flex flex-col gap-10">
          {pricingCategories.map((cat, catIndex) => (
            <CategoryBlock key={cat.id} cat={cat} catIndex={catIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader() {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={cn(
        "mb-14 flex flex-col gap-2 transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <span className="font-mono text-xs text-primary uppercase tracking-widest">— Catalog</span>
      <h2 className="text-4xl font-bold text-foreground">All Scripts</h2>
      <p className="text-muted-foreground text-pretty">
        Click any script to select it. The total will update automatically.
      </p>
    </div>
  )
}

function CategoryBlock({
  cat,
  catIndex,
}: {
  cat: (typeof pricingCategories)[0]
  catIndex: number
}) {
  const { ref, inView } = useInView(0.05)

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${catIndex * 80}ms` }}
    >
      {/* Category header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          {cat.title}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Items */}
      <div className="grid gap-2 sm:grid-cols-2">
        {cat.items.map((item, i) => {
          // Only selectable if has a fixed price
          const selectable = !!item.price
          return (
            <ScriptRow
              key={i}
              item={item}
              categoryId={cat.id}
              categoryTitle={cat.title}
              rowIndex={i}
              delay={catIndex * 80 + i * 40}
              inView={inView}
              selectable={selectable}
            />
          )
        })}
      </div>
    </div>
  )
}

function ScriptRow({
  item,
  categoryId,
  categoryTitle,
  rowIndex,
  delay,
  inView,
  selectable,
}: {
  item: PricingItem
  categoryId: string
  categoryTitle: string
  rowIndex: number
  delay: number
  inView: boolean
  selectable: boolean
}) {
  const { toggle, isSelected } = useCart()
  const id = `${categoryId}-${rowIndex}`
  const selected = isSelected(id)

  const numericPrice = item.price ? parseInt(item.price.replace("$", ""), 10) : 0

  function handleClick() {
    if (!selectable) return
    toggle({
      id,
      name: item.name,
      price: item.price!,
      numericPrice,
      category: categoryTitle,
    })
  }

  return (
    <div
      onClick={handleClick}
      role={selectable ? "button" : undefined}
      aria-pressed={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : undefined}
      onKeyDown={(e) => {
        if (selectable && (e.key === "Enter" || e.key === " ")) handleClick()
      }}
      className={cn(
        "group flex items-center justify-between rounded-md border bg-card px-4 py-3",
        "transition-all duration-300",
        selectable && "cursor-pointer",
        selected
          ? "border-primary/60 bg-primary/8 shadow-[0_0_18px_oklch(0.72_0.22_195_/_0.12)]"
          : "border-border hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_18px_oklch(0.72_0.22_195_/_0.08)]",
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5">
        {/* Checkbox indicator */}
        {selectable ? (
          <span
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200",
              selected
                ? "border-primary bg-primary text-background"
                : "border-border group-hover:border-primary/50"
            )}
          >
            {selected && (
              <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        ) : (
          <span className="h-1 w-1 rounded-full bg-primary/40" />
        )}
        <span
          className={cn(
            "text-sm transition-colors duration-200",
            selected ? "text-foreground" : "text-foreground/75 group-hover:text-foreground"
          )}
        >
          {item.name}
        </span>
      </div>
      <span
        className={cn(
          "ml-4 shrink-0 font-mono text-sm font-semibold",
          selected ? "text-primary" : "text-primary/80"
        )}
      >
        {item.price ?? item.range}
      </span>
    </div>
  )
}
