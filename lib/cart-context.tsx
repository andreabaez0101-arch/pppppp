"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type CartItem = {
  id: string
  name: string
  price: string
  numericPrice: number
  category: string
}

type CartContextType = {
  items: CartItem[]
  toggle: (item: CartItem) => void
  isSelected: (id: string) => boolean
  total: number
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const toggle = useCallback((item: CartItem) => {
    setItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    )
  }, [])

  const isSelected = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  )

  const total = items.reduce((sum, i) => sum + i.numericPrice, 0)

  const clear = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{ items, toggle, isSelected, total, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
