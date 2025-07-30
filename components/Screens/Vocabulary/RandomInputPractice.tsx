import {
  useVocabularyTranslation,
  VocabularyItem,
} from "@/hooks/useVocabularyTranslation"
import { getVocabularyByTopic } from "@/mockup/translationVocabularyData"
import { togetherService } from "@/services/together"
import React, { useEffect, useState } from "react"

const getExamples = (item: VocabularyItem): string[] => {
  if (!item.example) return []
  try {
    // Nếu example là JSON array string
    const arr = JSON.parse(item.example)
    if (Array.isArray(arr)) return arr
  } catch {
    // Nếu chỉ là 1 câu string
    return [item.example]
  }
  return [item.example]
}

const RandomInputPractice: React.FC = () => {
  const [input, setInput] = useState("")
  const [topic, setTopic] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [words, setWords] = useState<string[]>([])
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([])
  const [remainingIdx, setRemainingIdx] = useState<number[]>([])
  const [currentIdx, setCurrentIdx] = useState<number | null>(null)
  const [started, setStarted] = useState(false)
  const { translateVocabulary, isLoading, getTopics } =
    useVocabularyTranslation()
  const [topics, setTopics] = useState<string[]>([])
  const [userAnswer, setUserAnswer] = useState("")
  const [checking, setChecking] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [history, setHistory] = useState<
    { word: string; correct: boolean; user: string; expected: string }[]
  >([])
  const [showPractice, setShowPractice] = useState(false)

  useEffect(() => {
    setTopics(getTopics() as any)
  }, [getTopics])

  const handleStart = async () => {
    let vocab: VocabularyItem[] = []
    if (selectedTopic) {
      vocab = getVocabularyByTopic(selectedTopic)
      setTopic(selectedTopic)
    } else if (topic && input) {
      const arr = input
        .split(",")
        .map((w) => w.trim())
        .filter((w) => w.length > 0)
      if (arr.length > 0) {
        vocab = await translateVocabulary(topic, arr)
      }
    }
    if (vocab.length > 0) {
      // Shuffle array
      for (let i = vocab.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[vocab[i], vocab[j]] = [vocab[j], vocab[i]]
      }
      setVocabList(vocab)
      setRemainingIdx(vocab.map((_, i) => i))
      setStarted(true)
      setHistory([])
      setFeedback(null)
      setUserAnswer("")
      // Random chọn từ đầu tiên
      if (vocab.length > 0) {
        const idx = Math.floor(Math.random() * vocab.length)
        setCurrentIdx(idx)
      }
      setShowPractice(true)
    }
  }

  const handleBack = () => {
    setShowPractice(false)
    setStarted(false)
    setInput("")
    setVocabList([])
    setCurrentIdx(null)
    setTopic("")
    setSelectedTopic("")
    setHistory([])
    setFeedback(null)
    setUserAnswer("")
    setRemainingIdx([])
  }

  const handleCheck = async () => {
    if (currentIdx === null) return
    setChecking(true)
    setFeedback(null)
    const current = vocabList[currentIdx]
    // Prompt kiểm tra bản dịch
    const prompt = `Bạn là giáo viên tiếng Việt. Học sinh dịch từ "${current.word}" sang tiếng Việt là: "${userAnswer}". Nghĩa đúng là: "${current.meaning}". Hãy trả lời "Đúng" nếu học sinh dịch đúng nghĩa, hoặc "Sai" nếu không đúng. Chỉ trả về "Đúng" hoặc "Sai".`
    try {
      const res = await togetherService.chatCompletion([
        { role: "system", content: "Bạn là giáo viên tiếng Việt." },
        { role: "user", content: prompt },
      ])
      const isCorrect = res.trim().toLowerCase().includes("đúng")
      setFeedback(isCorrect ? "Đúng!" : "Sai!")
      setHistory((prev) => [
        ...prev,
        {
          word: current.word,
          correct: isCorrect,
          user: userAnswer,
          expected: current.meaning,
        },
      ])
    } catch (e) {
      setFeedback("Lỗi kiểm tra!")
    } finally {
      setChecking(false)
    }
  }

  const handleNext = () => {
    if (currentIdx === null) return
    // Loại bỏ currentIdx khỏi remainingIdx
    const remain = remainingIdx.filter((i) => i !== currentIdx)
    setRemainingIdx(remain)
    setUserAnswer("")
    setFeedback(null)
    if (remain.length > 0) {
      const idx = remain[Math.floor(Math.random() * remain.length)]
      setCurrentIdx(idx)
    } else {
      setCurrentIdx(null)
    }
  }

  // Section nhập/chọn chủ đề
  if (!showPractice) {
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <label className="block text-lg font-medium mb-2 text-pink-700">
          Chủ đề:
        </label>
        <div className="w-full flex gap-2 mb-4">
          <input
            className="flex-1 border border-pink-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value)
              setSelectedTopic("")
            }}
            placeholder="Nhập chủ đề mới"
            disabled={!!selectedTopic}
          />
          <select
            className="border border-pink-300 rounded p-2"
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value)
              setTopic("")
            }}
          >
            <option value="">Chọn chủ đề đã lưu</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <label className="block text-lg font-medium mb-2 text-pink-700">
          Nhập các từ (cách nhau bởi dấu phẩy):
        </label>
        <textarea
          className="w-full h-24 border border-pink-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ví dụ: apple, banana, orange"
          disabled={!!selectedTopic}
        />
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-60"
          onClick={handleStart}
          disabled={isLoading || (!topic && !selectedTopic)}
        >
          {isLoading ? "Đang dịch..." : "Bắt đầu luyện"}
        </button>
      </div>
    )
  }

  // Section luyện tập
  if (currentIdx === null) {
    // Đã hoàn thành
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col items-center">
        <button
          className="self-start mb-4 text-pink-500 hover:underline"
          onClick={handleBack}
        >
          ← Quay lại
        </button>
        <div className="text-xl font-semibold text-green-600 mb-4">
          Đã hoàn thành tất cả các từ!
        </div>
        <div className="w-full mb-4">
          <div className="font-bold mb-2">Kết quả:</div>
          <ul>
            {history.map((h, i) => (
              <li
                key={i}
                className={h.correct ? "text-green-600" : "text-red-500"}
              >
                {h.word}: {h.correct ? "Đúng" : "Sai"} (Bạn: {h.user}, Đáp án:{" "}
                {h.expected})
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded transition"
          onClick={handleBack}
        >
          Luyện lại
        </button>
      </div>
    )
  }

  const current = vocabList[currentIdx]
  const examples = getExamples(current).slice(0, 2)

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <button
        className="self-start mb-4 text-pink-500 hover:underline"
        onClick={handleBack}
      >
        ← Quay lại
      </button>
      <div className="text-2xl font-bold text-pink-700 mb-4">
        {current.word}
      </div>
      {current.pronunciation && (
        <div className="mb-2 text-gray-400">
          Phát âm: {current.pronunciation}
        </div>
      )}
      {examples.length > 0 && (
        <div className="mb-2 text-gray-500 italic">
          {examples.map((ex, i) => (
            <div key={i}>Ví dụ: {ex}</div>
          ))}
        </div>
      )}
      <input
        className="w-full border border-pink-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Nhập nghĩa tiếng Việt của từ này"
        disabled={checking}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCheck()
        }}
        autoFocus
      />
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded transition mb-2 disabled:opacity-60"
        onClick={handleCheck}
        disabled={checking || !userAnswer}
      >
        {checking ? "Đang kiểm tra..." : "Kiểm tra"}
      </button>
      {feedback && (
        <div
          className={`mb-2 font-semibold ${
            feedback === "Đúng!" ? "text-green-600" : "text-red-500"
          }`}
        >
          {feedback}
        </div>
      )}
      {feedback && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded transition"
          onClick={handleNext}
        >
          Tiếp theo
        </button>
      )}
    </div>
  )
}

export default RandomInputPractice
