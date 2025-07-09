"use client"

import React, { useEffect, useRef, useState } from "react"

export interface TabItem {
  key: string
  label: string
  icon: React.ReactNode
}

interface TabProps {
  activeTab: string
  onTabChange: (tabKey: string) => void
  tabs: TabItem[]
}

/**
 * Tab component for Cart page
 * Handles switching between "Giỏ hàng" và "Đơn mua" with smooth underline animation
 */
const Tab: React.FC<TabProps> = ({ activeTab, onTabChange, tabs }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.key === activeTab)
    const activeTabElement = tabRefs.current[activeIndex]
    
    if (activeTabElement) {
      const { offsetWidth, offsetLeft } = activeTabElement
      setIndicatorStyle({
        width: offsetWidth,
        left: offsetLeft
      })
    }
  }, [activeTab, tabs])

  return (
    <div className="relative border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={el => tabRefs.current[index] = el}
            onClick={() => onTabChange(tab.key)}
            className={`py-4 px-1 font-medium text-lg transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.key
                ? "text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
      
      {/* Animated underline indicator */}
      <div
        className="absolute bottom-0 h-0.5 bg-orange-500 transition-all duration-300 ease-out"
        style={{
          width: `${indicatorStyle.width}px`,
          left: `${indicatorStyle.left}px`,
        }}
      />
    </div>
  )
}

export default Tab 