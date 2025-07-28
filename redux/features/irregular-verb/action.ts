import api from "@/services/api"
import { handleErrors } from "@/utils/errors"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { IGetIrregularVerbsRequestDto, IIrregularVerbListResponseDto } from "./dtos/irregular-verb.dto"

/**
 * Get list of irregular verbs - GET /v1/irregular-verbs
 */
export const getListIrregularVerbs = createAsyncThunk<
  IIrregularVerbListResponseDto,
  IGetIrregularVerbsRequestDto
>("irregular-verb/get-list", async (payload) => {
  try {
    const { page = 1, limit = 100, order = 'v1', by = 'asc', search } = payload
    
    const res = await api.get("/v1/irregular-verbs", {
      params: {
        page,
        limit,
        order,
        by,
        ...(search && { search })
      }
    })
    
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data
    }
    
    return {
      data: [],
      error: null,
      pagination: {
        page: 1,
        limit: 100,
        total: 0
      }
    }
  } catch (e: any) {
    handleErrors(e, "Lấy danh sách động từ bất quy tắc thất bại")
    throw e
  }
}) 