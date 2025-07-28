"use client"
import { usePreventZoom } from '@/utils/preventZoom'
import { useEffect } from 'react'

interface ZoomPreventWrapperProps {
  children: React.ReactNode
  className?: string
  autoApply?: boolean
}

/**
 * Component wrapper để ngăn zoom trên iOS Safari
 * Sử dụng component này để wrap bất kỳ form hoặc component có input nào
 */
const ZoomPreventWrapper: React.FC<ZoomPreventWrapperProps> = ({
  children,
  className = "",
  autoApply = true
}) => {
  useEffect(() => {
    if (autoApply) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const cleanup = usePreventZoom()
      return cleanup
    }
  }, [autoApply])

  return (
    <div className={`zoom-prevent-container ${className}`}>
      {children}
    </div>
  )
}

export default ZoomPreventWrapper 