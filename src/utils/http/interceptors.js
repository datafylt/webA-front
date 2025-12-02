import { getToken } from '@/utils'
import { resolveResError } from './helpers'
import { useUserStore } from '@/store'

export function reqResolve(config) {
  // If token is not required, skip
  if (config.noNeedToken) {
    return config
  }

  const token = getToken()
  if (token) {
    config.headers.token = config.headers.token || token
  }

  return config
}

export function reqReject(error) {
  return Promise.reject(error)
}

export function resResolve(response) {
  const { data, status, statusText } = response

  // -------------------------------------------
  // ✅ Allow RAW JSON for health endpoints
  // -------------------------------------------
  if (response.config.url?.endsWith('/health')) {
    return Promise.resolve(data)
  }
  // -------------------------------------------

  // Standard response validation for all other APIs
  if (data?.code !== 200) {
    const code = data?.code ?? status
    const message = resolveResError(code, data?.msg ?? statusText)

    window.$message?.error(message, { keepAliveOnHover: true })

    return Promise.reject({
      code,
      message,
      error: data || response,
    })
  }

  return Promise.resolve(data)
}

export async function resReject(error) {
  if (!error || !error.response) {
    const code = error?.code
    const message = resolveResError(code, error?.message)

    window.$message?.error(message)

    return Promise.reject({ code, message, error })
  }

  const { data, status } = error.response

  // Handle token expiration
  if (data?.code === 401) {
    try {
      const userStore = useUserStore()
      userStore.logout()
    } catch (err) {
      console.log('resReject error', err)
      return
    }
  }

  const code = data?.code ?? status
  const message = resolveResError(code, data?.msg ?? error.message)

  window.$message?.error(message, { keepAliveOnHover: true })

  return Promise.reject({
    code,
    message,
    error: error.response?.data || error.response,
  })
}
