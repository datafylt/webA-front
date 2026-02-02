/**
 * School Management Routes (Admin)
 * Gestion scolaire - Formation Électro
 */

const Layout = () => import('@/layout/index.vue')

export const schoolRoutes = [
  // ═══════════════════════════════════════════════════════════
  // GESTION DES ÉTUDIANTS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Étudiants',
    path: '/school/students',
    component: Layout,
    meta: {
      title: 'Étudiants',
      icon: 'mdi:account-school',
      order: 2,
    },
    children: [
      {
        path: '',
        name: 'StudentsList',
        component: () => import('@/views/school/students/index.vue'),
        meta: {
          title: 'Liste des étudiants',
          icon: 'mdi:account-group',
        },
      },
      {
        path: 'create',
        name: 'StudentCreate',
        component: () => import('@/views/school/students/create.vue'),
        meta: { title: 'Nouvel étudiant' },
        isHidden: true,
      },
      {
        path: ':id',
        name: 'StudentDetail',
        component: () => import('@/views/school/students/detail.vue'),
        meta: { title: 'Détail étudiant' },
        isHidden: true,
      },
      {
        path: ':id/edit',
        name: 'StudentEdit',
        component: () => import('@/views/school/students/edit.vue'),
        meta: { title: 'Modifier étudiant' },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GESTION DES PROGRAMMES & COURS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Programmes',
    path: '/school/programs',
    component: Layout,
    meta: {
      title: 'Programmes',
      icon: 'mdi:book-education',
      order: 3,
    },
    children: [
      {
        path: '',
        name: 'ProgramsList',
        component: () => import('@/views/school/programs/index.vue'),
        meta: {
          title: 'Liste des programmes',
          icon: 'mdi:book-multiple',
        },
      },
      {
        path: 'create',
        name: 'ProgramCreate',
        component: () => import('@/views/school/programs/create.vue'),
        meta: { title: 'Nouveau programme' },
        isHidden: true,
      },
      {
        path: ':id',
        name: 'SchoolProgramDetail',
        component: () => import('@/views/school/programs/detail.vue'),
        meta: { title: 'Détail programme' },
        isHidden: true,
      },
      {
        path: ':id/courses',
        name: 'ProgramCourses',
        component: () => import('@/views/school/programs/courses.vue'),
        meta: { title: 'Contenu du programme' },
        isHidden: true,
      },
      {
        path: ':programId/courses/:courseId/materials',
        name: 'CourseMaterials',
        component: () => import('@/views/school/programs/materials.vue'),
        meta: { title: 'Documents du cours' },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GESTION DES SESSIONS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Sessions',
    path: '/school/sessions',
    component: Layout,
    meta: {
      title: 'Sessions',
      icon: 'mdi:calendar-clock',
      order: 4,
    },
    children: [
      {
        path: '',
        name: 'SessionsList',
        component: () => import('@/views/school/sessions/index.vue'),
        meta: {
          title: 'Calendrier',
          icon: 'mdi:calendar',
        },
      },
      {
        path: 'create',
        name: 'SessionCreate',
        component: () => import('@/views/school/sessions/create.vue'),
        meta: { title: 'Nouvelle session' },
        isHidden: true,
      },
      {
        path: ':id',
        name: 'SessionDetail',
        component: () => import('@/views/school/sessions/detail.vue'),
        meta: { title: 'Détail session' },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GESTION DES PAIEMENTS & FACTURATION
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Facturation',
    path: '/school/payments',
    component: Layout,
    meta: {
      title: 'Facturation',
      icon: 'mdi:cash-multiple',
      order: 5,
    },
    children: [
      {
        path: '',
        name: 'PaymentsList',
        component: () => import('@/views/school/payments/index.vue'),
        meta: {
          title: 'Paiements',
          icon: 'mdi:cash',
        },
      },
      {
        path: 'invoices',
        name: 'InvoicesList',
        component: () => import('@/views/school/payments/invoices.vue'),
        meta: {
          title: 'Factures',
          icon: 'mdi:file-document',
        },
      },
      {
        path: 'invoices/:id',
        name: 'InvoiceDetail',
        component: () => import('@/views/school/payments/invoice-detail.vue'),
        meta: { title: 'Détail facture' },
        isHidden: true,
      },
      {
        path: 'reports',
        name: 'PaymentReports',
        component: () => import('@/views/school/payments/reports.vue'),
        meta: {
          title: 'Rapports',
          icon: 'mdi:chart-bar',
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GESTION DES FORMATEURS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Formateurs',
    path: '/school/instructors',
    component: Layout,
    meta: {
      title: 'Formateurs',
      icon: 'mdi:human-male-board',
      order: 6,
    },
    children: [
      {
        path: '',
        name: 'InstructorsList',
        component: () => import('@/views/school/instructors/index.vue'),
        meta: {
          title: 'Liste des formateurs',
          icon: 'mdi:account-tie',
        },
      },
      {
        path: 'create',
        name: 'InstructorCreate',
        component: () => import('@/views/school/instructors/create.vue'),
        meta: { title: 'Nouveau formateur' },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // NOTIFICATIONS EMAIL
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Notifications',
    path: '/school/notifications',
    component: Layout,
    meta: {
      title: 'Notifications',
      icon: 'mdi:bell',
      order: 7,
    },
    children: [
      {
        path: '',
        name: 'NotificationsSend',
        component: () => import('@/views/school/notifications/index.vue'),
        meta: {
          title: 'Envoyer',
          icon: 'mdi:email-send',
        },
      },
      {
        path: 'history',
        name: 'NotificationsHistory',
        component: () => import('@/views/school/notifications/history.vue'),
        meta: {
          title: 'Historique',
          icon: 'mdi:history',
        },
      },
    ],
  },
]

export default schoolRoutes
