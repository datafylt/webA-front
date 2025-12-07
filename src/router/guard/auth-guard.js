import { getToken, isNullOrWhitespace } from '@/utils'

// Paths that don't require authentication
const WHITE_LIST = ['/login', '/404']

// Public website paths (Formation Électro public pages)
const PUBLIC_PATHS = [
  '/',             // Home page
  '/about',
  '/programs',
  '/instructors',
  '/contact'
]

// Helper function to check if path is public
const isPublicPath = (path) => {
  // Exact match for root
  if (path === '/') return true
  // Check other public paths
  return PUBLIC_PATHS.some(p => p !== '/' && (path === p || path.startsWith(p + '/')))
}

export function createAuthGuard(router) {
  router.beforeEach(async (to) => {
    // ═══════════════════════════════════════════════════════════
    // LOGIN PAGE - Always accessible
    // ═══════════════════════════════════════════════════════════
    if (to.path === '/login') {
      return true
    }

    // ═══════════════════════════════════════════════════════════
    // PUBLIC WEBSITE ROUTES - No authentication required
    // ═══════════════════════════════════════════════════════════
    if (isPublicPath(to.path)) {
      // Update page title for public pages
      if (to.meta?.title) {
        document.title = to.meta.title
      }
      return true
    }

    // ═══════════════════════════════════════════════════════════
    // ADMIN ROUTES - Authentication required
    // ═══════════════════════════════════════════════════════════
    const token = getToken()

    /** No token case - redirect to login */
    if (isNullOrWhitespace(token)) {
      if (WHITE_LIST.includes(to.path)) return true
      return { path: '/login', query: { ...to.query, redirect: to.path } }
    }

    /** Has token case - allow access */
    return true
  })
}