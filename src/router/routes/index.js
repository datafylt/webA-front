// import i18n from '~/i18n'
import { publicRoutes } from './public'
import { schoolRoutes } from './school'
// Student and Instructor routes will be added later when role-based filtering is implemented
// import { studentRoutes } from './student'
// import { instructorRoutes } from './instructor'

// const { t } = i18n.global

const Layout = () => import('@/layout/index.vue')

export const basicRoutes = [
  // ═══════════════════════════════════════════════════════════
  // PUBLIC WEBSITE ROUTES (Formation Électro - No auth required)
  // ═══════════════════════════════════════════════════════════
  ...publicRoutes,

  // ═══════════════════════════════════════════════════════════
  // ADMIN DASHBOARD
  // ═══════════════════════════════════════════════════════════
  {
    path: '/admin',
    redirect: '/workbench',
    meta: { order: 0 },
  },
  {
    name: 'Tableau de bord',
    path: '/workbench',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/index.vue'),
        name: 'WorkbenchDefault',
        meta: {
          title: 'Tableau de bord',
          icon: 'mdi:view-dashboard',
          affix: true,
        },
      },
    ],
    meta: { order: 1 },
  },

  // ═══════════════════════════════════════════════════════════
  // SCHOOL MANAGEMENT ROUTES (Admin)
  // ═══════════════════════════════════════════════════════════
  ...schoolRoutes,

  // ═══════════════════════════════════════════════════════════
  // USER PROFILE (All authenticated users)
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Profil',
    path: '/profile',
    component: Layout,
    isHidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index.vue'),
        name: 'ProfileDefault',
        meta: {
          title: 'Mon Profil',
          icon: 'mdi:account',
        },
      },
    ],
    meta: { order: 99 },
  },

  // ═══════════════════════════════════════════════════════════
  // ERROR PAGES
  // ═══════════════════════════════════════════════════════════
  {
    name: 'ErrorPage',
    path: '/error-page',
    component: Layout,
    redirect: '/error-page/404',
    isHidden: true,
    meta: {
      title: 'Erreurs',
      icon: 'mdi:alert-circle-outline',
      order: 99,
    },
    children: [
      {
        name: 'ERROR-401',
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        meta: { title: '401' },
      },
      {
        name: 'ERROR-403',
        path: '403',
        component: () => import('@/views/error-page/403.vue'),
        meta: { title: '403' },
      },
      {
        name: 'ERROR-404',
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        meta: { title: '404' },
      },
      {
        name: 'ERROR-500',
        path: '500',
        component: () => import('@/views/error-page/500.vue'),
        meta: { title: '500' },
      },
    ],
  },
  {
    name: '403',
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    isHidden: true,
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: 'Connexion',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // SYSTEM / SETTINGS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Système',
    path: '/system',
    component: Layout,
    meta: {
      title: 'Système',
      icon: 'mdi:cog',
      order: 20,
    },
    children: [
      {
        path: 'users',
        name: 'System-Users',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: 'Utilisateurs',
          icon: 'mdi:account-multiple',
        },
      },
      {
        path: 'roles',
        name: 'System-Roles',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: 'Rôles',
          icon: 'mdi:shield-account',
        },
      },
      {
        path: 'auditlog',
        name: 'System-AuditLog',
        component: () => import('@/views/system/auditlog/index.vue'),
        meta: {
          title: "Journal d'audit",
          icon: 'mdi:history',
        },
      },
    ],
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

export const EMPTY_ROUTE = {
  name: 'Empty',
  path: '/:pathMatch(.*)*',
  component: null,
}

const modules = import.meta.glob('@/views/**/route.js', { eager: true })
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

const vueModules = import.meta.glob('@/views/**/index.vue')

export { asyncRoutes, vueModules }
