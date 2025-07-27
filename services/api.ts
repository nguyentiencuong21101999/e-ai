import { getReduxState } from "@/redux/utils"
import Axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios"

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}
console.log(process.env.NEXT_PUBLIC_BASE_API)
const api = Axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_API })

api.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    const token = getReduxState().authReducer.profile?.accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error): any => {
    return Promise.reject(error)
  }
)

export default api
