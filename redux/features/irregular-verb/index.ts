export { getListIrregularVerbs } from "./action"
export type {
    IGetIrregularVerbsRequestDto, IIrregularVerbDto,
    IIrregularVerbListResponseDto
} from "./dtos/irregular-verb.dto"
export type { IIrregularVerbReducerStateDto } from "./dtos/reducer-state.dto"
export { default as irregularVerbReducer } from "./reducer"

