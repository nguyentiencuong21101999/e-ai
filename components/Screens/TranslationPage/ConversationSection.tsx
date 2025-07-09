import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { MdLanguage } from "react-icons/md"
import FeedbackSection from "./FeedbackSection"
import TranslationInput from "./TranslationInput"

interface TextContent {
  id: number
  english: string
  vietnamese: string
}

interface SentenceData {
  english: string
  vietnamese: string
}

const SAMPLE_TEXT: TextContent[] = [
  {
    id: 1,
    english:
      "Vietnam is a beautiful country in Southeast Asia that attracts millions of tourists every year. The country is known for its rich history, diverse culture, and stunning natural landscapes. From the bustling streets of Hanoi in the north to the modern city life of Ho Chi Minh City in the south, visitors can experience a wide range of activities and attractions. The country's most famous natural wonder is Ha Long Bay, featuring thousands of limestone islands rising dramatically from the emerald waters. Vietnamese cuisine is another major draw for tourists, with popular dishes like pho, banh mi, and fresh spring rolls available at both street food stalls and high-end restaurants. The people of Vietnam are known for their warmth and hospitality, making visitors feel welcome wherever they go. Traditional culture remains strong throughout the country, with ancient temples, pagodas, and historical sites well-preserved in cities and rural areas alike. The Mekong Delta in the south offers a glimpse into rural life, where farmers tend to rice paddies and fruit orchards. Adventure seekers can explore the mountainous regions of Sapa, known for its terraced rice fields and ethnic minority villages. The central region features the imperial city of Hue and the charming ancient town of Hoi An, both UNESCO World Heritage sites. Modern Vietnam is developing rapidly, but it maintains a perfect balance between preserving its cultural heritage and embracing progress. The best time to visit varies by region due to different climate patterns, but many tourists prefer the cooler months between November and April. Whether you're interested in history, food, nature, or culture, Vietnam offers unforgettable experiences for every type of traveler.",
    vietnamese:
      "Việt Nam là một quốc gia xinh đẹp ở Đông Nam Á, nổi tiếng với lịch sử phong phú, văn hóa đa dạng và cảnh quan thiên nhiên tuyệt đẹp. Du khách có thể khám phá từ Hà Nội nhộn nhịp ở phía bắc đến Thành phố Hồ Chí Minh hiện đại ở phía nam. Vịnh Hạ Long là kỳ quan thiên nhiên nổi bật với hàng nghìn đảo đá vôi trên làn nước màu ngọc lục bảo. Ẩm thực Việt Nam hấp dẫn với các món như phở, bánh mì và gỏi cuốn, phổ biến từ quầy hàng đường phố đến nhà hàng sang trọng. Người dân Việt Nam thân thiện và hiếu khách, luôn chào đón du khách khắp nơi. Văn hóa truyền thống được bảo tồn tốt với nhiều đền chùa và di tích lịch sử trải dài khắp cả nước. Đồng bằng sông Cửu Long cho thấy cuộc sống nông thôn thanh bình, trong khi Sa Pa hấp dẫn người ưa mạo hiểm với ruộng bậc thang và bản làng dân tộc. Miền Trung có Huế và Hội An – hai di sản văn hóa thế giới được UNESCO công nhận. Việt Nam đang phát triển nhanh chóng nhưng vẫn giữ gìn di sản văn hóa truyền thống. Thời điểm lý tưởng để tham quan thường là từ tháng 11 đến tháng 4, với trải nghiệm phong phú về lịch sử, ẩm thực, thiên nhiên và con người",
  },
]

// Function to split text into sentences
const splitIntoSentences = (text: string): string[] => {
  return text
    .split(".")
    .filter((sentence) => sentence.trim().length > 0)
    .map((sentence) => sentence.trim())
}

// Function to create sentence pairs
const createSentencePairs = (
  english: string,
  vietnamese: string
): SentenceData[] => {
  const englishSentences = splitIntoSentences(english)
  const vietnameseSentences = splitIntoSentences(vietnamese)

  const pairs: SentenceData[] = []
  const maxLength = Math.max(
    englishSentences.length,
    vietnameseSentences.length
  )

  for (let i = 0; i < maxLength; i++) {
    pairs.push({
      english: englishSentences[i] || "",
      vietnamese: vietnameseSentences[i] || "",
    })
  }

  return pairs
}

