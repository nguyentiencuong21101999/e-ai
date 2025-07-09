import { IconType } from 'react-icons'
import { MdMenuBook, MdTranslate } from 'react-icons/md'

export interface LearningOption {
  id: string
  title: string
  description: string
  icon: IconType
  path: string
}

export const LEARNING_OPTIONS: LearningOption[] = [
  {
    id: 'translation',
    title: 'Luyện dịch thuật',
    description: 'Nâng cao kỹ năng dịch thuật với các bài tập thực hành',
    icon: MdTranslate,
    path: '/translation'
  },
  {
    id: 'vocabulary',
    title: 'Luyện từ vựng',
    description: 'Học và ghi nhớ từ vựng thông qua các phương pháp hiệu quả',
    icon: MdMenuBook,
    path: '/vocabulary'
  }
] 