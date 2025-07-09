import React, { PropsWithChildren, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { LoadingIcon } from "./Icons"

/**
 * Modern animated button component với ripple effect và smooth transitions
 */
const Button: React.FC<
  PropsWithChildren<{
    children: any
    onClick?: () => void
    className?: string
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    loading?: boolean
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
    animated?: boolean
  }>
> = ({
  children,
  onClick,
  className,
  disabled,
  type,
  loading,
  variant = "primary",
  size = "md",
  animated = true,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([])

  // Ripple effect handler
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!animated || disabled || loading) return

    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const newRipple = { x, y, id: Date.now() }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) onClick()
  }

  // Variant styles
  const variantStyles = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl",
    secondary: "text-white shadow-md hover:shadow-lg",
    outline:
      "border-2 border-orange-500 text-orange-500  hover:text-orange-600  hover:text-orange-600 ",
    ghost: "text-orange-500 hover:bg-orange-50 hover:text-orange-600",
  }

  // Size styles
  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-[9px] px-6 text-base",
    lg: "py-3 px-8 text-lg",
  }

  const baseClasses = twMerge(`
    relative overflow-hidden rounded-[7px] font-semibold transition-all duration-300 
    flex items-center justify-center gap-2 cursor-pointer
    transform-gpu will-change-transform
    [-webkit-tap-highlight-color:transparent]
    ${animated ? "hover:scale-105 active:scale-95" : ""}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${
      disabled || loading
        ? "opacity-50 cursor-not-allowed transform-none hover:scale-100 hover:shadow-none"
        : "hover:shadow-lg active:shadow-md"
    }
    ${
      animated
        ? "transition-all duration-300 ease-out"
        : "transition-colors duration-200"
    }
    ${className ?? ""} 
  `)

  return (
    <button
      ref={buttonRef}
      type={type || "button"}
      className={baseClasses}
      onClick={createRipple}
      disabled={loading || disabled}
    >
      {/* Ripple effects */}
      {animated &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white bg-opacity-30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

      {/* Loading shimmer effect */}
      {loading && animated && (
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}

      {/* Button content */}
      <span
        className={`relative z-10 flex items-center gap-2 ${
          loading
            ? "animate-pulse"
            : animated
            ? "transition-transform duration-200"
            : ""
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <LoadingIcon />
            <span className="animate-pulse">Đang xử lý...</span>
          </div>
        ) : (
          children
        )}
      </span>

      {/* Glow effect for primary buttons */}
      {/* {animated && variant === "primary" && !disabled && !loading && (
        <div className="absolute inset-0 rounded-[7px] opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-400/20 via-orange-500/30 to-orange-600/20 blur-sm" />
      )} */}
    </button>
  )
}

export default Button
