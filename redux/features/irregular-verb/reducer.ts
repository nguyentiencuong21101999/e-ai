import { createReducer } from "@reduxjs/toolkit"
import { getListIrregularVerbs } from "./action"
import { irregularVerbDefaultReducer } from "./dtos/reducer-state.dto"

const irregularVerbReducer = createReducer(irregularVerbDefaultReducer, (builder) => {
  builder
    // Get list of irregular verbs
    .addCase(getListIrregularVerbs.pending, (state) => {
      state.irregularVerbsLoading = true
      state.irregularVerbsError = null
    })
    .addCase(getListIrregularVerbs.fulfilled, (state, action) => {
      state.irregularVerbsLoading = false
      state.irregularVerbs = action.payload.data
      state.irregularVerbsPagination = action.payload.pagination
      state.irregularVerbsError = action.payload.error
    })
    .addCase(getListIrregularVerbs.rejected, (state, action) => {
      state.irregularVerbsLoading = false
      state.irregularVerbsError = action.error.message || "Lấy danh sách động từ bất quy tắc thất bại"
    })
})

export default irregularVerbReducer 