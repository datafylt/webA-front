import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import { basicRoutes, NOT_FOUND_ROUTE } from './routes'

// Create router instance
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Reset router function - removes all routes and re-adds basic routes
export function resetRouter() {
  // Remove all routes
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.removeRoute(name)
    }
  })

  // Re-add basic routes
  basicRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

// Setup function called from main.js
export async function setupRouter(app) {
  // Add 404 route at the end
  router.addRoute(NOT_FOUND_ROUTE)

  // Setup route guards
  setupRouterGuard(router)

  // Register router with app
  app.use(router)

  // Wait for router to be ready
  await router.isReady()
}

// Export both named and default for compatibility
export default router