import { IconType } from 'react-icons'
import { MdMenuBook, MdSchool, MdTranslate } from 'react-icons/md'

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
  },
  {
    id: 'irregular-verbs',
    title: 'Động từ bất quy tắc',
    description: 'Học và ghi nhớ các động từ bất quy tắc trong tiếng Anh',
    icon: MdSchool,
    path: '/irregular-verbs'
  }
] 