const ConversationSection = () => {
  const [isEnglish, setIsEnglish] = useState(true)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [translatedSentences, setTranslatedSentences] = useState<Set<number>>(
    new Set()
  )
  const [errorMessage, setErrorMessage] = useState<string>("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Create sentence pairs from sample text
  const sentencePairs = createSentencePairs(
    SAMPLE_TEXT[0].english,
    SAMPLE_TEXT[0].vietnamese
  )

  // Debug logging
  console.log("Total sentence pairs:", sentencePairs.length)
  console.log("First few pairs:", sentencePairs.slice(0, 3))

  const handleTranslationSubmit = (translation: string) => {
    const currentPair = sentencePairs[currentSentenceIndex]
    if (!currentPair) return

    // Get the expected translation (opposite language of what's being displayed)
    const expectedTranslation = isEnglish
      ? currentPair.vietnamese
      : currentPair.english

    // Normalize both strings for comparison (remove extra spaces, convert to lowercase)
    const normalizeText = (text: string) =>
      text.trim().toLowerCase().replace(/\s+/g, " ")

    console.log("Current sentence index:", currentSentenceIndex)
    console.log("User input:", translation)
    console.log("Expected translation:", expectedTranslation)
    console.log("Normalized user:", normalizeText(translation))
    console.log("Normalized expected:", normalizeText(expectedTranslation))
    console.log(
      "Match:",
      normalizeText(translation) === normalizeText(expectedTranslation)
    )

    if (normalizeText(translation) === normalizeText(expectedTranslation)) {
      // Correct translation
      console.log("✅ Correct! Moving to next sentence")
      setTranslatedSentences((prev) => {
        const newSet = new Set(prev)
        newSet.add(currentSentenceIndex)
        return newSet
      })
      setErrorMessage("")

      // Move to next sentence if available
      if (currentSentenceIndex < sentencePairs.length - 1) {
        setCurrentSentenceIndex((prev) => prev + 1)
      }
      return true // Return true to indicate success for clearing input
    } else {
      // Incorrect translation
      console.log("❌ Incorrect translation")
      setErrorMessage("Bạn cố gắng thử lại")
      return false // Return false to keep input
    }
  }

  return (
    <div className="flex gap-6 mx-auto">
      <div className="w-[70%]">
        <div ref={containerRef} className="pb-6">
          <div className="rounded-2xl bg-white p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-heading-light">
                {isEnglish ? "English Text" : "Văn bản tiếng Việt"}
              </h2>
              <button
                onClick={() => setIsEnglish(!isEnglish)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 text-pink-600 transition-all hover:from-pink-200 hover:to-rose-200"
              >
                <MdLanguage className="h-5 w-5" />
                <span>Switch to {isEnglish ? "Vietnamese" : "English"}</span>
              </button>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-4"
              >
                <p className="text-18 text-gray-1000 leading-relaxed">
                  {sentencePairs.map((pair, index) => {
                    const displayText = isEnglish
                      ? pair.english
                      : pair.vietnamese
                    if (!displayText) return null

                    const getSentenceTextStyle = (sentenceIndex: number) => {
                      if (sentenceIndex === currentSentenceIndex) {
                        // Current sentence - dark pink
                        return "text-pink-700 font-semibold"
                      } else if (translatedSentences.has(sentenceIndex)) {
                        // Translated sentence - green
                        return "text-green-700 font-medium"
                      } else {
                        // Default style
                        return ""
                      }
                    }

                    return (
                      <span key={index}>
                        <span
                          className={`transition-all duration-300 ${getSentenceTextStyle(
                            index
                          )}`}
                        >
                          {displayText}.
                        </span>
                        {index < sentencePairs.length - 1 && " "}
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
          isCompleted={translatedSentences.size === sentencePairs.length}
        />
      </div>

      <div className="w-[30%] pt-0">
        <FeedbackSection
          currentSentence={currentSentenceIndex + 1}
          errorMessage={errorMessage}
          translatedCount={translatedSentences.size}
          totalSentences={sentencePairs.length}
        />
      </div>
    </div>
  )
}

export default ConversationSection
