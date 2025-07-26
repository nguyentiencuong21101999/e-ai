import { useEffect } from "react"

/**
 * Custom hook to disable/enable body scroll when modal/popup is open
 * @param isOpen - Boolean indicating if the modal/popup is open
 */
const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      bottom: document.body.style.bottom,
    }

    if (isOpen) {
      // Disable scroll
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = "0"
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.bottom = "0"
    } else {
      // Re-enable scroll with original styles
      document.body.style.overflow = originalStyles.overflow
      document.body.style.position = originalStyles.position
      document.body.style.top = originalStyles.top
      document.body.style.left = originalStyles.left
      document.body.style.right = originalStyles.right
      document.body.style.bottom = originalStyles.bottom
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalStyles.overflow
      document.body.style.position = originalStyles.position
      document.body.style.top = originalStyles.top
      document.body.style.left = originalStyles.left
      document.body.style.right = originalStyles.right
      document.body.style.bottom = originalStyles.bottom
    }
  }, [isOpen])
}

export default useBodyScrollLock 