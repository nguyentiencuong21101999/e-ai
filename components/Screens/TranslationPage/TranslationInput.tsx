import TranslateInput from "@/components/Common/TranslateInput"
import { motion } from "framer-motion"
import { useState } from "react"
import { MdSend } from "react-icons/md"

interface TranslationInputProps {
  onSubmit: (translation: string) => boolean | void
  containerRef?: React.RefObject<HTMLElement>
  currentSentence?: number
  isCompleted?: boolean
}

const TranslationInput = ({
  onSubmit,
  containerRef,
  currentSentence = 1,
  isCompleted = false,
}: TranslationInputProps) => {
  const [translation, setTranslation] = useState("")

  const handleSubmit = () => {
    if (translation.trim()) {
      const result = onSubmit(translation)
      // Only clear input if submission was successful (returned true)
      if (result === true) {
        setTranslation("")
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const inputContent = (
    <div className="rounded-2xl bg-white">
      <div className="mx-auto p-1">
        <div className="flex flex-col gap-4">
          {/* Header info */}
          <div className="px-2">
            <p className="text-sm text-gray-600">
              {isCompleted 
                ? "🎉 Chúc mừng! Bạn đã hoàn thành tất cả các câu!" 
                : `Đang dịch câu ${currentSentence}`}
            </p>
          </div>
          
          <div className="flex gap-4 text-pink-700">
            <textarea
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isCompleted 
                ? "Bạn đã hoàn thành tất cả các câu!" 
                : `Nhập bản dịch cho câu ${currentSentence}...`}
              disabled={isCompleted}
              className={`text-16 flex-1 rounded-xl border-2 p-4 placeholder-pink-700 outline-none transition-all ${
                isCompleted 
                  ? 'border-gray-200 bg-gray-50 text-gray-400' 
                  : 'border-pink-100 bg-white focus:border-pink-300'
              }`}
              rows={3}
            />

            <motion.button
              whileHover={!isCompleted ? { scale: 1.05 } : {}}
              whileTap={!isCompleted ? { scale: 0.95 } : {}}
              onClick={handleSubmit}
              disabled={isCompleted}
              className={`self-end rounded-xl p-4 shadow-lg transition-all ${
                isCompleted
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
              }`}
            >
              <MdSend className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <TranslateInput
      containerRef={containerRef}
      className="bg-white border-t border-gray-100 shadow-lg"
      offset={50} // Điều chỉnh offset để phù hợp với chiều cao của input
    >
      {inputContent}
    </TranslateInput>
  )
}

export default TranslationInput
