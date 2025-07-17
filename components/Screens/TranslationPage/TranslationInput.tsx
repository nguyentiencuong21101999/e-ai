import TranslateInput from "@/components/Common/TranslateInput"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { MdSend } from "react-icons/md"

interface TranslationInputProps {
  onSubmit: (translation: string) => boolean | void | Promise<boolean>
  containerRef?: React.RefObject<HTMLElement>
  currentSentence?: number
  isCompleted?: boolean
  isLoading?: boolean
}

const TranslationInput = ({
  onSubmit,
  containerRef,
  currentSentence = 1,
  isCompleted = false,
  isLoading = false,
}: TranslationInputProps) => {
  const [translation, setTranslation] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isLoading && !isCompleted) {
      textareaRef.current?.focus()
    }
  }, [isLoading, isCompleted])

  const handleSubmit = async () => {
    if (translation.trim() && !isLoading) {
      const result = await onSubmit(translation)
      if (result === true) {
        setTranslation("")
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const inputContent = (
    <div className="rounded-2xl bg-white">
      <div className="mx-auto p-1">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <textarea
              ref={textareaRef}
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isCompleted
                  ? "Bạn đã hoàn thành tất cả các câu!"
                  : isLoading
                  ? "Đang kiểm tra bản dịch..."
                  : `Nhập bản dịch cho câu ${currentSentence}...`
              }
              disabled={isCompleted || isLoading}
              className={`text-16 flex-1 rounded-xl border-2 p-4 outline-none transition-all ${
                isCompleted || isLoading
                  ? "border-gray-200 bg-gray-50 text-gray-400 placeholder-gray-400"
                  : "border-pink-100 bg-white focus:border-pink-300 text-pink-700 placeholder-pink-400"
              }`}
              rows={3}
            />

            <motion.button
              whileHover={!isCompleted && !isLoading ? { scale: 1.05 } : {}}
              whileTap={!isCompleted && !isLoading ? { scale: 0.95 } : {}}
              onClick={handleSubmit}
              disabled={isCompleted || isLoading}
              className={`self-end rounded-xl p-4 shadow-lg transition-all ${
                isCompleted || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
              }`}
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <MdSend className="h-6 w-6" />
              )}
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
      offset={50}
    >
      {inputContent}
    </TranslateInput>
  )
}

export default TranslationInput
