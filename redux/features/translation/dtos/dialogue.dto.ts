import { IPaginatedResponseDto } from '@/base/dto/common.dto'

export interface IDialogueDto {
  _id: string
  dialogueId: string
  topicId: string
  type: string
  original: string
  difficulty: string
  sortOrder: number
  dataType?: string // New field added
  content?: {
    original?: string
    translation?: string
  }
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
}

export interface IGetDialoguesRequestDto {
  topicId: string
  type?: string
  order?: string
  by?: 'ASC' | 'DESC'
  page?: number
  limit?: number
}

export interface IGetDialoguesResponseDto extends IPaginatedResponseDto<IDialogueDto> {
  
} 