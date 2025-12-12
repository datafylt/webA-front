import dayjs from 'dayjs'

/**
 * https://vitejs.cn/config/#define
 */
const _BUILD_TIME_ = JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))

export const viteDefine = {
  _BUILD_TIME_,
}
