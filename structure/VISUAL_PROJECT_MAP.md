# 🗺️ Vue FastAPI Admin - Visual Project Map

## 📊 Project at a Glance

```
┌────────────────────────────────────────────────────────────────┐
│                     VUE FASTAPI ADMIN                          │
│                                                                 │
│  Frontend: Vue 3 + Vite + Naive UI + Pinia                    │
│  Backend: FastAPI (Python)                                     │
│  Architecture: SPA with RBAC                                   │
│                                                                 │
│  📦 28 Components  |  📄 14 Pages  |  🗃️ 4 Stores             │
└────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Application Architecture Map

```
                    ┌──────────────────┐
                    │    Browser       │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   index.html     │
                    │   (Entry Point)  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │    main.js       │
                    │  (Bootstrap App) │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
       ┌────▼────┐      ┌───▼────┐      ┌───▼────┐
       │  Store  │      │ Router │      │ Plugins│
       │ (Pinia) │      │ (Vue   │      │ (i18n, │
       │         │      │ Router)│      │  etc.) │
       └────┬────┘      └───┬────┘      └────────┘
            │               │
            └───────┬───────┘
                    │
            ┌───────▼────────┐
            │    App.vue     │
            │  (Root Comp)   │
            └───────┬────────┘
                    │
            ┌───────▼────────┐
            │  AppProvider   │
            │ (Theme, i18n)  │
            └───────┬────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   ┌────▼─────┐          ┌─────▼─────┐
   │  Login   │          │  Layout   │
   │  Page    │          │ Container │
   └──────────┘          └─────┬─────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   ┌────▼────┐          ┌─────▼─────┐         ┌─────▼─────┐
   │ Sidebar │          │  Header   │         │   Tags    │
   │ (Menu)  │          │  (Actions)│         │  (Tabs)   │
   └─────────┘          └───────────┘         └───────────┘
                               │
                        ┌──────▼──────┐
                        │   AppMain   │
                        │  (Content)  │
                        └──────┬──────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
              ┌─────▼──────┐      ┌──────▼─────┐
              │ Dashboard  │      │   System   │
              │ (Workbench)│      │   Pages    │
              └────────────┘      └──────┬─────┘
                                         │
                         ┌───────────────┼───────────────┐
                         │               │               │
                    ┌────▼────┐    ┌────▼────┐    ┌─────▼────┐
                    │  User   │    │  Role   │    │   Menu   │
                    │  Mgmt   │    │  Mgmt   │    │   Mgmt   │
                    └─────────┘    └─────────┘    └──────────┘
```

---

## 📂 File System Map

```
web/ (project root)
│
├── 🌐 PUBLIC FILES
│   ├── index.html ──────────────► HTML entry point
│   ├── favicon.svg ─────────────► App icon
│   └── resource/
│       ├── loading.css ─────────► Loading styles
│       └── loading.js ──────────► Loading script
│
├── ⚙️ CONFIGURATION
│   ├── .env ────────────────────► Base environment
│   ├── .env.development ────────► Dev environment
│   ├── .env.production ─────────► Prod environment
│   ├── vite.config.js ──────────► Vite config
│   ├── unocss.config.js ────────► UnoCSS config
│   ├── package.json ────────────► Dependencies
│   └── jsconfig.json ───────────► JS config
│
├── 🎨 SETTINGS
│   └── settings/
│       ├── index.js ────────────► App settings
│       └── theme.json ──────────► Theme config
│
└── 💻 SOURCE CODE (src/)
    │
    ├── 📄 ENTRY POINTS
    │   ├── main.js ─────────────► App bootstrap
    │   └── App.vue ─────────────► Root component
    │
    ├── 🧩 COMPONENTS (28 total)
    │   ├── common/ (4) ─────────► App-wide components
    │   │   ├── AppProvider.vue ─► Global provider
    │   │   ├── AppFooter.vue ───► Footer
    │   │   ├── LoadingEmpty... ─► Loading/empty wrapper
    │   │   └── ScrollX.vue ─────► Horizontal scroll
    │   │
    │   ├── icon/ (4) ───────────► Icon system
    │   │   ├── TheIcon.vue ─────► Main icon component
    │   │   ├── SvgIcon.vue ─────► SVG renderer
    │   │   ├── CustomIcon.vue ──► Custom icons
    │   │   └── IconPicker.vue ──► Icon selector
    │   │
    │   ├── page/ (2) ───────────► Page wrappers
    │   │   ├── CommonPage.vue ──► Standard page layout
    │   │   └── AppPage.vue ─────► Alternative layout
    │   │
    │   ├── query-bar/ (2) ──────► Search/filter
    │   │   ├── QueryBar.vue ────► Container
    │   │   └── QueryBarItem.vue ► Individual filter
    │   │
    │   └── table/ (2) ──────────► CRUD tables
    │       ├── CrudTable.vue ───► Data table
    │       └── CrudModal.vue ───► Create/edit modal
    │
    ├── 🏗️ LAYOUT (13 components)
    │   ├── index.vue ───────────► Main layout container
    │   └── components/
    │       ├── AppMain.vue ─────► Content area
    │       │
    │       ├── header/ (7) ─────► Header components
    │       │   ├── index.vue ───► Header container
    │       │   └── components/
    │       │       ├── BreadCrumb.vue
    │       │       ├── FullScreen.vue
    │       │       ├── GithubSite.vue
    │       │       ├── Languages.vue
    │       │       ├── MenuCollapse.vue
    │       │       ├── ThemeMode.vue
    │       │       └── UserAvatar.vue
    │       │
    │       ├── sidebar/ (3) ────► Sidebar components
    │       │   ├── index.vue ───► Sidebar container
    │       │   └── components/
    │       │       ├── SideLogo.vue
    │       │       └── SideMenu.vue
    │       │
    │       └── tags/ (2) ───────► Tags components
    │           ├── index.vue ───► Tags container
    │           └── ContextMenu.vue
    │
    ├── 📄 VIEWS (14 pages)
    │   ├── login/ ──────────────► Login page
    │   │   └── index.vue
    │   │
    │   ├── workbench/ ──────────► Dashboard
    │   │   └── index.vue
    │   │
    │   ├── profile/ ────────────► User profile
    │   │   └── index.vue
    │   │
    │   ├── system/ ─────────────► System management (6 pages)
    │   │   ├── user/index.vue ──► User management
    │   │   ├── role/index.vue ──► Role management
    │   │   ├── menu/index.vue ──► Menu management
    │   │   ├── dept/index.vue ──► Department management
    │   │   ├── api/index.vue ───► API management
    │   │   └── auditlog/index...► Audit logs
    │   │
    │   ├── error-page/ ─────────► Error pages (4)
    │   │   ├── 401.vue ─────────► Unauthorized
    │   │   ├── 403.vue ─────────► Forbidden
    │   │   ├── 404.vue ─────────► Not Found
    │   │   └── 500.vue ─────────► Server Error
    │   │
    │   └── top-menu/ ───────────► Top menu example
    │       └── index.vue
    │
    ├── 🗃️ STORE (4 modules)
    │   ├── index.js ────────────► Store setup
    │   └── modules/
    │       ├── app/ ────────────► App settings store
    │       │   └── index.js
    │       │
    │       ├── user/ ───────────► User auth store
    │       │   └── index.js
    │       │
    │       ├── permission/ ─────► Permissions store
    │       │   └── index.js
    │       │
    │       └── tags/ ───────────► Tags store
    │           ├── index.js
    │           └── helpers.js
    │
    ├── 🛣️ ROUTER
    │   ├── index.js ────────────► Router setup
    │   ├── routes/
    │   │   └── index.js ────────► Route definitions
    │   │
    │   └── guard/ ──────────────► Router guards (3)
    │       ├── index.js
    │       ├── auth-guard.js ───► Authentication
    │       ├── page-loading-...─► Loading indicator
    │       └── page-title-gua..─► Page title
    │
    ├── 🔧 UTILS (12 files)
    │   ├── index.js ────────────► Utils exports
    │   │
    │   ├── auth/ ───────────────► Auth utilities
    │   │   ├── index.js
    │   │   ├── auth.js
    │   │   └── token.js
    │   │
    │   ├── common/ ─────────────► Common utilities
    │   │   ├── index.js
    │   │   ├── common.js
    │   │   ├── icon.js
    │   │   ├── is.js
    │   │   ├── naiveTools.js
    │   │   └── useResize.js
    │   │
    │   ├── http/ ───────────────► HTTP client
    │   │   ├── index.js
    │   │   ├── helpers.js
    │   │   └── interceptors.js
    │   │
    │   └── storage/ ────────────► Storage utilities
    │       ├── index.js
    │       └── storage.js
    │
    ├── 🌐 API
    │   └── index.js ────────────► API endpoints
    │
    ├── 🎨 STYLES
    │   ├── global.scss ─────────► Global SCSS
    │   └── reset.css ───────────► CSS reset
    │
    ├── 🎬 DIRECTIVES
    │   ├── index.js ────────────► Directives registration
    │   └── permission.js ───────► Permission directive
    │
    ├── 🪝 COMPOSABLES
    │   ├── index.js ────────────► Composables exports
    │   └── useCRUD.js ──────────► CRUD operations hook
    │
    └── 🎨 ASSETS
        ├── images/ ─────────────► Image files (3)
        ├── svg/ ────────────────► SVG icons (9)
        └── js/
            └── icons.js ────────► Icon definitions
