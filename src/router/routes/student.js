/**
 * Student Portal Routes
 * Portail étudiant - Formation Électro
 */

const Layout = () => import('@/layout/index.vue')

export const studentRoutes = [
  // ═══════════════════════════════════════════════════════════
  // TABLEAU DE BORD ÉTUDIANT
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mon Espace',
    path: '/student',
    component: Layout,
    redirect: '/student/dashboard',
    meta: {
      title: 'Mon Espace',
      icon: 'mdi:view-dashboard',
      order: 1,
      roles: ['student'],
    },
    children: [
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: () => import('@/views/student/dashboard/index.vue'),
        meta: {
          title: 'Tableau de bord',
          icon: 'mdi:home',
          affix: true,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MES COURS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mes Cours',
    path: '/student/courses',
    component: Layout,
    meta: {
      title: 'Mes Cours',
      icon: 'mdi:book-open-variant',
      order: 2,
      roles: ['student'],
    },
    children: [
      {
        path: '',
        name: 'MyCourses',
        component: () => import('@/views/student/courses/index.vue'),
        meta: {
          title: 'Mes programmes',
          icon: 'mdi:book-multiple',
        },
      },
      {
        path: ':programId',
        name: 'MyCourseDetail',
        component: () => import('@/views/student/courses/detail.vue'),
        meta: {
          title: 'Contenu du cours',
        },
        isHidden: true,
      },
      {
        path: ':programId/download/:materialId',
        name: 'DownloadMaterial',
        component: () => import('@/views/student/courses/download.vue'),
        meta: {
          title: 'Téléchargement',
        },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MON CALENDRIER
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mon Calendrier',
    path: '/student/calendar',
    component: Layout,
    meta: {
      title: 'Mon Calendrier',
      icon: 'mdi:calendar',
      order: 3,
      roles: ['student'],
    },
    children: [
      {
        path: '',
        name: 'MyCalendar',
        component: () => import('@/views/student/calendar/index.vue'),
        meta: {
          title: 'Mes sessions',
          icon: 'mdi:calendar-month',
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MES PAIEMENTS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mes Paiements',
    path: '/student/payments',
    component: Layout,
    meta: {
      title: 'Mes Paiements',
      icon: 'mdi:receipt',
      order: 4,
      roles: ['student'],
    },
    children: [
      {
        path: '',
        name: 'MyPayments',
        component: () => import('@/views/student/payments/index.vue'),
        meta: {
          title: 'Historique paiements',
          icon: 'mdi:cash-check',
        },
      },
      {
        path: 'invoices',
        name: 'MyInvoices',
        component: () => import('@/views/student/payments/invoices.vue'),
        meta: {
          title: 'Mes factures',
          icon: 'mdi:file-document',
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MON PROFIL
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mon Profil',
    path: '/student/profile',
    component: Layout,
    meta: {
      title: 'Mon Profil',
      icon: 'mdi:account',
      order: 5,
      roles: ['student'],
    },
    children: [
      {
        path: '',
        name: 'MyProfile',
        component: () => import('@/views/student/profile/index.vue'),
        meta: {
          title: 'Informations personnelles',
          icon: 'mdi:account-edit',
        },
      },
    ],
  },
]

export default studentRoutes
