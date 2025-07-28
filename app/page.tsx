"use client"

import HomePage from "@/components/Screens/HomePage/HomePage"
import { useScrollToTop } from "@/hooks/useScrollToTop"

export default function Home() {
  useScrollToTop()
  
  return (
    <main>
      <HomePage />
    </main>
  )
}
