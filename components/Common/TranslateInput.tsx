import React, { useEffect, useRef, useState } from "react"

interface TranslateInputProps {
  children: React.ReactNode
  className?: string
  containerRef?: React.RefObject<HTMLElement>
  offset?: number // Offset from bottom in pixels
}

const TranslateInput: React.FC<TranslateInputProps> = ({
  children,
  className = "",
  containerRef: externalContainerRef,
  offset = 40,
}) => {
  // State for fixed position behavior
  const [isFixed, setIsFixed] = useState(true)

  // Internal refs
  const defaultContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  // Use external ref if provided, otherwise use internal ref
  const containerRef = externalContainerRef || defaultContainerRef

  // Effect to handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !inputRef.current) return

      const container = containerRef.current
      const input = inputRef.current

      // Get container's bottom position relative to viewport
      const containerRect = container.getBoundingClientRect()

      // Use input height for calculation
      const inputHeight = input.offsetHeight

      // Calculate if we should show fixed input
      // Fixed when there's still content below the fold that needs input access
      const distanceToBottom = containerRect.bottom - window.innerHeight
      const shouldBeFixed = distanceToBottom > inputHeight - offset

      setIsFixed(shouldBeFixed)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll)
    // Also check on resize
    window.addEventListener("resize", handleScroll)

    // Initial check with small delay to ensure DOM is ready
    setTimeout(handleScroll, 200)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [containerRef, offset])

  return (
    <>
      {/* Container div if using internal ref */}
      {!externalContainerRef && (
        <div ref={defaultContainerRef} className="pb-32 lg:pb-6">
          {children}
        </div>
      )}

      {/* Fixed Input */}
      <div
        ref={inputRef}
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-500 ease-out ${
          isFixed
            ? "opacity-100 translate-y-0 scale-100 visible "
            : "opacity-0 translate-y-full scale-95 invisible"
        } ${className}`}
        style={{
          transitionProperty: "opacity, transform",
          transitionDelay: isFixed ? "50ms" : "0ms",
        }}
      >
        <div
          className={`mx-auto px-4 py-4 transition-all duration-300 delay-100 ${
            isFixed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default TranslateInput 