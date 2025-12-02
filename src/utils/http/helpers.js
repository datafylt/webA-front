import { useUserStore } from '@/store'

export function addBaseParams(params) {
  if (!params.userId) {
    params.userId = useUserStore().userId
  }
}

export function resolveResError(code, message) {
  switch (code) {
    case 400:
      message = message ?? 'Request ParametersError'
      break
    case 401:
      message = message ?? 'Login expired'
      break
    case 403:
      message = message ?? 'noPermission'
      break
    case 404:
      message = message ?? 'resourceorAPInotexists'
      break
    case 500:
      message = message ?? 'ServicedeviceAbnormal'
      break
    default:
      message = message ?? `【${code}】: UnknownAbnormal!`
      break
  }
  return message
}