```

---

## 🔄 Data Flow Map

```
┌─────────────────────────────────────────────────────────────┐
│                      USER INTERACTIONS                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ├─► Click Menu Item
                  ├─► Submit Form
                  ├─► Click Button
                  └─► Change Input
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                           │
│  Components emit events / call methods                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
     ┌────────────┼────────────┐
     │            │            │
     ▼            ▼            ▼
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Router  │  │  Store  │  │   API   │
│ (Vue    │  │ (Pinia) │  │ (Axios) │
│ Router) │  │         │  │         │
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
     │            │            ▼
     │            │       ┌─────────────┐
     │            │       │ Request     │
     │            │       │ Interceptor │
     │            │       └─────┬───────┘
     │            │             │
     │            │             │ Add Token
     │            │             │ Add Headers
     │            │             │
     │            │             ▼
     │            │       ┌─────────────┐
     │            │       │  Backend    │
     │            │       │  (FastAPI)  │
     │            │       └─────┬───────┘
     │            │             │
     │            │             ▼
     │            │       ┌─────────────┐
     │            │       │ Response    │
     │            │       │ Interceptor │
     │            │       └─────┬───────┘
     │            │             │
     │            ▼             │ Handle Errors
     │       ┌─────────┐        │ Parse Data
     │       │ Update  │◄───────┘
     │       │ Store   │
     │       │ State   │
     │       └────┬────┘
     │            │
     ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                  REACTIVE UI UPDATES                         │
│  Components automatically re-render with new data            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow Map

```
┌──────────────┐
│ 1. User      │
│    Opens App │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 2. Router    │     No Token ──────┐
│    Guard     │                     │
└──────┬───────┘                     │
       │ Has Token                   │
       │                             │
       ▼                             ▼
┌──────────────┐            ┌────────────────┐
│ 3. Fetch     │            │ 8. Show Login  │
│    User Info │            │    Page        │
└──────┬───────┘            └────────┬───────┘
       │                             │
       ▼                             │ User Logs In
┌──────────────┐                     │
│ 4. Generate  │                     │
│    Routes    │◄────────────────────┘
└──────┬───────┘          Store Token
       │
       ▼
┌──────────────┐
│ 5. Build     │
│    Menu Tree │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 6. Add       │
│    Dynamic   │
│    Routes    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 7. Render    │
│    Layout    │
└──────────────┘
```

---

## 🎯 Component Usage Map

```
Most Basic Page:
┌─────────────────┐
│   CommonPage    │ ◄─── Page wrapper
└────────┬────────┘
         │
         └─► Your content here


Standard CRUD Page:
┌─────────────────┐
│   CommonPage    │ ◄─── Page wrapper
└────────┬────────┘
         │
         ├─► ┌─────────────┐
         │   │  QueryBar   │ ◄─── Search filters
         │   └─────────────┘
         │
         └─► ┌─────────────┐
             │ CrudTable   │ ◄─── Data table
             └─────┬───────┘
                   │
                   ├─► n-data-table (Naive UI)
                   │
                   └─► ┌─────────────┐
                       │ CrudModal   │ ◄─── Create/Edit form
                       └─────────────┘


Custom Page with Icons:
┌─────────────────┐
│   CommonPage    │
└────────┬────────┘
         │
         ├─► ┌─────────────┐
         │   │  TheIcon    │ ◄─── Icon component
         │   └─────────────┘
         │
         └─► Your custom layout
```

---

## 📊 Store Interaction Map

