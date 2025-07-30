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

  const generateVocabularyByTopic = useCallback(
    async (
      topic: string,
      languages: { english: boolean; vietnamese: boolean },
      wordCount: number = 20
    ): Promise<string[]> => {
      setIsLoading(true)
      setError(null)
      try {
        let languageText = ""
        if (languages.english && languages.vietnamese) {
          languageText = "tiếng Anh và tiếng Việt"
        } else if (languages.english) {
          languageText = "tiếng Anh"
        } else if (languages.vietnamese) {
          languageText = "tiếng Việt"
        }

        const prompt = `Với chủ đề "${topic}", hãy tạo ra ${wordCount} từ vựng ${languageText} phổ biến và hữu ích. Trả về danh sách các từ, mỗi từ trên một dòng, không có số thứ tự. Chỉ trả về các từ, không có giải thích hay thông tin khác.`
        const messages = [
          { role: "system", content: `Bạn là chuyên gia từ vựng ${languageText}.` },
          { role: "user", content: prompt },
        ]
        const llmResponse = await togetherService.chatCompletion(
          messages,
          "lgai/exaone-3-5-32b-instruct"
        )
        
        // Parse response thành array các từ
        const words = llmResponse
          .split('\n')
          .map(word => word.trim())
          .filter(word => word && word.length > 0)
          .slice(0, wordCount) // Đảm bảo chỉ lấy đúng số lượng từ
        
        return words
      } catch (err) {
        setError("Lỗi tạo từ vựng theo chủ đề")
        return []
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

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
        // Tìm JSON array trong response
        const match = llmResponse.match(/\[[\s\S]*\]/)
        if (!match) throw new Error("Không tìm thấy JSON array")
        const data: VocabularyItem[] = JSON.parse(match[0])
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

  const checkVocabularyAnswer = useCallback(
    async (userInput: string, correctWord: string): Promise<string> => {
      setIsLoading(true)
      setError(null)
      try {
        const prompt = `Kiểm tra từ "${userInput}" có đúng với từ "${correctWord}" không. Nếu đúng trả về "Đúng", nếu sai trả về "Sai" và đưa ra lý do ngắn gọn.`
        const messages = [
          { role: "system", content: "Bạn là giáo viên tiếng Anh." },
          { role: "user", content: prompt },
        ]
        const llmResponse = await togetherService.chatCompletion(
          messages,
          "lgai/exaone-3-5-32b-instruct"
        )
        return llmResponse
      } catch (err) {
        setError("Lỗi kiểm tra từ vựng")
        return "Có lỗi xảy ra khi kiểm tra"
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const getTopics = useCallback(() => {
    return getVocabularyTopics()
  }, [])

  return { 
    translateVocabulary, 
    checkVocabularyAnswer, 
    generateVocabularyByTopic,
    isLoading, 
    error, 
    getTopics 
  }
}
