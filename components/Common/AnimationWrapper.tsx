import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

/**
 * Animation wrapper component để dễ dàng thêm animations vào các component
 * Hỗ trợ intersection observer cho scroll animations
 */

interface AnimationWrapperProps {
  /** Animation type khi component xuất hiện */
  animation?: 
    | 'fade-in' 
    | 'slide-up' 
    | 'slide-down' 
    | 'slide-in-left' 
    | 'slide-in-right'
    | 'scale-in' 
    | 'bounce-in' 
    | 'rotate-in'
    | 'flip-in-x'
    | 'flip-in-y'
    | 'zoom-in'
    | 'elastic-in'
  /** Delay trước khi animation bắt đầu (ms) */
  delay?: number
  /** Duration của animation (ms) */
  duration?: number
  /** Có trigger animation khi scroll vào view hay không */
  triggerOnScroll?: boolean
  /** Threshold cho intersection observer (0-1) */
  threshold?: number
  /** Chỉ trigger animation một lần hay mỗi lần scroll vào view */
  once?: boolean
  /** Custom className */
  className?: string
  /** Có apply hover effects hay không */
  hover?: boolean
  /** Hover animation type */
  hoverAnimation?: 'scale' | 'lift' | 'glow' | 'bounce' | 'rotate'
}

const AnimationWrapper: React.FC<PropsWithChildren<AnimationWrapperProps>> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 500,
  triggerOnScroll = true,
  threshold = 0.1,
  once = true,
  className,
  hover = false,
  hoverAnimation = 'scale'
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(!triggerOnScroll)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (!triggerOnScroll) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            setHasTriggered(true)
            observer.unobserve(entry.target)
          }
        } else if (!once && !hasTriggered) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [triggerOnScroll, threshold, once, hasTriggered])

  // Animation classes mapping
  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in',
    'bounce-in': 'animate-bounce-in',
    'rotate-in': 'animate-rotate-in',
    'flip-in-x': 'animate-flip-in-x',
    'flip-in-y': 'animate-flip-in-y',
    'zoom-in': 'animate-zoom-in',
    'elastic-in': 'animate-elastic-in',
  }

  // Hover effect classes
  const hoverClasses = {
    scale: 'hover:scale-105',
    lift: 'hover:-translate-y-2 hover:shadow-lg',
    glow: 'hover:shadow-2xl hover:shadow-orange-500/25',
    bounce: 'hover:animate-bounce-subtle',
    rotate: 'hover:rotate-3'
  }

  const combinedClasses = twMerge(
    'transition-all duration-300 ease-out',
    isVisible ? animationClasses[animation] : 'opacity-0',
    hover ? hoverClasses[hoverAnimation] : '',
    className
  )

  const animationStyle = {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
    animationFillMode: 'both' as const
  }

  return (
    <div
      ref={elementRef}
      className={combinedClasses}
      style={isVisible ? animationStyle : undefined}
    >
      {children}
    </div>
  )
}

/**
 * Staggered animation wrapper cho danh sách items
 */
interface StaggerWrapperProps {
  /** Delay giữa các items (ms) */
  staggerDelay?: number
  /** Animation cho từng item */
  itemAnimation?: AnimationWrapperProps['animation']
  /** Custom className cho container */
  className?: string
}

export const StaggerWrapper: React.FC<PropsWithChildren<StaggerWrapperProps>> = ({
  children,
  staggerDelay = 100,
  itemAnimation = 'slide-up',
  className
}) => {
  return (
    <div className={twMerge('', className)}>
      {React.Children.map(children, (child, index) => (
        <AnimationWrapper
          animation={itemAnimation}
          delay={index * staggerDelay}
          triggerOnScroll={true}
          once={true}
        >
          {child}
        </AnimationWrapper>
      ))}
    </div>
  )
}

/**
 * Page transition wrapper
 */
interface PageTransitionProps {
  /** Page transition type */
  transition?: 'fade' | 'slide' | 'scale'
}

export const PageTransition: React.FC<PropsWithChildren<PageTransitionProps>> = ({
  children,
  transition = 'fade'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const transitionClasses = {
    fade: isLoaded ? 'animate-fade-in' : 'opacity-0',
    slide: isLoaded ? 'animate-slide-up' : 'opacity-0 translate-y-4',
    scale: isLoaded ? 'animate-scale-in' : 'opacity-0 scale-95'
  }

  return (
    <div className={twMerge('transition-all duration-500 ease-out', transitionClasses[transition])}>
      {children}
    </div>
  )
}

export default AnimationWrapper 