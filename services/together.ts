import axios from "axios"

interface TogetherCompletionRequest {
  model: string
  prompt: string
  max_tokens?: number
  temperature?: number
  top_p?: number
  stop?: string[]
}

interface TogetherCompletionResponse {
  choices: Array<{
    text: string
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

class TogetherService {
  private apiKey: string
  private baseUrl: string = "https://api.together.xyz/v1"
  private axiosInstance

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TOGETHER_API_KEY || ""
    if (!this.apiKey) {
      console.warn("Together API key not found in environment variables")
    }

    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000, // 30 seconds timeout
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    })
  }

  async chatCompletion(
    messages: Array<{ role: string; content: string }>,
    model?: string
  ): Promise<string> {
    try {
      const requestBody = {
        model: model || "meta-llama/Llama-2-7b-chat-hf",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
      }

      const response = await this.axiosInstance.post(
        "/chat/completions",
        requestBody
      )
      const data = response.data

      if (!data.choices || !data.choices.length) {
        throw new Error("No completion choices returned from Together API")
      }

      return data.choices[0].message.content.trim()
    } catch (error) {
      throw error
    }
  }
}

export const togetherService = new TogetherService()
