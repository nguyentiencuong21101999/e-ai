import { IPaginatedResponseDto } from '@/base/dto/common.dto'

export interface ITopicDto {
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
  _id: string
  topicId: string
  titleEn: string
  titleVi: string
  dialoguesCount: number
}

export interface IGetTopicsRequestDto {
  search?: string
  page?: number
  limit?: number
}

export interface IGetTopicsResponseDto extends IPaginatedResponseDto<ITopicDto> {} 