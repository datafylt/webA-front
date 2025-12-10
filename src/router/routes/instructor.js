/**
 * Instructor Portal Routes
 * Portail instructeur - Formation Électro
 */

const Layout = () => import('@/layout/index.vue')

export const instructorRoutes = [
  // ═══════════════════════════════════════════════════════════
  // TABLEAU DE BORD INSTRUCTEUR
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Espace Formateur',
    path: '/instructor',
    component: Layout,
    redirect: '/instructor/dashboard',
    meta: {
      title: 'Espace Formateur',
      icon: 'mdi:view-dashboard',
      order: 1,
      roles: ['instructor'],
    },
    children: [
      {
        path: 'dashboard',
        name: 'InstructorDashboard',
        component: () => import('@/views/instructor/dashboard/index.vue'),
        meta: {
          title: 'Tableau de bord',
          icon: 'mdi:home',
          affix: true,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MES ÉTUDIANTS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mes Étudiants',
    path: '/instructor/students',
    component: Layout,
    meta: {
      title: 'Mes Étudiants',
      icon: 'mdi:account-school',
      order: 2,
      roles: ['instructor'],
    },
    children: [
      {
        path: '',
        name: 'InstructorStudents',
        component: () => import('@/views/instructor/students/index.vue'),
        meta: {
          title: 'Liste étudiants',
          icon: 'mdi:account-group',
        },
      },
      {
        path: ':id',
        name: 'InstructorStudentDetail',
        component: () => import('@/views/instructor/students/detail.vue'),
        meta: {
          title: 'Détail étudiant',
        },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MES COURS (Gestion contenu)
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mes Cours',
    path: '/instructor/courses',
    component: Layout,
    meta: {
      title: 'Mes Cours',
      icon: 'mdi:book-education',
      order: 3,
      roles: ['instructor'],
    },
    children: [
      {
        path: '',
        name: 'InstructorCourses',
        component: () => import('@/views/instructor/courses/index.vue'),
        meta: {
          title: 'Programmes assignés',
          icon: 'mdi:book-multiple',
        },
      },
      {
        path: ':programId/content',
        name: 'InstructorCourseContent',
        component: () => import('@/views/instructor/courses/content.vue'),
        meta: {
          title: 'Gérer le contenu',
        },
        isHidden: true,
      },
      {
        path: ':programId/upload',
        name: 'InstructorUploadMaterial',
        component: () => import('@/views/instructor/courses/upload.vue'),
        meta: {
          title: 'Ajouter document',
        },
        isHidden: true,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MES SESSIONS
  // ═══════════════════════════════════════════════════════════
  {
    name: 'Mes Sessions',
    path: '/instructor/sessions',
    component: Layout,
    meta: {
      title: 'Mes Sessions',
      icon: 'mdi:calendar-clock',
      order: 4,
      roles: ['instructor'],
    },
    children: [
      {
        path: '',
        name: 'InstructorSessions',
        component: () => import('@/views/instructor/sessions/index.vue'),
        meta: {
          title: 'Calendrier',
          icon: 'mdi:calendar',
        },
      },
      {
        path: ':id/attendance',
        name: 'SessionAttendance',
        component: () => import('@/views/instructor/sessions/attendance.vue'),
        meta: {
          title: 'Présences',
        },
        isHidden: true,
      },
    ],
  },
]

export default instructorRoutes
