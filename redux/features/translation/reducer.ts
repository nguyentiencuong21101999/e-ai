import { createReducer } from "@reduxjs/toolkit"
import { getDialogues, getTopic } from "./action"
import { translationDefaultReducer } from "./dtos/reducer-state.dto"

const translationReducer = createReducer(translationDefaultReducer, (builder) => {
  builder
    // getTopic cases
    .addCase(getTopic.pending, (state) => {
      state.topicsLoading = true
      state.topicsError = null
    })
    .addCase(getTopic.fulfilled, (state, action) => {
      state.topicsLoading = false
      state.topics = action.payload.data
      state.topicsPagination = action.payload.pagination
      state.topicsError = action.payload.error
    })
    .addCase(getTopic.rejected, (state, action) => {
      state.topicsLoading = false
      state.topicsError = action.error.message || "Lỗi khi lấy danh sách chủ đề"
    })

    // getDialogues cases
    .addCase(getDialogues.pending, (state) => {
      state.dialoguesLoading = true
      state.dialoguesError = null
    })
    .addCase(getDialogues.fulfilled, (state, action) => {
      state.dialoguesLoading = false
      state.dialogues = action.payload.data
      state.dialoguesPagination = action.payload.pagination || null
      state.dialoguesError = action.payload.error
    })
    .addCase(getDialogues.rejected, (state, action) => {
      state.dialoguesLoading = false
      state.dialoguesError = action.error.message || "Lỗi khi lấy danh sách hội thoại"
    })
})

export default translationReducer 