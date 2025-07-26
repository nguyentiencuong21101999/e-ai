import {
  getVocabularyTopics,
  saveVocabularyData,
} from "@/mockup/translationVocabularyData"
import { togetherService } from "@/services/together"
import { useCallback, useState } from "react"

export interface VocabularyItem {
  word: string
  meaning: string
  example?: string
  pronunciation?: string
}

export function useVocabularyTranslation() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateVocabulary = useCallback(
    async (topic: string, words: string[]): Promise<VocabularyItem[]> => {
      setIsLoading(true)
      setError(null)
      try {
        const prompt = `Bạn là chuyên gia từ vựng. Với chủ đề "${topic}", hãy trả về danh sách JSON các từ sau với nghĩa tiếng Việt, ví dụ sử dụng, phát âm (nếu có): [${words.join(
          ", "
        )}]. Format: [{"word": "...", "meaning": "...", "example": "...", "pronunciation": "..."}]`
        const messages = [
          { role: "system", content: "Bạn là chuyên gia từ vựng." },
          { role: "user", content: prompt },
        ]
        const llmResponse = await togetherService.chatCompletion(
          messages,
          "lgai/exaone-3-5-32b-instruct"
        )
        console.log("a", llmResponse)
        // Tìm JSON array trong response
        const match = llmResponse.match(/\[[\s\S]*\]/)
        if (!match) throw new Error("Không tìm thấy JSON array")
        const data: VocabularyItem[] = JSON.parse(match[0])
        console.log("data", data)
        // Lưu vào file mockup
        saveVocabularyData(topic, data)
        return data
      } catch (err) {
        setError("Lỗi dịch từ vựng")
        return []
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const getTopics = useCallback(() => {
    return getVocabularyTopics()
  }, [])

  return { translateVocabulary, isLoading, error, getTopics }
}
