import { TranslationDirection } from "@/mockup/translationData"
import { togetherService } from "@/services/together"
import { useCallback, useState } from "react"

interface TranslationCheckRequest {
  originalText: string
  userTranslation: string
  expectedTranslation: string
  translateType: TranslationDirection
}

interface TranslationCheckResult {
  isCorrect: boolean
  score: number
  feedback: string
  suggestions?: string[]
}

export function useTranslation() {
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkTranslation = useCallback(
    async (
      request: TranslationCheckRequest
    ): Promise<TranslationCheckResult> => {
      setIsChecking(true)
      setError(null)

      try {
        const prompt = `Bạn là một chuyên gia dịch thuật chuyên nghiệp. Hãy đánh giá bản dịch sau đây dựa trên các tiêu chí bên dưới và trả về kết quả dưới dạng JSON chính xác.

        Văn bản gốc: "${request.originalText}"
        Bản dịch của người dùng: "${request.userTranslation}"
        Loại dịch: "${request.translateType}"
        
        ### Tiêu chí đánh giá:
        - Ngữ pháp đúng và diễn đạt tự nhiên
        - Cho phép nhiều cách dịch nếu vẫn đúng ý nghĩa
        - Phù hợp với ngữ cảnh và cách dùng từ
        
        ### QUAN TRỌNG:
        Chỉ trả về **một JSON object** theo đúng cấu trúc sau và không thêm bất kỳ văn bản nào khác bên ngoài:
        {
          "isCorrect": boolean,
          "score": number,
          "feedback": string
        }
        
        ### Quy định:
        - \`isCorrect\`: true nếu \`score\` > 50, ngược lại là false
        - \`feedback\`: phải là một HTML string hoàn chỉnh, bọc trong thẻ \`<div>\`
        - Nếu \`score\` >= 90:
          - Phản hồi ngắn gọn: “Bản dịch chính xác, tự nhiên và phù hợp ngữ cảnh.”
          - Không cần gợi ý
        - Nếu \`score\` > 50 và < 90:
          - Phải đưa ra **2–3 gợi ý** cải thiện cụ thể, rõ ràng, dưới dạng danh sách HTML (\`<ul><li> -...</li></ul>\`)
          - Những điểm tốt vẫn cần được nhấn mạnh bằng:
            - <span style='color: #10b981; font-weight: 600;'>...</span>
          - Các cảnh báo, lưu ý cần nhấn bằng:
            - <span style='color: #f59e0b; font-weight: 600;'>...</span>
        
        ❗ Trả về **duy nhất JSON object**, không thêm bất kỳ nội dung mô tả nào khác ngoài cấu trúc JSON.`

        const messages = [
          {
            role: "system",
            content:
              "Bạn là một chuyên gia dịch thuật chuyên nghiệp. Hãy đánh giá bản dịch một cách chính xác và trả về kết quả theo format JSON được yêu cầu.",
          },
          {
            role: "user",
            content: prompt,
          },
        ]

        const llmResponse = await togetherService.chatCompletion(
          messages,
          "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"
        )

        // Parse JSON response từ LLM
        try {
          console.log("Raw LLM Response:", llmResponse)

          // Clean the response first
          let cleanedResponse = llmResponse.trim()

          // Tìm JSON block với nhiều pattern khác nhau
          let jsonString = ""

          // Pattern 1: JSON với ```json wrapper
          const jsonBlockMatch = cleanedResponse.match(
            /```json\s*(\{[\s\S]*?\})\s*```/
          )

          // Pattern 2: Tìm JSON object đầu tiên trong response
          const jsonObjectMatch = cleanedResponse.match(
            /\{[^{}]*"isCorrect"[^{}]*"score"[^{}]*"feedback"[^{}]*\}/
          )

          // Pattern 3: Tìm JSON object phức tạp có nested
          const complexJsonMatch = cleanedResponse.match(
            /\{[\s\S]*?"feedback"[\s\S]*?\}/
          )

          if (jsonBlockMatch) {
            jsonString = jsonBlockMatch[1]
          } else if (jsonObjectMatch) {
            jsonString = jsonObjectMatch[0]
          } else if (complexJsonMatch) {
            jsonString = complexJsonMatch[0]
          } else {
            throw new Error("No valid JSON found in response")
          }

          // Clean JSON string
          jsonString = jsonString
            .replace(/\n/g, " ") // Remove newlines
            .replace(/\s+/g, " ") // Normalize spaces
            .replace(/,\s*}/g, "}") // Remove trailing commas
            .replace(/,\s*]/g, "]") // Remove trailing commas in arrays
            .trim()

          console.log("Cleaned JSON string:", jsonString)

          const parsedResponse = JSON.parse(jsonString)

          // Validate required fields
          if (
            typeof parsedResponse.isCorrect === "undefined" ||
            typeof parsedResponse.score === "undefined" ||
            typeof parsedResponse.feedback === "undefined"
          ) {
            throw new Error("Missing required fields in JSON response")
          }

          return {
            isCorrect: Boolean(parsedResponse.isCorrect),
            score: Number(parsedResponse.score) || 0,
            feedback: String(parsedResponse.feedback) || "Không có phản hồi",
            suggestions: Array.isArray(parsedResponse.suggestions)
              ? parsedResponse.suggestions
              : [],
          }
        } catch (parseError) {
          console.warn(
            "Failed to parse LLM JSON response, using fallback analysis",
            parseError
          )

          // Enhanced fallback analysis
          const responseText = llmResponse.toLowerCase()

          // Extract score from text if possible
          const scoreMatch =
            llmResponse.match(/"score":\s*(\d+)/) ||
            llmResponse.match(/score.*?(\d+)/) ||
            llmResponse.match(/điểm.*?(\d+)/)
          const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : null

          // Extract feedback from text
          const feedbackMatch =
            llmResponse.match(/"feedback":\s*"([^"]*)"/) ||
            llmResponse.match(/feedback.*?[":"]\s*([^\n\r]+)/)
          const extractedFeedback = feedbackMatch
            ? feedbackMatch[1]
            : llmResponse

          const isCorrect =
            responseText.includes("true") ||
            responseText.includes('"iscorrect": true') ||
            responseText.includes("đúng") ||
            responseText.includes("correct") ||
            responseText.includes("chính xác") ||
            (extractedScore !== null && extractedScore >= 70)

          return {
            isCorrect,
            score: extractedScore || (isCorrect ? 85 : 45),
            feedback: extractedFeedback
              ? `<div>${extractedFeedback}</div>`
              : `<div><span style='color: #f59e0b; font-weight: 600;'>Lỗi phân tích phản hồi.</span> ${llmResponse.substring(
                  0,
                  200
                )}...</div>`,
            suggestions: [],
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Lỗi không xác định"
        setError(`Không thể kiểm tra bản dịch: ${errorMessage}`)

        // Fallback to simple comparison
        return fallbackCheck(
          request.userTranslation,
          request.expectedTranslation
        )
      } finally {
        setIsChecking(false)
      }
    },
    []
  )

  // Fallback method khi LLM fail
  const fallbackCheck = (
    userTranslation: string,
    expectedTranslation: string
  ): TranslationCheckResult => {
    const normalizeText = (text: string) =>
      text.trim().toLowerCase().replace(/\s+/g, " ")

    const isMatch =
      normalizeText(userTranslation) === normalizeText(expectedTranslation)

    return {
      isCorrect: isMatch,
      score: isMatch ? 100 : 0,
      feedback: isMatch
        ? "<div><span style='color: #10b981; font-weight: 600;'>Chính xác!</span> Bản dịch của bạn hoàn toàn đúng. (Kiểm tra bằng so sánh trực tiếp)</div>"
        : "<div><span style='color: #f59e0b; font-weight: 600;'>Không chính xác.</span> Hãy thử lại! (Kiểm tra bằng so sánh trực tiếp)</div>",
      suggestions: [],
    }
  }

  return {
    checkTranslation,
    isChecking,
    error,
    clearError: useCallback(() => setError(null), []),
  }
}
