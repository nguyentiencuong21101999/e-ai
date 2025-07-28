import { useTranslation } from "@/hooks/useTranslation"
import { TranslationDirection } from "@/mockup/translationData"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import FeedbackSection from "./FeedbackSection"
import TranslationInput from "./TranslationInput"

interface TextContent {
  id: number
  content: string
}

interface SentenceData {
  content: string
}

interface ConversationSectionProps {
  selectedText?: string
  translationType?: TranslationDirection
}

// Function to split text into sentences
const splitIntoSentences = (text: string): string[] => {
  return text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0)
    .map((sentence) => sentence.trim())
}

// Function to create sentence data
const createSentenceData = (content: string): SentenceData[] => {
  const contentSentences = splitIntoSentences(content)

  return contentSentences.map((sentence) => ({
    content: sentence,
  }))
}

const ConversationSection: React.FC<ConversationSectionProps> = ({
  selectedText = "",
  translationType = TranslationDirection.EN_TO_VI,
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [translatedSentences, setTranslatedSentences] = useState<Set<number>>(
    new Set()
  )
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Hook for AI translation checking
  const {
    checkTranslation,
    isChecking,
    error: translationError,
  } = useTranslation()

  // Auto scroll to top when selectedText changes (when user selects new topic)
  useEffect(() => {
    if (selectedText) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      // Reset states when new text is selected
      setCurrentSentenceIndex(0)
      setTranslatedSentences(new Set())
      setErrorMessage("")
      setAiSuggestions([])
      setScore(0)
    }
  }, [selectedText])

  // Create sentence data from selected text - split into individual sentences
  const sentences = selectedText ? createSentenceData(selectedText) : []

  const handleTranslationSubmit = async (translation: string) => {
    // Clear previous error and suggestions
    setErrorMessage("")
    setAiSuggestions([])
    setIsSubmitting(true)

    // Basic validation: translation should not be empty
    const currentSentence = sentences[currentSentenceIndex]?.content || ""
    const trimmedTranslation = translation.trim()

    if (trimmedTranslation.length < 3) {
      setErrorMessage("Bản dịch quá ngắn. Vui lòng nhập bản dịch đầy đủ.")
      setIsSubmitting(false)
      return false
    }

    try {
      // Get context from previous sentence if available
      const previousSentence =
        currentSentenceIndex > 0
          ? sentences[currentSentenceIndex - 1]?.content || ""
          : ""

      // Use AI to check translation
      const result = await checkTranslation({
        originalText: currentSentence,
        userTranslation: trimmedTranslation,
        expectedTranslation: "", // Let AI evaluate without expected translation
        translateType: translationType,
        context: previousSentence,
      })

      // Save AI suggestions for display
      setAiSuggestions(result.suggestions || [])
      setScore(result.score)
      if (result.isCorrect || result.score >= 50) {
        // Mark sentence as translated if correct or score is good enough
        setTranslatedSentences((prev) => {
          const newSet = new Set(prev)
          newSet.add(currentSentenceIndex)
          return newSet
        })

        // Move to next sentence if not at the end
        if (currentSentenceIndex < sentences.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1)
        }

        // Show success feedback
        if (result.feedback) {
          setErrorMessage(result.feedback) // Show AI feedback even when correct
        }

        setIsSubmitting(false)
        return true // Clear input
      } else {
        // Show feedback from AI
        setErrorMessage(
          result.feedback || "Bản dịch chưa chính xác. Vui lòng thử lại."
        )
        setIsSubmitting(false)
        return false
      }
    } catch (error) {
      // Fallback to simple validation if AI fails
      console.warn("AI translation check failed, using fallback")

      if (trimmedTranslation.length >= 3) {
        setTranslatedSentences((prev) => {
          const newSet = new Set(prev)
          newSet.add(currentSentenceIndex)
          return newSet
        })

        if (currentSentenceIndex < sentences.length - 1) {
          setCurrentSentenceIndex(currentSentenceIndex + 1)
        }

        setIsSubmitting(false)
        return true
      } else {
        setErrorMessage("Không thể kiểm tra bản dịch. Vui lòng thử lại.")
        setIsSubmitting(false)
        return false
      }
    }
  }

  if (!selectedText) {
    return null
  }

  return (
    <>
      <div className="flex gap-6 mx-auto">
        <div className="w-[50%]">
          <div ref={containerRef} className="pb-6">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4"
                >
                  <p className="text-18 text-heading-light leading-relaxed">
                    {sentences.map((sentence, index) => {
                      const displayText = sentence.content
                      if (!displayText) return null

                      const getSentenceTextStyle = (sentenceIndex: number) => {
                        if (sentenceIndex === currentSentenceIndex) {
                          // Current sentence - dark pink
                          return "text-pink-700 font-semibold"
                        } else if (translatedSentences.has(sentenceIndex)) {
                          // Translated sentence - green
                          return "text-green-700 font-medium"
                        } else {
                          // Default style - gray
                          return "text-gray-500"
                        }
                      }

                      return (
                        <span key={index}>
                          <span
                            className={`transition-all duration-300 ${getSentenceTextStyle(
                              index
                            )}`}
                          >
                            {displayText}
                          </span>
                          {index < sentences.length - 1 && (
                            <span className="text-gray-400">. </span>
                          )}
                        </span>
                      )
                    })}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <TranslationInput
            onSubmit={handleTranslationSubmit}
            containerRef={containerRef}
            currentSentence={currentSentenceIndex + 1}
            isCompleted={translatedSentences.size === sentences.length}
            isLoading={isSubmitting || isChecking}
          />
        </div>

        <div className="w-[50%] pt-0">
          <FeedbackSection
            currentSentence={currentSentenceIndex + 1}
            errorMessage={errorMessage || translationError || ""}
            translatedCount={translatedSentences.size}
            totalSentences={sentences.length}
            isChecking={isSubmitting || isChecking}
            score={isChecking ? 0 : score}
          />
        </div>
      </div>
      {/* Section 2: Important and don't remove it */}
      <TranslationInput
        onSubmit={handleTranslationSubmit}
        currentSentence={currentSentenceIndex + 1}
        isCompleted={translatedSentences.size === sentences.length}
        isLoading={isSubmitting || isChecking}
      />
    </>
  )
}

export default ConversationSection
