"use client"

import { useScrollToTop } from "@/hooks/useScrollToTop"
import { useVocabularyTranslation } from "@/hooks/useVocabularyTranslation"
import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const VocabularyPage = () => {
  useScrollToTop()
  const router = useRouter()
  const {
    translateVocabulary,
    checkVocabularyAnswer,
    generateVocabularyByTopic,
    isLoading,
    error,
    getTopics,
  } = useVocabularyTranslation()

  const [selectedOption, setSelectedOption] = useState<"custom" | "topic">(
    "custom"
  )

  // Custom mode states
  const [customWords, setCustomWords] = useState("")
  const [inputWord, setInputWord] = useState("")
  const [editingWord, setEditingWord] = useState<{
    index: number
    word: string
  } | null>(null)

  // Topic mode states
  const [topicInput, setTopicInput] = useState("")
  const [wordCount, setWordCount] = useState<number>(10)
  const [topicGeneratedWords, setTopicGeneratedWords] = useState<string[]>([])
  const [topicLanguageSelection, setTopicLanguageSelection] = useState<{
    english: boolean
    vietnamese: boolean
  }>({ english: false, vietnamese: false })

  // Practice mode states
  const [vocabularyList, setVocabularyList] = useState<any[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isPracticeMode, setIsPracticeMode] = useState(false)
  const [currentRandomWord, setCurrentRandomWord] = useState<string>("")
  const [translationInput, setTranslationInput] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [practicedWords, setPracticedWords] = useState<Set<string>>(new Set())
  const [showCongratulations, setShowCongratulations] = useState(false)

  // Nếu chỉ cần tên chủ đề:
  // const topics = getTopics().map(t => t.name)
  // Nếu cần cả Topic:
  // import type { Topic } from "@/mockup/translationVocabularyData"
  // const topics: Topic[] = getTopics()
  const topics = getTopics()

  // Handle moving to next word when all words are practiced
  useEffect(() => {
    if (selectedOption === "custom" && customWords && practicedWords.size > 0) {
      const words = customWords
        .split(",")
        .map((w) => w.trim())
        .filter((w) => w)
      if (practicedWords.size === words.length) {
        // All words have been practiced, show congratulations
        setShowCongratulations(true)
        // Remove auto-restart, let user choose
      }
    } else if (selectedOption === "topic" && topicGeneratedWords.length > 0 && practicedWords.size > 0) {
      if (practicedWords.size === topicGeneratedWords.length) {
        // All words have been practiced, show congratulations
        setShowCongratulations(true)
      }
    }
  }, [practicedWords.size, customWords, topicGeneratedWords, selectedOption])

  // Khi bắt đầu luyện tập, tự động lấy từ đầu tiên
  useEffect(() => {
    if (isPracticeMode && vocabularyList.length > 0) {
      moveToNextWord()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPracticeMode, vocabularyList.length])

  const getRandomWord = () => {
    if (selectedOption === "custom" && customWords) {
      const words = customWords
        .split(",")
        .map((w) => w.trim())
        .filter((w) => w)
      const availableWords = words.filter((word) => !practicedWords.has(word))

      if (availableWords.length === 0) {
        // All words have been practiced, reset
        setPracticedWords(new Set())
        return words[Math.floor(Math.random() * words.length)]
      }

      const randomIndex = Math.floor(Math.random() * availableWords.length)
      return availableWords[randomIndex]
    } else if (selectedOption === "topic" && topicGeneratedWords.length > 0) {
      const availableWords = topicGeneratedWords.filter((word) => !practicedWords.has(word))

      if (availableWords.length === 0) {
        // All words have been practiced, reset
        setPracticedWords(new Set())
        return topicGeneratedWords[Math.floor(Math.random() * topicGeneratedWords.length)]
      }

      const randomIndex = Math.floor(Math.random() * availableWords.length)
      return availableWords[randomIndex]
    }
    return ""
  }

  const moveToNextWord = () => {
    const newWord = getRandomWord()
    setCurrentRandomWord(newWord)
    setTranslationInput("")
    setIsCorrect(null)
    setErrorMessage("")
  }

  const handleRestartPractice = () => {
    setShowCongratulations(false)
    setPracticedWords(new Set())
    moveToNextWord()
  }

  const handleResetPractice = () => {
    setShowCongratulations(false)
    setIsPracticeMode(false)
    setCustomWords("")
    setTopicGeneratedWords([])
    setPracticedWords(new Set())
    setCurrentRandomWord("")
    setTranslationInput("")
    setIsCorrect(null)
    setErrorMessage("")
  }

  const handleTopicSubmit = async () => {
    if (!topicInput.trim() || (!topicLanguageSelection.english && !topicLanguageSelection.vietnamese)) {
      return
    }

    try {
      // Call LLM to generate words by topic
      const words = await generateVocabularyByTopic(topicInput.trim(), topicLanguageSelection, wordCount)
      
      if (words.length === 0) {
        setErrorMessage("Không thể tạo từ vựng cho chủ đề này. Vui lòng thử lại.")
        return
      }
      
      // Set topic generated words
      setTopicGeneratedWords(words)
      setSelectedOption("topic")
      
      // Clear topic input and language selection
      setTopicInput("")
      setTopicLanguageSelection({ english: false, vietnamese: false })
      setWordCount(10)
      
      // Start practice immediately with the generated words
      const practiceWords = words.map(word => ({ word, meaning: '', example: '' }))
      setVocabularyList(practiceWords)
      setIsPracticeMode(true)
      setCurrentWordIndex(0)
      setPracticedWords(new Set())
      setTranslationInput("")
      setIsCorrect(null)
      setErrorMessage("")
      setShowCongratulations(false)
      
      // Initialize with first random word
      // setTimeout(() => {
      //   moveToNextWord()
      // }, 100)
      
    } catch (error) {
      console.error("Error generating words from LLM:", error)
      setErrorMessage("Có lỗi xảy ra khi tạo từ vựng. Vui lòng thử lại.")
    }
  }

  const handleBackClick = () => {
    router.push("/")
  }

  const handleAddWord = () => {
    if (inputWord.trim()) {
      setCustomWords((prev) =>
        prev ? `${prev},${inputWord.trim()}` : inputWord.trim()
      )
      setInputWord("")
    }
  }

  const handleEditWord = (index: number, word: string) => {
    setEditingWord({ index, word })
    setInputWord(word)
  }

  const handleUpdateWord = () => {
    if (editingWord && inputWord.trim()) {
      const words = customWords.split(",")
      words[editingWord.index] = inputWord.trim()
      setCustomWords(words.join(","))
      setEditingWord(null)
      setInputWord("")
    }
  }

  const handleDeleteWord = (index: number) => {
    const words = customWords.split(",")
    words.splice(index, 1)
    setCustomWords(words.join(","))
  }

  const handleCancelEdit = () => {
    setEditingWord(null)
    setInputWord("")
  }

  const handleSubmitTranslation = async () => {
    if (!currentRandomWord || !translationInput.trim()) return

    try {
      // Call LLM to check translation
      const result = await checkVocabularyAnswer(
        translationInput,
        currentRandomWord
      )

      if (
        result.toLowerCase().includes("đúng") ||
        result.toLowerCase().includes("correct")
      ) {
        setIsCorrect(true)
        setErrorMessage("")
        // Add to practiced words
        setPracticedWords(
          (prev) => new Set(Array.from(prev).concat(currentRandomWord))
        )

        // Move to next word after a short delay
        setTimeout(() => {
          moveToNextWord()
        }, 1500)
      } else {
        setIsCorrect(false)
        setErrorMessage("Sai rồi! Hãy thử lại.")
      }
    } catch (error) {
      setIsCorrect(false)
      setErrorMessage("Có lỗi xảy ra. Hãy thử lại.")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitTranslation()
    }
  }

  const handleStartPractice = async () => {
    if (selectedOption === "custom" && customWords) {
      const words = customWords
        .split(",")
        .map((w) => w.trim())
        .filter((w) => w)
      // For custom words, we'll use the words directly without translation
      setVocabularyList(
        words.map((word) => ({ word, meaning: "", example: "" }))
      )
      setIsPracticeMode(true)
      setCurrentWordIndex(0)
      // Reset practiced words and initialize with first random word
      setPracticedWords(new Set())
      setCurrentRandomWord("") // Clear first
      setTranslationInput("")
      setIsCorrect(null)
      setErrorMessage("")
      setShowCongratulations(false)
      // Không cần setTimeout moveToNextWord ở đây nữa
    }
  }

  const handleSubmitAnswer = async () => {
    if (vocabularyList[currentWordIndex] && userInput.trim()) {
      const currentWord = vocabularyList[currentWordIndex]
      const result = await checkVocabularyAnswer(userInput, currentWord.word)
      setFeedback(result)
    }
  }

  const handleNextWord = () => {
    if (currentWordIndex < vocabularyList.length - 1) {
      setCurrentWordIndex((prev) => prev + 1)
      setUserInput("")
      setFeedback("")
    } else {
      setIsPracticeMode(false)
      setVocabularyList([])
      setCurrentWordIndex(0)
    }
  }

  if (isPracticeMode && vocabularyList.length > 0) {
    const currentWord = vocabularyList[currentWordIndex]
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="w-full px-4 py-8">
          <div className="w-full">
            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={() => setIsPracticeMode(false)}
                className="flex items-center gap-2 text-pink-600 hover:text-white hover:bg-pink-500 transition-all duration-300 rounded-lg px-3 py-2 font-medium"
              >
                <ArrowLeftOutlined />
                Quay lại
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8">
              {/* Custom mode - show random word and translation input */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-pink-800 mb-6">
                  {selectedOption === "custom" ? "Luyện từ vựng tùy chỉnh" : "Luyện từ vựng theo chủ đề"}
                </h2>
                
                {/* Progress indicator */}
                <div className="mb-6 text-center">
                  <div className="text-pink-600 font-medium">
                    Đã luyện: {practicedWords.size} /{" "}
                    {selectedOption === "custom" 
                      ? customWords.split(",").filter((w) => w.trim()).length 
                      : topicGeneratedWords.length
                    } từ
                  </div>
                  <div className="w-full bg-pink-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (practicedWords.size /
                            (selectedOption === "custom" 
                              ? customWords.split(",").filter((w) => w.trim()).length 
                              : topicGeneratedWords.length
                            )) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Congratulations Modal */}
                {showCongratulations && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 text-center shadow-2xl border-4 border-pink-200">
                      <div className="text-8xl mb-4">🎉</div>
                      <h3 className="text-3xl font-bold text-pink-800 mb-4">
                        Chúc mừng!
                      </h3>
                      <p className="text-xl text-pink-600 mb-6">
                        Bạn đã hoàn thành tất cả từ vựng!
                      </p>
                      <div className="text-lg text-pink-500 mb-6">
                        Chọn hành động tiếp theo:
                      </div>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={handleRestartPractice}
                          className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                        >
                          Luyện lại
                        </button>
                        <button
                          onClick={handleResetPractice}
                          className="bg-pink-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-500 transition-colors"
                        >
                          Làm mới
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6 mb-6">
                  <div className="text-2xl font-bold text-pink-800 mb-4">
                    {currentRandomWord || "Đang tải..."}
                  </div>
                  <div className="text-lg text-pink-600">
                    <strong>Vui lòng nhập nghĩa</strong>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={translationInput}
                        onChange={(e) => setTranslationInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full flex-1 border border-pink-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-700 placeholder-pink-400"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleSubmitTranslation}
                      disabled={!translationInput.trim() || isLoading}
                      className="bg-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Đang kiểm tra..." : "Kiểm tra"}
                    </button>
                  </div>

                  {/* Result message */}
                  {isCorrect !== null && (
                    <div
                      className={`text-center p-4 rounded-lg ${
                        isCorrect
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isCorrect ? (
                          <>
                            <span>✓</span>
                            <span>
                              Chính xác! Chuyển sang từ tiếp theo...
                            </span>
                          </>
                        ) : (
                          <>
                            <span>✕</span>
                            <span>{errorMessage}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="w-full px-4 py-8">
        <div className="w-full">
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-pink-600 hover:text-white hover:bg-pink-500 transition-all duration-300 rounded-lg px-3 py-2 font-medium"
            >
              <ArrowLeftOutlined />
              Quay lại
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8">
            <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">
              Luyện từ vựng
            </h1>

            <div className="space-y-6">
              {/* Option Selection */}
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedOption("custom")}
                  className={`flex-1 py-4 px-6 rounded-lg border-2 transition-all flex items-center justify-center gap-3 text-base ${
                    selectedOption === "custom"
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-pink-200 hover:border-pink-300 text-pink-600"
                  }`}
                >
                  <EditOutlined />
                  Luyện theo từ mà bạn nhập
                </button>
                <button
                  onClick={() => setSelectedOption("topic")}
                  className={`flex-1 py-4 px-6 rounded-lg border-2 transition-all flex items-center justify-center gap-3 text-base ${
                    selectedOption === "topic"
                      ? "border-pink-500 bg-pink-50 text-pink-700"
                      : "border-pink-200 hover:border-pink-300 text-pink-600"
                  }`}
                >
                  <AppstoreOutlined />
                  Tạo từ theo chủ đề
                </button>
              </div>

              {/* Custom Words Option */}
              {selectedOption === "custom" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-pink-800 mb-4">
                    Nhập từ vựng:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputWord}
                        onChange={(e) => setInputWord(e.target.value)}
                        placeholder={
                          editingWord ? "Sửa từ vựng..." : "Nhập từ vựng..."
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            if (editingWord) {
                              handleUpdateWord()
                            } else {
                              handleAddWord()
                            }
                          }
                        }}
                        className="flex-1 border border-pink-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-700 placeholder-pink-400"
                      />
                      {editingWord ? (
                        <div className="flex gap-1">
                          <button
                            onClick={handleUpdateWord}
                            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                          >
                            ✓
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleAddWord}
                          className="px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          <PlusOutlined />
                        </button>
                      )}
                    </div>
                    {customWords && (
                      <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {customWords.split(",").map((word, index) => (
                            <div
                              key={index}
                              className="bg-white border border-pink-300 text-pink-700 px-4 py-2 rounded-lg text-base font-medium relative cursor-pointer hover:bg-pink-50 transition-colors"
                              onClick={() => handleEditWord(index, word.trim())}
                            >
                              <span>{word.trim()}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteWord(index)
                                }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-pink-300 hover:bg-pink-400 border border-white rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Topic Input Option */}
              {selectedOption === "topic" && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-pink-800 mb-4">
                    Tạo từ vựng theo chủ đề:
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-semibold text-pink-800 mb-3">
                        Nhập chủ đề:
                      </label>
                      <input
                        type="text"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="Ví dụ: Thực phẩm, Du lịch, Công nghệ..."
                        className="w-full border border-pink-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-700 placeholder-pink-400 text-base mb-2"
                      />
                      <div className="mt-2 flex items-center gap-3">
                        <label className="text-pink-700 font-medium">Số lượng từ:</label>
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={wordCount}
                          onChange={e => setWordCount(Math.max(1, Math.min(50, Number(e.target.value))))}
                          className="w-20 border border-pink-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-700 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-pink-800 mb-3">
                        Chọn ngôn ngữ:
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                            topicLanguageSelection.english
                              ? "border-pink-500 bg-pink-100 text-pink-700"
                              : "border-pink-200 bg-white text-pink-500 hover:border-pink-400"
                          }`}
                          onClick={() => setTopicLanguageSelection({ english: true, vietnamese: false })}
                        >
                          Tiếng Anh
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                            topicLanguageSelection.vietnamese
                              ? "border-pink-500 bg-pink-100 text-pink-700"
                              : "border-pink-200 bg-white text-pink-500 hover:border-pink-400"
                          }`}
                          onClick={() => setTopicLanguageSelection({ english: false, vietnamese: true })}
                        >
                          Tiếng Việt
                        </button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleTopicSubmit}
                        disabled={!topicInput.trim() || (!topicLanguageSelection.english && !topicLanguageSelection.vietnamese) || isLoading}
                        className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                      >
                        {isLoading ? "Đang tạo từ vựng..." : "Tạo từ vựng và bắt đầu luyện"}
                      </button>
                    </div>
                    {errorMessage && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Start Practice Button - Only for custom option */}
              {selectedOption === "custom" && customWords && (
                <div className="pt-4">
                  <button
                    onClick={handleStartPractice}
                    disabled={isLoading}
                    className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 text-lg font-medium"
                  >
                    {isLoading ? "Đang tải..." : "Bắt đầu luyện từ vựng"}
                  </button>
                </div>
              )}

              {error && (
                <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-700">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabularyPage
