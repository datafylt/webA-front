import i18n from '~/i18n'
import { publicRoutes } from './public'  // ← Import public routes

const { t } = i18n.global

const Layout = () => import('@/layout/index.vue')

export const basicRoutes = [
    // ═══════════════════════════════════════════════════════════
    // PUBLIC WEBSITE ROUTES (Formation Électro - No auth required)
    // ═══════════════════════════════════════════════════════════
    ...publicRoutes,

    // ═══════════════════════════════════════════════════════════
    // ADMIN ROUTES (Authentication required)
    // ═══════════════════════════════════════════════════════════
    {
        path: '/admin',
        redirect: '/workbench',
        meta: { order: 0 },
    },
    {
        name: t('views.workbench.label_workbench'),
        path: '/workbench',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/workbench/index.vue'),
                name: `${t('views.workbench.label_workbench')}Default`,
                meta: {
                    title: t('views.workbench.label_workbench'),
                    icon: 'icon-park-outline:workbench',
                    affix: true,
                },
            },
        ],
        meta: { order: 1 },
    },
    {
        name: t('views.profile.label_profile'),
        path: '/profile',
        component: Layout,
        isHidden: true,
        children: [
            {
                path: '',
                component: () => import('@/views/profile/index.vue'),
                name: `${t('views.profile.label_profile')}Default`,
                meta: {
                    title: t('views.profile.label_profile'),
                    icon: 'user',
                    affix: true,
                },
            },
        ],
        meta: { order: 99 },
    },
    {
        name: 'ErrorPage',
        path: '/error-page',
        component: Layout,
        redirect: '/error-page/404',
        meta: {
            title: t('views.errors.label_error'),
            icon: 'mdi:alert-circle-outline',
            order: 99,
        },
        children: [
            {
                name: 'ERROR-401',
                path: '401',
                component: () => import('@/views/error-page/401.vue'),
                meta: {
                    title: '401',
                    icon: 'material-symbols:authenticator',
                },
            },
            {
                name: 'ERROR-403',
                path: '403',
                component: () => import('@/views/error-page/403.vue'),
                meta: {
                    title: '403',
                    icon: 'solar:forbidden-circle-line-duotone',
                },
            },
            {
                name: 'ERROR-404',
                path: '404',
                component: () => import('@/views/error-page/404.vue'),
                meta: {
                    title: '404',
                    icon: 'tabler:error-404',
                },
            },
            {
                name: 'ERROR-500',
                path: '500',
                component: () => import('@/views/error-page/500.vue'),
                meta: {
                    title: '500',
                    icon: 'clarity:rack-server-outline-alerted',
                },
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
            title: 'Login page',
        },
    },
    {
        name: 'Multi-Site',
        path: '/multi-site',
        component: Layout,
        meta: {
            title: 'Multi-Site Management',
            icon: 'mdi:web-check',
            order: 1,
        },
        children: [
            {
                path: 'dashboard',
                name: 'Multi-Site-Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: 'Website Status',
                    icon: 'mdi:monitor-dashboard',
                    affix: true,
                },
            },
        ],
    },
    {
        name: 'Website A',
        path: '/website-a',
        component: Layout,
        meta: {
            title: 'Website A',
            icon: 'mdi:alpha-a-box',
            order: 2,
        },
        children: [
            {
                path: 'users',
                name: 'WebsiteA-Users',
                component: () => import('@/views/website-a/users/index.vue'),
                meta: {
                    title: 'Users',
                    icon: 'mdi:account-group',
                },
            },
        ],
    },
    {
        name: 'Website B',
        path: '/website-b',
        component: Layout,
        meta: {
            title: 'Website B',
            icon: 'mdi:alpha-b-box',
            order: 3,
        },
        children: [
            {
                path: 'products',
                name: 'WebsiteB-Products',
                component: () => import('@/views/website-b/products/index.vue'),
                meta: {
                    title: 'Products',
                    icon: 'mdi:package-variant',
                },
            },
        ],
    },
    // ═══════════════════════════════════════════════════════════
    // SYSTEM / DEVELOPER TOOLS
    // ═══════════════════════════════════════════════════════════
    {
        name: 'System',
        path: '/system',
        component: Layout,
        meta: {
            title: 'System',
            icon: 'mdi:cog',
            order: 10,
        },
        children: [
            {
                path: 'component-tree',
                name: 'ComponentTree',
                component: () => import('@/views/system/component-tree/index.vue'),
                meta: {
                    title: 'Component Tree',
                    icon: 'mdi:file-tree',
                },
            },
            {
                path: 'user',
                name: 'System-User',
                component: () => import('@/views/system/user/index.vue'),
                meta: {
                    title: 'Users',
                    icon: 'mdi:account-multiple',
                },
            },
            {
                path: 'role',
                name: 'System-Role',
                component: () => import('@/views/system/role/index.vue'),
                meta: {
                    title: 'Roles',
                    icon: 'mdi:shield-account',
                },
            },
            {
                path: 'menu',
                name: 'System-Menu',
                component: () => import('@/views/system/menu/index.vue'),
                meta: {
                    title: 'Menus',
                    icon: 'mdi:menu',
                },
            },
            {
                path: 'dept',
                name: 'System-Dept',
                component: () => import('@/views/system/dept/index.vue'),
                meta: {
                    title: 'Departments',
                    icon: 'mdi:office-building',
                },
            },
            {
                path: 'api',
                name: 'System-Api',
                component: () => import('@/views/system/api/index.vue'),
                meta: {
                    title: 'API',
                    icon: 'mdi:api',
                },
            },
            {
                path: 'auditlog',
                name: 'System-AuditLog',
                component: () => import('@/views/system/auditlog/index.vue'),
                meta: {
                    title: 'Audit Log',
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

// Load views each under module index.vue file
const vueModules = import.meta.glob('@/views/**/index.vue')

export { asyncRoutes, vueModules }