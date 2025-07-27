import { IPaginationDto } from '@/base/dto/common.dto'
import { IDialogueDto } from './dialogue.dto'
import { ITopicDto } from './topic.dto'

export interface ITranslationReducerStateDto {
  // Topics state
  topics: ITopicDto[]
  topicsLoading: boolean
  topicsError: string | null
  topicsPagination: IPaginationDto | null

  // Dialogues state
  dialogues: IDialogueDto[]
  dialoguesLoading: boolean
  dialoguesError: string | null
  dialoguesPagination: IPaginationDto | null
}

export const translationDefaultReducer: ITranslationReducerStateDto = {
  // Topics default state
  topics: [],
  topicsLoading: false,
  topicsError: null,
  topicsPagination: null,

  // Dialogues default state
  dialogues: [],
  dialoguesLoading: false,
  dialoguesError: null,
  dialoguesPagination: null,
} 