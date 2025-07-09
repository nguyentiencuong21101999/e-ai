import React from "react"
import { twMerge } from "tailwind-merge"

/**
 * Modern loading component với skeleton animations
 */

interface LoadingProps {
  /** Loại loading animation */
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton' | 'wave' | 'bounce'
  /** Kích thước */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Màu sắc chủ đề */
  color?: 'orange' | 'blue' | 'gray' | 'green'
  /** Custom className */
  className?: string
  /** Text hiển thị */
  text?: string
}

const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  color = 'orange',
  className,
  text
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    orange: 'text-orange-500 border-orange-500',
    blue: 'text-blue-500 border-blue-500',
    gray: 'text-gray-500 border-gray-500',
    green: 'text-green-500 border-green-500'
  }

  const renderLoading = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className={twMerge(
              'border-4 border-t-transparent rounded-full animate-spin',
              sizeClasses[size],
              colorClasses[color]
            )} />
            {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
          </div>
        )

      case 'dots':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex space-x-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={twMerge(
                    'rounded-full animate-bounce',
                    size === 'sm' ? 'w-2 h-2' : 
                    size === 'md' ? 'w-3 h-3' :
                    size === 'lg' ? 'w-4 h-4' : 'w-5 h-5',
                    colorClasses[color].split(' ')[0]
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
            {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
          </div>
        )

      case 'pulse':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className={twMerge(
              'rounded-full animate-pulse',
              sizeClasses[size],
              colorClasses[color].split(' ')[0].replace('text-', 'bg-')
            )} />
            {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
          </div>
        )

      case 'wave':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={twMerge(
                    'rounded-sm animate-wave',
                    size === 'sm' ? 'w-1 h-4' :
                    size === 'md' ? 'w-1 h-6' :
                    size === 'lg' ? 'w-2 h-8' : 'w-2 h-10',
                    colorClasses[color].split(' ')[0].replace('text-', 'bg-')
                  )}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'wave 1.2s ease-in-out infinite'
                  }}
                />
              ))}
            </div>
            {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
          </div>
        )

      case 'bounce':
        return (
          <div className="flex flex-col items-center gap-3">
            <div className={twMerge(
              'rounded-full animate-bounce',
              sizeClasses[size],
              colorClasses[color].split(' ')[0].replace('text-', 'bg-')
            )} />
            {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
          </div>
        )

      case 'skeleton':
        return (
          <div className="w-full space-y-3">
            <div className="flex space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        )

      default:
        return (
          <div className={twMerge(
            'border-4 border-t-transparent rounded-full animate-spin',
            sizeClasses[size],
            colorClasses[color]
          )} />
        )
    }
  }

  return (
    <div className={twMerge(
      'flex items-center justify-center',
      className
    )}>
      {renderLoading()}
    </div>
  )
}

/**
 * Skeleton loader cho card
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={twMerge('border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse', className)}>
    <div className="w-full h-48 bg-gray-200 rounded"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
)

/**
 * Skeleton loader cho list items
 */
export const ListSkeleton: React.FC<{ 
  items?: number
  className?: string 
}> = ({ items = 5, className }) => (
  <div className={twMerge('space-y-3', className)}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex space-x-3 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
)

/**
 * Page loading với overlay
 */
export const PageLoading: React.FC<{
  isLoading: boolean
  text?: string
  overlay?: boolean
}> = ({ isLoading, text = "Đang tải...", overlay = true }) => {
  if (!isLoading) return null

  return (
    <div className={twMerge(
      'fixed inset-0 z-50 flex items-center justify-center',
      overlay ? 'bg-black/50 backdrop-blur-sm' : ''
    )}>
      <div className="bg-white rounded-lg p-6 shadow-2xl animate-scale-in">
        <Loading type="spinner" size="lg" text={text} />
      </div>
    </div>
  )
}

/**
 * Button loading state
 */
export const ButtonLoading: React.FC<{
  size?: 'sm' | 'md' | 'lg'
  color?: 'orange' | 'blue' | 'gray' | 'green'
}> = ({ size = 'sm', color = 'orange' }) => (
  <Loading type="spinner" size={size} color={color} />
)

/**
 * Shimmer effect cho images
 */
export const ImageSkeleton: React.FC<{
  width?: string | number
  height?: string | number
  className?: string
}> = ({ width = '100%', height = '200px', className }) => (
  <div 
    className={twMerge(
      'bg-gray-200 animate-pulse relative overflow-hidden',
      className
    )}
    style={{ width, height }}
  >
    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
  </div>
)

// Thêm keyframes cho wave animation
const style = typeof document !== 'undefined' ? document.createElement('style') : null
if (style) {
  style.textContent = `
    @keyframes wave {
      0%, 40%, 100% { transform: scaleY(0.4); }
      20% { transform: scaleY(1); }
    }
  `
  if (typeof document !== 'undefined') {
    document.head.appendChild(style)
  }
}

export default Loading 