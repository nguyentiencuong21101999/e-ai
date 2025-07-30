// Lưu trữ dữ liệu từ vựng theo topic (giả lập local file)

export interface VocabularyItem {
  word: string
  meaning: string
  example?: string
  pronunciation?: string
}

export interface Topic {
  name: string
  words: string[]
}

interface VocabularyData {
  [topic: string]: VocabularyItem[]
}

let vocabularyData: VocabularyData = {}

// Dữ liệu topics mẫu
const sampleTopics: Topic[] = [
  {
    name: "Gia đình",
    words: ["father", "mother", "sister", "brother", "grandmother", "grandfather"]
  },
  {
    name: "Màu sắc",
    words: ["red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white"]
  },
  {
    name: "Số đếm",
    words: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
  },
  {
    name: "Động vật",
    words: ["dog", "cat", "bird", "fish", "rabbit", "horse", "cow", "pig", "chicken"]
  },
  {
    name: "Thực phẩm",
    words: ["apple", "banana", "bread", "rice", "meat", "vegetables", "milk", "water"]
  },
  {
    name: "Nghề nghiệp",
    words: ["teacher", "doctor", "engineer", "student", "driver", "cook", "nurse", "police"]
  }
]

export function saveVocabularyData(topic: string, items: VocabularyItem[]) {
  if (!vocabularyData[topic]) {
    vocabularyData[topic] = []
  }
  // Thêm các từ mới, tránh trùng lặp
  const existingWords = new Set(vocabularyData[topic].map((item) => item.word))
  const newItems = items.filter((item) => !existingWords.has(item.word))
  vocabularyData[topic] = [...vocabularyData[topic], ...newItems]
}

export function getVocabularyTopics(): Topic[] {
  return sampleTopics
}

export function getVocabularyByTopic(topic: string): VocabularyItem[] {
  return vocabularyData[topic] || []
} 