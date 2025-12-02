// This one is store/modules/index.js   there is no auth.js at this level

import { createPinia } from 'pinia'

export function setupStore(app) {
  app.use(createPinia())
}

export * from './modules'