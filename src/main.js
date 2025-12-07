/** Reset styles */
import '@/styles/global.scss'
import '@/styles/reset.css'
import 'uno.css'

/** Formation Électro Public Pages Shared Styles */
import '@/assets/styles/public.css'

/** Formation Électro Public Pages Styles */
import '@/assets/styles/public.css'

import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import App from './App.vue'
import { setupDirectives } from './directives'
import { useResize } from '@/utils'
import i18n from '~/i18n'
import { setupGlobalIcons } from '@/plugins/global-icons.js'

// CRITICAL: Import SVG sprite sheet
import 'virtual:svg-icons-register'

async function setupApp() {
  const app = createApp(App)

  setupStore(app)

  await setupRouter(app)
  setupDirectives(app)
  setupGlobalIcons(app)
  app.use(useResize)
  app.use(i18n)
  app.mount('#app')
}

setupApp()