import { IIrregularVerbDto, IIrregularVerbListResponseDto } from "./irregular-verb.dto"

export interface IIrregularVerbReducerStateDto {
  irregularVerbs: IIrregularVerbDto[]
  irregularVerbsLoading: boolean
  irregularVerbsError: string | null
  irregularVerbsPagination: IIrregularVerbListResponseDto['pagination'] | null
}

export const irregularVerbDefaultReducer: IIrregularVerbReducerStateDto = {
  irregularVerbs: [],
  irregularVerbsLoading: false,
  irregularVerbsError: null,
  irregularVerbsPagination: null,
} 