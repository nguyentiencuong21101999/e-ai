"use client"

import { pathNamePrevent } from "@/config/constants"
import { usePathname } from "next/navigation"
import "react-loading-skeleton/dist/skeleton.css"
import ClientOnly from "./ClientOnly"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPathNamePrevent = pathNamePrevent.findIndex((val) => val === pathname)
  return (
    <>
      <ClientOnly>
        {isPathNamePrevent === -1 ? (
          <div className="w-full min-h-screen">
            <div className="w-full flex justify-center">
              <div className="w-full grid justify-items-center items-center flex-1">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </div>
        ) : (
          <> {children}</>
          // <div className="w-full min-h-screen">
          //   <div className="w-full flex justify-center">
          //     <div className="w-full max-w-[1140px] grid justify-items-center items-center flex-1">
          //       <Header />
          //       {children}
          //       <Footer />
          //     </div>
          //   </div>
          // </div>
        )}
      </ClientOnly>
    </>
  )
}
