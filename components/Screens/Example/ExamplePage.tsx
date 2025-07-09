import TranslateInput from "@/components/Common/TranslateInput"
import React, { useRef } from "react"

const ExamplePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-[200vh]">
      {/* Main content */}
      <div ref={containerRef} className="pb-32 lg:pb-6">
        <div className="space-y-4 mb-6">
          {/* Your main content here */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Example Content</h2>
            <p>Scroll down to see the TranslateInput behavior</p>
          </div>
          {/* Add more content to enable scrolling */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-medium mb-2">Section {index + 1}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Translate Input */}
      <TranslateInput
        containerRef={containerRef}
        className="bg-orange-50 border-orange-200"
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type something..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Send
          </button>
        </div>
      </TranslateInput>
    </div>
  )
}

export default ExamplePage 