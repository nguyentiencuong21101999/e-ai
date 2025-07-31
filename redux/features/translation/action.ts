import api from "@/services/api"
import { handleErrors } from "@/utils/errors"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  IGetDialoguesRequestDto,
  IGetDialoguesResponseDto
} from "./dtos/dialogue.dto"
import {
  IGetTopicsRequestDto,
  IGetTopicsResponseDto
} from "./dtos/topic.dto"

/**
 * Get topics with search and pagination
 */
export const getTopic = createAsyncThunk<
  IGetTopicsResponseDto,
  IGetTopicsRequestDto
>("translation/getTopic", async (payload) => {
  try {
    const params = new URLSearchParams()
    
    if (payload.search) params.append('search', payload.search)
    if (payload.page) params.append('page', payload.page.toString())
    if (payload.limit) params.append('limit', payload.limit.toString())

    const queryString = params.toString()
    const url = `/v1/translation/topics${queryString ? `?${queryString}` : ''}`
    
    const res = await api.get(url)
    
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data
    }
    
    return {
      data: [],
      error: "No data found",
      pagination: { 
        page: 1, 
        limit: 10, 
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false 
      }
    }
  } catch (e: any) {
    handleErrors(e, "Lấy danh sách chủ đề thất bại")
    throw e
  }
})

/**
 * Get dialogues by topic with filters
 */
export const getDialogues = createAsyncThunk<
  IGetDialoguesResponseDto,
  IGetDialoguesRequestDto
>("translation/getDialogues", async (payload) => {
  try {
    const params = new URLSearchParams()
    
    params.append('topicId', payload.topicId)
    if (payload.type) params.append('type', payload.type)
    if (payload.order) params.append('order', payload.order)
    if (payload.by) params.append('by', payload.by)
    if (payload.page) params.append('page', payload.page.toString())
    if (payload.limit) params.append('limit', payload.limit.toString())

    const queryString = params.toString()
    const url = `/v1/translation/dialogues?${queryString}`
    
    const res = await api.get(url)
    
    if (res.data && Object.keys(res.data).length > 0) {
      return res.data
    }
    
    return {
      data: [],
      error: "No data found",
      pagination: { 
        page: 1, 
        limit: 10, 
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false 
      }
    }
  } catch (e: any) {
    handleErrors(e, "Lấy danh sách hội thoại thất bại")
    throw e
  }
}) 