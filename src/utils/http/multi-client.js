import axios from 'axios'
import { resReject, resResolve, reqReject, reqResolve } from './interceptors'

// API configurations for each website
export const apiConfigs = {
  websiteA: {
    baseURL: import.meta.env.VITE_API_A || 'http://localhost:8001',
    name: 'Website A',
    description: 'User Management System',
  },
  websiteB: {
    baseURL: import.meta.env.VITE_API_B || 'http://localhost:8002',
    name: 'Website B',
    description: 'E-commerce Platform',
  },
  websiteC: {
    baseURL: import.meta.env.VITE_API_C || 'http://localhost:8003',
    name: 'Website C',
    description: 'Blog Platform',
  },
  websiteD: {
    baseURL: import.meta.env.VITE_API_D || 'http://localhost:8004',
    name: 'Website D',
    description: 'Static Landing Page',
  },
}

// Create axios instance for each backend
const apiClients = {}

Object.keys(apiConfigs).forEach((key) => {
  const service = axios.create({
    baseURL: apiConfigs[key].baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Use your existing interceptors
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(
    resResolve,
    (error) => {
      // Custom error handling per backend
      console.error(`[${key}] API Error:`, error.message)

      if (error.response) {
        const { status } = error.response
        const siteName = apiConfigs[key].name

        if (status === 401) {
          window.$message?.error(`${siteName}: Authentication required`)
        } else if (status === 403) {
          window.$message?.error(`${siteName}: Access denied`)
        } else if (status === 500) {
          window.$message?.error(`${siteName}: Server error`)
        } else if (status === 503) {
          window.$message?.warning(`${siteName}: Service temporarily unavailable`)
        }
      } else if (error.code === 'ECONNABORTED') {
        window.$message?.error(`${apiConfigs[key].name}: Request timeout`)
      } else {
        window.$message?.error(`${apiConfigs[key].name}: Network error`)
      }

      return resReject(error)
    }
  )

  apiClients[key] = service
})

export default apiClients