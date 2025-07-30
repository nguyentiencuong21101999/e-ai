"use client"

import { useScrollToTop } from '@/hooks/useScrollToTop'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const VocabularyPage = () => {
  useScrollToTop()
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="w-full px-4 py-8">
        <div className="w-full">
          {/* Header with back button */}
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-pink-600 hover:text-white hover:bg-pink-500 transition-all duration-300 rounded-lg px-3 py-2 font-medium"
            >
              <ArrowLeftOutlined />
              Quay lại
            </button>
          </div>

          {/* Main content */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8">
            <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
              Luyện từ vựng
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabularyPage 