/**
 * Public Routes for Formation Électro
 * These routes are accessible without authentication
 */

const PublicLayout = () => import('@/layout/PublicLayout/index.vue')

export const publicRoutes = [
  {
    path: '/',
    name: 'PublicHome',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/public/home/home.vue'),
        meta: { 
          title: 'Accueil - Formation Électro Inc',
          public: true 
        }
      }
    ],
    meta: { 
      public: true,
      order: -1  // Show before admin routes
    }
  },
  {
    path: '/about',
    name: 'AboutLayout',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/public/about/about.vue'),
        meta: { 
          title: 'À propos de nous - Formation Électro Inc',
          public: true 
        }
      }
    ],
    meta: { public: true },
    isHidden: true
  },
  {
    path: '/programs',
    name: 'ProgramsLayout',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Programs',
        component: () => import('@/views/public/programs/programs.vue'),
        meta: { 
          title: 'Programmes - Formation Électro Inc',
          public: true 
        }
      },
      {
        path: ':id',
        name: 'ProgramDetail',
        component: () => import('@/views/public/programs/program-detail.vue'),
        meta: { 
          title: 'Programme - Formation Électro Inc',
          public: true 
        }
      }
    ],
    meta: { public: true },
    isHidden: true
  },
  {
    path: '/instructors',
    name: 'InstructorsLayout',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Instructors',
        component: () => import('@/views/public/instructors/instructors.vue'),
        meta: { 
          title: 'Nos instructeurs - Formation Électro Inc',
          public: true 
        }
      }
    ],
    meta: { public: true },
    isHidden: true
  },
  {
    path: '/contact',
    name: 'ContactLayout',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Contact',
        component: () => import('@/views/public/contact/contact.vue'),
        meta: { 
          title: 'Contactez-nous - Formation Électro Inc',
          public: true 
        }
      }
    ],
    meta: { public: true },
    isHidden: true
  }
]

export default publicRoutes