```
Components
    │
    ├─► useAppStore()
    │   ├─► collapsed (sidebar state)
    │   ├─► theme (light/dark)
    │   ├─► locale (language)
    │   └─► actions (setCollapsed, setTheme, etc.)
    │
    ├─► useUserStore()
    │   ├─► userInfo (user data)
    │   ├─► token (JWT token)
    │   ├─► userId (user ID)
    │   └─► actions (login, logout, getUserInfo)
    │
    ├─► usePermissionStore()
    │   ├─► menus (menu tree)
    │   ├─► routes (accessible routes)
    │   ├─► apis (API permissions)
    │   └─► actions (generateRoutes, getAccessApis)
    │
    └─► useTagsStore()
        ├─► tags (opened tabs)
        ├─► activeTag (current tab)
        └─► actions (addTag, removeTag, etc.)
```

---

## 🎨 Styling System Map

```
UnoCSS (Atomic CSS)
    │
    ├─► Utility Classes
    │   ├─► Layout: flex, grid, block
    │   ├─► Spacing: p-4, m-2, px-8
    │   ├─► Colors: bg-blue-500, text-white
    │   ├─► Typography: text-lg, font-bold
    │   └─► Responsive: md:text-base, lg:p-8
    │
    └─► Dark Mode Support
        └─► dark:bg-gray-800, dark:text-white

SCSS (Global Styles)
    │
    ├─► src/styles/global.scss
    │   ├─► Variables
    │   ├─► Mixins
    │   └─► Global classes
    │
    └─► Component <style scoped>
        └─► Component-specific styles

Naive UI Theme
    │
    └─► Theme Customization
        ├─► Primary color
        ├─► Border radius
        ├─► Font family
        └─► Component overrides
```

---

## 🛣️ Routing Map

```
Basic Routes (Always Available):
    /
    ├─► /login ──────────────► Login page
    ├─► /workbench ──────────► Dashboard (default)
    ├─► /profile ────────────► User profile
    └─► /error-page
        ├─► /401 ────────────► Unauthorized
        ├─► /403 ────────────► Forbidden
        ├─► /404 ────────────► Not Found
        └─► /500 ────────────► Server Error

Dynamic Routes (Permission-Based):
    /system
    ├─► /user ───────────────► User management
    ├─► /role ───────────────► Role management
    ├─► /menu ───────────────► Menu management
    ├─► /dept ───────────────► Department management
    ├─► /api ────────────────► API management
    └─► /auditlog ───────────► Audit logs

    /top-menu ──────────────► Top menu example

Catch-All:
    /* ──────────────────────► 404 redirect
```

---

## 📦 Build Output Map

```
After 'pnpm build':

dist/
├── index.html ──────────► Entry HTML (with asset links)
│
├── assets/
│   ├── index-[hash].js ─► Main bundle (~350KB)
│   │   ├─► App code
│   │   ├─► Components
│   │   └─► Views
│   │
│   ├── vendor-[hash].js ► Dependencies (~150KB)
│   │   ├─► Vue
│   │   ├─► Vue Router
│   │   ├─► Pinia
│   │   ├─► Naive UI
│   │   └─► Other libs
│   │
│   ├── index-[hash].css ► Styles (~50KB)
│   │   ├─► Global styles
│   │   ├─► Component styles
│   │   └─► UnoCSS utilities
│   │
│   └── images/
│       └── [images with hash]
│
└── favicon.svg

Gzipped (~150KB total):
├── index-[hash].js.gz
├── vendor-[hash].js.gz
└── index-[hash].css.gz
```

---

## 🎯 Quick Navigation Guide

```
Need to...                  Go to...
────────────────────────────────────────────────────────
Add new page                src/views/[module]/[page]/
Add new component           src/components/[category]/
Add API endpoint            src/api/index.js
Add store module            src/store/modules/[name]/
Add route guard             src/router/guard/
Add utility function        src/utils/[category]/
Add directive               src/directives/
Add composable              src/composables/
Change theme                settings/theme.json
Configure build             vite.config.js
Add dependency              package.json
```

---

## 📊 Project Metrics Summary

```
┌────────────────────────────────────────────┐
│         PROJECT STATISTICS                 │
├────────────────────────────────────────────┤
│ Total Files:           ~100+ files         │
│ Vue Components:        28 components       │
│ Page Views:            14 pages            │
│ Store Modules:         4 modules           │
│ Utilities:             12 files            │
│ Router Guards:         3 guards            │
│ Directives:            1 directive         │
│ Composables:           1 composable        │
│                                            │
│ Lines of Code:         ~5,000 lines        │
│ Bundle Size:           ~500KB (uncompressed)│
│ Gzipped Size:          ~150KB              │
│ Load Time:             < 2 seconds         │
└────────────────────────────────────────────┘
```

---

This visual map provides a quick reference for navigating and understanding the complete project structure at a glance! 🚀
