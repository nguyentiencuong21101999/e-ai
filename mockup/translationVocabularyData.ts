// Lưu trữ dữ liệu từ vựng theo topic (giả lập local file)

export interface VocabularyItem {
  word: string
  meaning: string
  example?: string
  pronunciation?: string
}

interface VocabularyData {
  [topic: string]: VocabularyItem[]
}

let vocabularyData: VocabularyData = {}

export function saveVocabularyData(topic: string, items: VocabularyItem[]) {
  if (!vocabularyData[topic]) {
    vocabularyData[topic] = []
  }
  // Thêm các từ mới, tránh trùng lặp
  const existingWords = new Set(vocabularyData[topic].map((item) => item.word))
  const newItems = items.filter((item) => !existingWords.has(item.word))
  vocabularyData[topic] = [...vocabularyData[topic], ...newItems]
}

export function getVocabularyTopics(): string[] {
  return Object.keys(vocabularyData)
}

export function getVocabularyByTopic(topic: string): VocabularyItem[] {
  return vocabularyData[topic] || []
} 