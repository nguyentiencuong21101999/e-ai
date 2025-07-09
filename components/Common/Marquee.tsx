"use client"

import React, { ReactNode } from "react"

interface MarqueeProps {
  /**
   * Child elements to be scrolled in the marquee
   */
  children: ReactNode
  /**
   * Speed of the marquee animation (slow, normal, fast)
   */
  speed?: "slow" | "normal" | "fast"
  /**
   * Direction of the marquee (left or right)
   */
  direction?: "left" | "right"
  /**
   * Whether to pause animation on hover
   */
  pauseOnHover?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Number of duplicates for seamless loop
   */
  duplicates?: number
}

/**
 * Custom Marquee component with Tailwind CSS animations
 * Provides smooth scrolling animation with responsive design
 */
const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className = "",
  duplicates = 2,
}) => {
  // Animation duration based on speed
  const getAnimationDuration = () => {
    switch (speed) {
      case "slow":
        return "animate-marquee-slow"
      case "fast":
        return "animate-marquee-fast"
      default:
        return "animate-marquee"
    }
  }

  // Animation direction
  const getAnimationDirection = () => {
    return direction === "right" ? "animate-marquee-reverse" : getAnimationDuration()
  }

  // Hover pause class
  const hoverClass = pauseOnHover ? "hover:[animation-play-state:paused]" : ""

  // Create duplicated content for seamless loop
  const duplicatedContent = Array.from({ length: duplicates }, (_, index) => (
    <div key={index} className="flex shrink-0">
      {children}
    </div>
  ))

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex w-fit ${getAnimationDirection()} ${hoverClass}`}
        style={{
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
        }}
      >
        {duplicatedContent}
      </div>
    </div>
  )
}

export default Marquee 