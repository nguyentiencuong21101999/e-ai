"use client"

import Cart from "@/components/Screens/Cart/Cart"
import { useScrollToTop } from "@/hooks/useScrollToTop"

/**
 * Cart page component
 * Route: /cart
 */
export default function CartPage() {
  useScrollToTop()
  
  return (
    <main className="w-full">
      <Cart />
    </main>
  )
}
