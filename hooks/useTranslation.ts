import { TranslationDirection } from "@/mockup/translationData"
import { togetherService } from "@/services/together"
import { useCallback, useState } from "react"

interface TranslationCheckRequest {
  originalText: string
  userTranslation: string
  expectedTranslation: string
  translateType: TranslationDirection
  context: string
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
      console.log(request)
      try {
        const prompt = `Bạn là chuyên gia dịch thuật. Đánh giá bản dịch và trả về JSON object: {"isCorrect": boolean, "score": number, "feedback": string}. Ngữ cảnh trước đó (nếu có): "${request.context}". Gốc: "${request.originalText}", Dịch của người dùng: "${request.userTranslation}", Loại dịch: "${request.translateType}". Tiêu chí: Ngữ pháp chính xác, câu rõ ràng  không cần phải lịch sự quá miễn sao có thể chấp nhận được; diễn đạt tự nhiên theo văn phong bản ngữ; truyền tải đúng ý, không cần sát chữ; văn phong linh hoạt, phù hợp ngữ cảnh giao tiếp; không quá quan trọng về viết hoa, viết thường và dấu câu nếu không làm thay đổi ý nghĩa.. Quy định: isCorrect = true nếu score > 50, ngược lại là false. feedback phải là chuỗi HTML hợp lệ bọc trong thẻ <div>. Dùng màu sắc: xanh lá #10b981 cho phần đúng, vàng #f59e0b cho phần cần cải thiện, đỏ #ef4444 cho phần sai. Tự động tô màu: (1) các cụm nằm trong dấu "..." hoặc '...' bằng <span> theo mức độ; (2) các câu/cụm gốc người dùng đã dịch sai hoặc chưa tự nhiên → đỏ; (3) các cụm thay thế gợi ý nên dùng → vàng; (4) cách dùng từ hoặc cấu trúc đúng, tự nhiên → xanh lá; (5) tô màu các từ khóa quan trọng như "ngữ cảnh", "cách dùng", "tự nhiên", "cấu trúc câu", "ngữ pháp", "mượt mà", "đúng ý", v.v. Phản hồi theo thang điểm: Nếu score >= 90: <div><span style='color: #10b981; font-weight: 600;'>Bản dịch chính xác, tự nhiên và phù hợp ngữ cảnh.</span><br/>Câu văn <span style='color: #10b981; font-weight: 600;'>mượt mà</span>, lựa chọn <span style='color: #10b981; font-weight: 600;'>từ ngữ</span> và <span style='color: #10b981; font-weight: 600;'>cấu trúc</span> thể hiện sự <span style='color: #10b981; font-weight: 600;'>thành thạo</span> ngôn ngữ.</div>; Nếu score <= 50: <div><span style='color: #ef4444; font-weight: 600;'>Bản dịch chưa chính xác, cần cải thiện.</span><br/>Một số <span style='color: #ef4444; font-weight: 600;'>cấu trúc câu</span> không phản ánh đúng <span style='color: #ef4444; font-weight: 600;'>ý gốc</span> hoặc <span style='color: #ef4444; font-weight: 600;'>dùng từ</span> chưa phù hợp với <span style='color: #ef4444; font-weight: 600;'>ngữ cảnh</span>.</div>; Nếu 50 < score < 90: <div>- <span style='color: #10b981; font-weight: 600;'>Bản dịch cơ bản đúng nội dung</span>, nhưng chưa hoàn toàn tự nhiên trong <span style='color: #f59e0b; font-weight: 600;'>văn cảnh bản ngữ</span>.<br/>- Cụm <span style='color: #ef4444; font-weight: 600;'>“take a decision”</span> nên thay bằng <span style='color: #f59e0b; font-weight: 600;'>“make a decision”</span> để đúng với <span style='color: #f59e0b; font-weight: 600;'>cách dùng thông dụng</span>.<br/>- Có thể dùng <span style='color: #f59e0b; font-weight: 600;'>“carefully considered”</span> thay vì <span style='color: #ef4444; font-weight: 600;'>“deeply thought”</span> để diễn đạt chính xác hơn.</div>. ⚠️ Bắt buộc: Chỉ trả về một object JSON hợp lệ theo định dạng {"isCorrect": boolean, "score": number, "feedback": string}. Không được thêm bất kỳ văn bản, chú thích hay giải thích nào ngoài JSON object.
`
        //         const prompt = `Bạn là chuyên gia dịch thuật. Đánh giá bản dịch và trả về JSON object: {"isCorrect": boolean,"score": number,"feedback": string}. Ngữ cảnh trước đó (nếu có): "${request.context}". Gốc: "${request.originalText}", Dịch: "${request.userTranslation}", Loại: "${request.translateType}". Tiêu chí: đúng ngữ pháp, tự nhiên, đúng ý, không cần sát chữ, văn phong tự nhiên. Quy định: isCorrect = true nếu score > 50. feedback là HTML <div>, dùng màu: xanh lá #10b981 (đúng), đỏ #ef4444 (sai), vàng #f59e0b (gợi ý và nhưng từ dặt trong "" or '') cho tất cả các trường hợp,Tự động tô màu các cụm nằm trong dấu "..." hoặc '...' bằng <span> theo mức độ: sai (#ef4444), cần cải thiện (#f59e0b), đúng (#10b981).
        // . Nếu score >= 90: <div><span style='color: #10b981; font-weight: 600;'>Bản dịch chính xác, tự nhiên và phù hợp ngữ cảnh.</span><br/>Câu văn mượt mà, lựa chọn từ ngữ và cấu trúc thể hiện sự thành thạo ngôn ngữ.</div>. Nếu <= 50: <div><span style='color: #ef4444; font-weight: 600;'>Bản dịch chưa chính xác, cần cải thiện.</span><br/>Một số cấu trúc câu không phản ánh đúng ý gốc hoặc dùng từ chưa phù hợp với ngữ cảnh.</div>. Nếu 50 < score < 90: <div>- <span style='color: #10b981; font-weight: 600;'>Bản dịch cơ bản đúng nội dung</span>, nhưng chưa hoàn toàn tự nhiên trong văn cảnh bản ngữ.<br/>- Cụm <span style='color: #f59e0b; font-weight: 600;'>\"take a decision\"</span> nên thay bằng <span style='color: #f59e0b; font-weight: 600;'>\"make a decision\"</span> để đúng với cách dùng thông dụng.<br/>- Có thể dùng <span style='color: #f59e0b; font-weight: 600;'>\"carefully considered\"</span> thay vì <span style='color: #f59e0b; font-weight: 600;'>\"deeply thought\"</span> để diễn đạt chính xác hơn .</div>.⚠️ Bắt buộc: Chỉ trả về duy nhất một object JSON đúng định dạng: {"isCorrect": boolean, "score": number, "feedback": string}.Không được thêm bất kỳ văn bản, chú thích hay giải thích nào bên ngoài JSON
        // - feedback phải là chuỗi HTML hoàn chỉnh, hợp lệ, được bọc trong thẻ <div>`
        const messages = [
          {
            role: "system",
            content:
              "Bạn là một chuyên gia dịch thuật chuyên nghiệp. Hãy đánh giá bản dịch một cách chính xác và trả về kết quả theo format JSON được yêu cầu  Không lặp lại tiêu chí, không mô tả cách đánh giá, không ghi lời mở đầu.",
          },
          {
            role: "user",
            content: prompt,
          },
        ]

        const llmResponse = await togetherService.chatCompletion(
          messages,
          "lgai/exaone-3-5-32b-instruct"
        )
        try {
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

          return {
            isCorrect: false,
            score: 0,
            feedback: `<div><span style='color: #f59e0b; font-weight: 600;'>Lỗi phân tích phản hồi.</span></div>`,
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
