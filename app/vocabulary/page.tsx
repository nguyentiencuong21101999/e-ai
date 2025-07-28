"use client"

import RandomInputPractice from '@/components/Screens/Vocabulary/RandomInputPractice'
import { useScrollToTop } from '@/hooks/useScrollToTop'

const VocabularyPage = () => {
  useScrollToTop()
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl px-4 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">Luyện từ vựng</h1>
        <RandomInputPractice />
      </div>
    </div>
  )
}

export default VocabularyPage 