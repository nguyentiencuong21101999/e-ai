"use client"

import LearningOptionCard from '@/components/Common/LearningOptionCard/LearningOptionCard'
import { LEARNING_OPTIONS } from '@/constants/learning-options'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter()
  
  // Use custom hook for scroll to top functionality
  useScrollToTop()

  const handleOptionClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6 md:p-12">
      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-64 w-64 animate-float rounded-full bg-pink-100/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-64 w-64 animate-float rounded-full bg-rose-100/30 blur-3xl" />
      
      <div className="relative mx-auto">
        <h1 className="mb-4 animate-fade-in text-center text-4xl font-bold text-heading-light">
          Chọn phương pháp học tập
        </h1>
        <p className="mb-12 animate-fade-in text-center text-pink-500">
          Hãy chọn phương pháp phù hợp với mục tiêu học tập của bạn
        </p>

        <div className="grid animate-slide-up grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_OPTIONS.map((option) => (
            <LearningOptionCard
              key={option.id}
              title={option.title}
              description={option.description}
              icon={option.icon}
              onClick={() => handleOptionClick(option.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
