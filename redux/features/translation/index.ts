// Export actions
export { getDialogues, getTopic } from './action'

// Export reducer
export { default as translationReducer } from './reducer'

// Export DTOs
export type {
    IGetTopicsRequestDto,
    IGetTopicsResponseDto,
    ITopicDto
} from './dtos/topic.dto'

export type {
    IDialogueDto,
    IGetDialoguesRequestDto,
    IGetDialoguesResponseDto
} from './dtos/dialogue.dto'

export type {
    ITranslationReducerStateDto
} from './dtos/reducer-state.dto'
