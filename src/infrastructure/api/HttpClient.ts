import axios, { AxiosError, AxiosResponse } from 'axios'
import { API_BASE_URL } from '@config/env'

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

httpClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (error.response?.status >= 400) {
      const customError = new Error(error.response?.data?.message || 'Something went wrong')
      ;(customError as any).status = error.response?.status
      ;(customError as any).data = error.response?.data
      throw customError
    }
    return Promise.reject(error)
  }
)
