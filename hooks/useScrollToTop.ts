import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const useScrollToTop = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top when pathname changes (navigation)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    // Handle scroll restoration for page reload
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    // Handle popstate event (back/forward navigation)
    const handlePopState = () => {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])
} 