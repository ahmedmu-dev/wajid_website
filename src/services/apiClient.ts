import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { createMockAdapter } from './mockAdapter'

// Base URL for API - can be easily changed to real backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false' // Default to true

export interface ApiError {
  message: string
  status?: number
}

class ApiClient {
  private client: AxiosInstance
  private mockAdapter: ((config: AxiosRequestConfig) => Promise<{ data: unknown }>) | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Initialize mock adapter if using mock API
    if (USE_MOCK_API) {
      this.mockAdapter = createMockAdapter()
    }

    // Request interceptor for real API (auth tokens, etc.)
    this.client.interceptors.request.use(
      (config) => {
        // Add auth tokens, etc. here in the future for real API
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message || 'An unexpected error occurred',
          status: error.response?.status,
        }

        if (error.response?.data && typeof error.response.data === 'object') {
          const data = error.response.data as { message?: string }
          if (data.message) {
            apiError.message = data.message
          }
        }

        return Promise.reject(apiError)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Route to mock adapter if enabled
    if (USE_MOCK_API && this.mockAdapter) {
      const mockResponse = await this.mockAdapter({
        url,
        method: 'get',
        ...config,
      })
      return mockResponse.data as T
    }

    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    // Route to mock adapter if enabled
    if (USE_MOCK_API && this.mockAdapter) {
      const mockResponse = await this.mockAdapter({
        url,
        method: 'post',
        data,
        ...config,
      })
      return mockResponse.data as T
    }

    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    // Route to mock adapter if enabled
    if (USE_MOCK_API && this.mockAdapter) {
      const mockResponse = await this.mockAdapter({
        url,
        method: 'put',
        data,
        ...config,
      })
      return mockResponse.data as T
    }

    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // Route to mock adapter if enabled
    if (USE_MOCK_API && this.mockAdapter) {
      const mockResponse = await this.mockAdapter({
        url,
        method: 'delete',
        ...config,
      })
      return mockResponse.data as T
    }

    const response = await this.client.delete<T>(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
