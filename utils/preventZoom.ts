/**
 * Utility functions để ngăn zoom trên iOS Safari
 */

/**
 * Ngăn zoom khi double tap trên iOS
 */
export const preventDoubleClickZoom = (element: HTMLElement) => {
  let lastTouchEnd = 0

  element.addEventListener(
    'touchend',
    (event) => {
      const now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    { passive: false }
  )
}

/**
 * Ngăn zoom bằng cách đặt viewport scale cố định
 */
export const fixViewportScale = () => {
  const viewport = document.querySelector('meta[name=viewport]')
  if (viewport) {
    const content = viewport.getAttribute('content')
    const newContent = content
      ?.replace(/maximum-scale=[^,]*/, 'maximum-scale=1')
      ?.replace(/minimum-scale=[^,]*/, 'minimum-scale=1')
      ?.replace(/user-scalable=[^,]*/, 'user-scalable=no')
    
    if (newContent && newContent !== content) {
      viewport.setAttribute('content', newContent)
    }
  }
}

/**
 * Ngăn zoom khi focus vào input
 */
export const preventInputZoom = (inputElement: HTMLInputElement) => {
  const currentFontSize = window.getComputedStyle(inputElement).fontSize
  const fontSize = parseFloat(currentFontSize)
  
  // Đảm bảo font-size ít nhất 16px
  if (fontSize < 16) {
    inputElement.style.fontSize = '16px'
  }
  
  // Ngăn zoom khi focus
  inputElement.addEventListener('focus', () => {
    fixViewportScale()
  })
}

/**
 * Hook để tự động áp dụng prevent zoom cho tất cả input trong component
 */
export const usePreventZoom = () => {
  if (typeof window === 'undefined') return

  // Áp dụng cho tất cả input hiện tại
  const applyPreventZoom = () => {
    const inputs = document.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>
    
    inputs.forEach((input) => {
      preventInputZoom(input)
      preventDoubleClickZoom(input)
    })
    
    fixViewportScale()
  }

  // Chạy khi component mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPreventZoom)
  } else {
    applyPreventZoom()
  }
  
  // Observer để áp dụng cho input mới được thêm vào DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          const inputs = element.querySelectorAll('input, textarea, select') as NodeListOf<HTMLInputElement>
          
          inputs.forEach((input) => {
            preventInputZoom(input)
            preventDoubleClickZoom(input)
          })
          
          // Nếu chính element đó là input
          if (element.matches('input, textarea, select')) {
            const input = element as HTMLInputElement
            preventInputZoom(input)
            preventDoubleClickZoom(input)
          }
        }
      })
    })
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  // Cleanup function
  return () => {
    observer.disconnect()
    document.removeEventListener('DOMContentLoaded', applyPreventZoom)
  }
} 