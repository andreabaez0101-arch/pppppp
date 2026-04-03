"use client"

import { useEffect, useRef, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

const DISCORD_ID = "1384032725014548591"

const PAYMENT_METHODS = [
  { id: "cashapp",  label: "Cash App",                icon: "💵" },
  { id: "zelle",    label: "Zelle",                   icon: "🏦" },
  { id: "crypto",   label: "Crypto (ETH / USDT / LTC)", icon: "₿" },
]

const DISCOUNT_CODES: Record<string, number> = {
  DOPA10: 10,
  WORKS20: 20,
}

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
)

type Step = "cart" | "payment"

type Props = { open: boolean; onClose: () => void }

export function CheckoutModal({ open, onClose }: Props) {
  const { items, total, toggle, clear } = useCart()
  const overlayRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<Step>("cart")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(0)
  const [discountError, setDiscountError] = useState("")
  const [discountLabel, setDiscountLabel] = useState("")

  const discountedTotal = Math.max(0, total - discountApplied)

  useEffect(() => {
    if (open) {
      setStep("cart")
      setPaymentMethod("")
      setDiscountCode("")
      setDiscountApplied(0)
      setDiscountError("")
      setDiscountLabel("")
    }
  }, [open])

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (e.target === overlayRef.current) onClose() }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  function applyDiscount() {
    const code = discountCode.trim().toUpperCase()
    if (DISCOUNT_CODES[code]) {
      setDiscountApplied(DISCOUNT_CODES[code])
      setDiscountLabel(code)
      setDiscountError("")
    } else {
      setDiscountError("Invalid code.")
      setDiscountApplied(0)
      setDiscountLabel("")
    }
  }

  function handleConfirmPayment() {
    window.open(`https://discord.com/users/${DISCORD_ID}`, "_blank")
    clear()
    onClose()
  }

  const stepLabels: { id: Step; label: string }[] = [
    { id: "cart", label: "1. Cart" },
    { id: "payment", label: "2. Payment" },
  ]

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center px-4",
        "bg-background/80 backdrop-blur-sm transition-all duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl overflow-hidden",
          "transition-all duration-300",
          open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}
      >
        {/* Step indicator */}
        <div className="flex items-center border-b border-border">
          {stepLabels.map(({ id, label }) => (
            <div
              key={id}
              className={cn(
                "flex-1 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 border-b-2",
                step === id
                  ? "text-primary border-primary"
                  : id === "payment" && step === "payment"
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent"
              )}
            >
              {label}
            </div>
          ))}
          <button
            onClick={onClose}
            className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── STEP 1: CART ── */}
        {step === "cart" && (
          <div className="flex flex-col">
            {/* Items */}
            <div className="flex flex-col gap-2 px-5 pt-5 max-h-56 overflow-y-auto">
              {items.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-primary">{item.price}</span>
                      <button
                        onClick={() => toggle(item)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-red-500/40 hover:text-red-400 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M2 6h8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Discount code */}
            <div className="px-5 pt-4">
              <div className="rounded-xl border border-border bg-background/40 px-4 py-3">
                <div className="flex items-center gap-2 mb-2.5">
                  <svg className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><circle cx="7" cy="7" r="1" />
                  </svg>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Discount Code</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => { setDiscountCode(e.target.value); setDiscountError("") }}
                    onKeyDown={(e) => { if (e.key === "Enter") applyDiscount() }}
                    placeholder="e.g. DOPA10"
                    className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
                  />
                  <button
                    onClick={applyDiscount}
                    className="rounded-lg border border-border px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountError && <p className="mt-1.5 text-[11px] text-red-400">{discountError}</p>}
              </div>
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-1.5 px-5 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono text-foreground">${total}.00 US$</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className={cn("font-mono", discountApplied > 0 ? "text-primary" : "text-muted-foreground")}>
                  {discountApplied > 0 ? `-$${discountApplied}.00 US$` : "0.00 US$"}
                </span>
              </div>
              <div className="mt-1 flex justify-between border-t border-border pt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-mono text-lg font-bold text-primary">${discountedTotal}.00 US$</span>
              </div>
            </div>

            {/* CTA */}
            <div className="p-5 pt-4">
              <button
                onClick={() => setStep("payment")}
                disabled={items.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-background transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "oklch(0.72 0.22 195)" }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" />
                </svg>
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: PAYMENT ── */}
        {step === "payment" && (
          <div className="flex flex-col">
            <div className="px-6 pt-5 pb-4">
              <h3 className="text-base font-bold text-foreground">Select Payment Method</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                After confirming, you&apos;ll be redirected to Discord to send your order to{" "}
                <span className="font-semibold text-foreground">@strangepeoples</span>.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 px-6">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border px-5 py-3.5 text-left transition-all duration-200",
                    paymentMethod === method.id
                      ? "border-primary/60 bg-primary/8 shadow-[0_0_18px_oklch(0.72_0.22_195_/_0.12)]"
                      : "border-border bg-background/40 hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{method.icon}</span>
                    <span className={cn("text-sm font-semibold", paymentMethod === method.id ? "text-foreground" : "text-muted-foreground")}>
                      {method.label}
                    </span>
                  </div>
                  <span className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-200",
                    paymentMethod === method.id ? "border-primary bg-primary" : "border-border"
                  )}>
                    {paymentMethod === method.id && (
                      <svg className="h-2.5 w-2.5 text-background" viewBox="0 0 12 12" fill="none">
                        <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Total summary */}
            <div className="mx-6 mt-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 px-5 py-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Total</p>
                <p className="font-mono text-xl font-bold text-primary">${discountedTotal}.00 US$</p>
              </div>
              {paymentMethod && (
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Via</p>
                  <p className="text-sm font-semibold text-foreground">
                    {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 pt-4">
              <button
                onClick={() => setStep("cart")}
                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={!paymentMethod}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: paymentMethod ? "#5865F2" : undefined, boxShadow: paymentMethod ? "0 0 20px #5865F230" : undefined }}
              >
                <DiscordIcon className="h-4 w-4" />
                Open Discord & Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
