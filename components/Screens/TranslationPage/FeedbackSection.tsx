import { motion } from "framer-motion"
import { MdBarChart, MdEdit, MdStar } from "react-icons/md"

interface FeedbackProps {
  currentSentence: number
  errorMessage?: string
  translatedCount?: number
  totalSentences?: number
  isChecking?: boolean
  score?: number
}

const FeedbackSection = ({
  currentSentence,
  errorMessage = "",
  translatedCount = 0,
  totalSentences = 0,
  isChecking = false,
  score,
}: FeedbackProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      {/* Progress summary */}
      {totalSentences > 0 && (
        <div className="mb-6 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <MdBarChart className="h-6 w-6 text-pink-500" />
            <h3 className="text-18 font-medium text-heading-light">
              Tiến độ tổng quát
            </h3>
          </div>
          <p className="text-gray-700 text-16">
            Đã dịch: {translatedCount}/{totalSentences} câu
          </p>
          <p className="text-gray-700 text-16">
            Câu hiện tại: {currentSentence}
          </p>
          {isChecking && (
            <p className="text-pink-600 text-16 font-medium flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-pink-600 border-t-transparent" />
              Đang kiểm tra bản dịch...
            </p>
          )}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Corrections section - Only show when there's feedback */}
        {(isChecking || errorMessage) && (
          <div className="w-full rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <MdEdit className="h-6 w-6 text-pink-500" />
              <h3 className="text-18 font-medium text-heading-light">
                Chi tiết đánh giá
              </h3>
            </div>

            {/* Score display integrated here */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-bold text-pink-600 min-w-[3rem]">
                {score}
              </span>
              <span className="text-gray-900 text-lg">/100</span>
              <MdStar className="h-5 w-5 text-yellow-500 ml-2" />
            </div>

            {isChecking ? (
              <div className="text-16 text-gray-600 flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
                Đang phân tích bản dịch...
              </div>
            ) : errorMessage ? (
              <div className="space-y-3">
                {/* Render HTML string directly */}
                <div
                  className="text-16 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: errorMessage }}
                />
              </div>
            ) : (
              <ul className="list-inside list-disc space-y-2 text-16 text-gray-700">
                <div
                  className="text-16 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: errorMessage }}
                />
              </ul>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default FeedbackSection
