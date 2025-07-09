import { motion } from "framer-motion"
import { MdEdit, MdStar } from "react-icons/md"

interface FeedbackProps {
  currentSentence: number
  errorMessage?: string
  translatedCount?: number
  totalSentences?: number
}

interface Feedback {
  id: number
  score: number
  suggestion: string
  corrections: string[]
}

const SAMPLE_FEEDBACK: Feedback[] = [
  {
    id: 1,
    score: 85,
    suggestion: "Bản dịch tốt, nhưng có thể cải thiện thêm",
    corrections: [
      "Thêm từ chào hỏi thân mật hơn",
      "Có thể dùng 'khỏe không' thay vì 'thế nào'",
    ],
  },
  {
    id: 2,
    score: 90,
    suggestion: "Bản dịch rất tự nhiên",
    corrections: ["Có thể thêm từ cảm xúc", "Cách diễn đạt đã rất tốt"],
  },
  {
    id: 3,
    score: 88,
    suggestion: "Bản dịch khá tốt, cần chú ý ngữ cảnh",
    corrections: [
      "Xem xét thêm cách diễn đạt thân mật",
      "Đã truyền tải đúng ý nghĩa",
    ],
  },
]

const FeedbackSection = ({ 
  currentSentence, 
  errorMessage = "",
  translatedCount = 0,
  totalSentences = 0 
}: FeedbackProps) => {
  const feedback = SAMPLE_FEEDBACK[currentSentence - 1]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-heading-light">
        Đánh giá
      </h2>

      {/* Progress summary */}
      {totalSentences > 0 && (
        <div className="mb-6 rounded-xl bg-blue-50 p-4">
          <h3 className="text-16 font-medium text-blue-700 mb-2">Tiến độ tổng quát</h3>
          <p className="text-blue-600 text-sm">
            Đã dịch: {translatedCount}/{totalSentences} câu
          </p>
          <p className="text-blue-600 text-sm">
            Câu hiện tại: {currentSentence}
          </p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Score section */}
        <div className="w-full rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <MdStar className="h-6 w-6 text-pink-500" />
            <h3 className="text-18 font-medium text-heading-light">Điểm số</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-pink-600">
              {feedback.score}
            </span>
            <span className="text-gray-600">/100</span>
          </div>
        </div>

        {/* Corrections section */}
        <div className="w-full rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <MdEdit className="h-6 w-6 text-pink-500" />
            <h3 className="text-18 font-medium text-heading-light">
              Chi tiết chỉnh sửa
            </h3>
          </div>
          {errorMessage ? (
            <div className="text-16 text-red-600 font-medium">
              {errorMessage}
            </div>
          ) : (
            <ul className="list-inside list-disc space-y-2 text-16 text-gray-700">
              {feedback.corrections.map((correction, index) => (
                <li key={index} className="break-words">
                  {correction}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default FeedbackSection
