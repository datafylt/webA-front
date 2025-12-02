# Component Relationship Trees & Diagrams

## 🌳 Complete Component Tree

```
App.vue (Root)
│
└─► AppProvider
      │
      └─► <router-view>
            │
            ├─► Login Page (Unauthenticated)
            │   │
            │   └─► views/login/index.vue
            │         ├─► n-form (Naive UI)
            │         ├─► n-input (Username)
            │         ├─► n-input (Password)
            │         └─► n-button (Submit)
            │
            └─► Layout (Authenticated)
                  │
                  ├─► Sidebar
                  │   │
                  │   ├─► SideLogo
                  │   │     ├─► <img> (Logo)
                  │   │     └─► <span> (App name)
                  │   │
                  │   └─► SideMenu
                  │         └─► n-menu (Naive UI)
                  │               └─► Menu items (dynamic from permissions)
                  │                     ├─► Parent menu item
                  │                     │     └─► Child menu items
                  │                     │           └─► Leaf menu items
                  │                     │
                  │                     └─► Icons (TheIcon component)
                  │
                  ├─► Header
                  │   │
                  │   ├─► MenuCollapse
                  │   │     └─► TheIcon (menu toggle icon)
                  │   │
                  │   ├─► BreadCrumb
                  │   │     └─► n-breadcrumb
                  │   │           └─► n-breadcrumb-item (each level)
                  │   │
                  │   ├─► FullScreen
                  │   │     └─► TheIcon (fullscreen icon)
                  │   │
                  │   ├─► GithubSite
                  │   │     └─► TheIcon (GitHub icon)
                  │   │
                  │   ├─► Languages
                  │   │     └─► n-dropdown
                  │   │           └─► Language options
                  │   │
                  │   ├─► ThemeMode
                  │   │     └─► TheIcon (sun/moon icon)
                  │   │
                  │   └─► UserAvatar
                  │         └─► n-dropdown
                  │               ├─► Profile item
                  │               ├─► Settings item
                  │               └─► Logout item
                  │
                  ├─► Tags (Tab Bar)
                  │   │
                  │   ├─► ScrollX (horizontal scroll container)
                  │   │     └─► Tag items (each opened page)
                  │   │           ├─► n-tag (closable)
                  │   │           └─► Active tag highlight
                  │   │
                  │   └─► ContextMenu (right-click menu)
                  │         ├─► Close current
                  │         ├─► Close others
                  │         ├─► Close all
                  │         └─► Refresh
                  │
                  └─► AppMain
                        │
                        └─► <router-view> (Dynamic content)
                              │
                              ├─► Workbench Page
                              │     └─► views/workbench/index.vue
                              │           ├─► CommonPage
                              │           ├─► Dashboard widgets
                              │           └─► Statistics cards
                              │
                              ├─► System Pages (CRUD)
                              │     │
                              │     ├─► User Management
                              │     │     └─► views/system/user/index.vue
                              │     │           ├─► CommonPage
                              │     │           ├─► QueryBar
                              │     │           │     └─► QueryBarItem (filters)
                              │     │           └─► CrudTable
                              │     │                 ├─► n-data-table
                              │     │                 ├─► Action buttons
                              │     │                 └─► CrudModal
                              │     │                       └─► n-form (create/edit)
                              │     │
                              │     ├─► Role Management
                              │     │     └─► (Same structure as User)
                              │     │
                              │     ├─► Menu Management
                              │     │     └─► (Tree structure + CRUD)
                              │     │
                              │     ├─► Department Management
                              │     │     └─► (Tree structure + CRUD)
                              │     │
                              │     ├─► API Management
                              │     │     └─► (Table + CRUD)
                              │     │
                              │     └─► Audit Log
                              │           └─► (Read-only table)
                              │
                              ├─► Profile Page
                              │     └─► views/profile/index.vue
                              │           ├─► User info display
                              │           └─► Edit form
                              │
                              └─► Error Pages
                                    ├─► 401.vue (Unauthorized)
                                    ├─► 403.vue (Forbidden)
                                    ├─► 404.vue (Not Found)
                                    └─► 500.vue (Server Error)
```

---

## 🎯 Core Component Deep Dive

### 1. CrudTable Component Structure

```
CrudTable.vue
│
├─► Props Received:
│   ├─► columns: Column definitions
│   ├─► getData: API function to fetch data
│   ├─► createData: API function to create
│   ├─► updateData: API function to update
│   ├─► deleteData: API function to delete
│   └─► queryItems: Search/filter parameters
│
├─► Slots Provided:
│   ├─► #queryBar → QueryBar component
│   ├─► #actions → Custom action buttons
│   └─► #expand → Expandable row content
│
├─► Internal Structure:
│   │
│   ├─► QueryBar Section (if slot provided)
│   │     ├─► QueryBarItem (for each filter)
│   │     ├─► Search button
│   │     └─► Reset button
│   │
│   ├─► Action Bar
│   │     ├─► Create button
│   │     ├─► Refresh button
│   │     ├─► Export button (optional)
│   │     └─► Custom actions (slot)
│   │
│   ├─► n-data-table (Naive UI)
│   │     ├─► Column headers (sortable)
│   │     ├─► Data rows
│   │     ├─► Selection checkboxes (optional)
│   │     ├─► Expand rows (optional)
│   │     │
│   │     └─► Actions column
│   │           ├─► Edit button
│   │           ├─► Delete button
│   │           └─► Custom actions
│   │
│   ├─► Pagination
│   │     ├─► Page size selector
│   │     ├─► Total records
│   │     └─► Page navigation
│   │
│   └─► CrudModal
│         ├─► Title (Create/Edit)
│         ├─► n-form
│         │     └─► Form fields (dynamic)
│         ├─► Cancel button
│         └─► Submit button
│
└─► Emits:
      ├─► @create → After create success
      ├─► @update → After update success
      ├─► @delete → After delete success
      └─► @refresh → Manual refresh
```

---

### 2. Layout Component Breakdown

```
Layout Container (index.vue)
│
├─► Template Structure:
│   │
│   └─► n-layout (has-sider)
│         │
│         ├─► n-layout-sider (left sidebar)
│         │   │
│         │   └─► SideBar Component
│         │         │
│         │         ├─► SideLogo
│         │         │     ├─► State: collapsed
│         │         │     ├─► Renders: Logo + App name
│         │         │     └─► Click: Navigate to home
│         │         │
│         │         └─► SideMenu
│         │               ├─► Data: permissionStore.menus
│         │               ├─► Active: curRoute.path
│         │               └─► Click: Navigate to route
│         │
│         └─► <article> (main content area)
│               │
│               ├─► <header> (top bar)
│               │     │
│               │     └─► AppHeader
│               │           │
│               │           ├─► MenuCollapse
│               │           │     └─► Toggle sidebar collapse
│               │           │
│               │           ├─► BreadCrumb
│               │           │     └─► Show current path
│               │           │
│               │           ├─► (Space/Flex spacer)
│               │           │
│               │           ├─► FullScreen
│               │           │     └─► Toggle fullscreen
│               │           │
│               │           ├─► GithubSite
│               │           │     └─► Open GitHub
│               │           │
│               │           ├─► Languages
│               │           │     └─► Switch language
│               │           │
│               │           ├─► ThemeMode
│               │           │     └─► Toggle theme
│               │           │
│               │           └─► UserAvatar
│               │                 ├─► User icon + name
│               │                 └─► Dropdown menu
│               │                       ├─► Profile
│               │                       └─► Logout
│               │
│               ├─► <section> (tags bar)
│               │     │
│               │     └─► AppTags
│               │           │
│               │           ├─► ScrollX wrapper
│               │           │     └─► Tag items
│               │           │           ├─► Each opened page
│               │           │           ├─► Active highlight
│               │           │           └─► Close button
│               │           │
│               │           └─► ContextMenu
│               │                 ├─► Right-click triggered
│               │                 └─► Menu options
│               │
│               └─► <section> (page content)
│                     │
│                     └─► AppMain
│                           │
│                           └─► <router-view>
│                                 ├─► Keep-alive wrapper
│                                 ├─► Transition effects
│                                 └─► Page component
│
├─► Script Setup:
│   │
│   ├─► Imports:
│   │     ├─► AppHeader component
│   │     ├─► SideBar component
│   │     ├─► AppMain component
│   │     ├─► AppTags component
│   │     └─► useAppStore
│   │
│   ├─► Reactive State:
│   │     ├─► appStore (collapsed, theme)
│   │     └─► breakpoints (responsive)
│   │
│   └─► Watchers:
│         └─► Responsive behavior
│               ├─► isMobile → collapse sidebar
│               ├─► isPad → collapse sidebar
│               └─► isPC → expand sidebar
│
└─► Styling:
      ├─► Flexbox layout
      ├─► Dynamic heights
      ├─► Dark mode support
      └─► Responsive breakpoints
```

---

### 3. Icon Component Hierarchy

```
Icon System
│
├─► TheIcon.vue (Main icon component)
│   │
│   ├─► Props:
│   │     ├─► icon: string (icon name)
│   │     ├─► size: number (icon size)
│   │     └─► color: string (icon color)
│   │
│   ├─► Logic:
│   │     ├─► Check if icon is custom SVG
│   │     ├─► Check if icon is Iconify
│   │     └─► Render appropriate component
│   │
│   └─► Renders:
│         ├─► SvgIcon (if custom)
│         └─► Icon (Iconify component)
│
├─► SvgIcon.vue (Custom SVG icons)
│   │
│   ├─► Uses: vite-plugin-svg-icons
│   ├─► Loads: src/assets/svg/*.svg
│   │
│   └─► Template:
│         └─► <svg><use :xlink:href="`#icon-${name}`" /></svg>
│
├─► CustomIcon.vue (Custom icon wrapper)
│   │
│   ├─► For: Complex custom icons
│   └─► Renders: SVG or custom component
│
└─► IconPicker.vue (Icon selection dialog)
      │
      ├─► Template:
      │     ├─► n-modal
      │     ├─► Search input
      │     ├─► Icon grid
      │     │     └─► TheIcon (for each icon)
      │     └─► Select button
      │
      └─► Logic:
            ├─► Load all Iconify icons
            ├─► Filter by search
            ├─► Click to select
            └─► Emit selected icon
```

---

## 🔄 Data Flow Diagrams

### User Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Visit app
       ▼
┌─────────────────────┐
│   Router Guard      │
│  (auth-guard.js)    │
└──────┬──────────────┘
       │ 2. Check token
       │
       ├─► No token ──────────────┐
       │                           │
       └─► Has token ─────┐       │
                          │       │
                          ▼       ▼
                ┌──────────────────────┐     ┌──────────────┐
                │  User Store          │     │  Login Page  │
                │  getUserInfo()       │     └──────┬───────┘
                └──────┬───────────────┘            │
                       │ 3. Fetch user info         │ 4. Enter credentials
                       ▼                            │
                ┌──────────────────────┐            │ 5. Submit
                │  Backend API         │◄───────────┘
                │  /api/v1/auth/me     │
                └──────┬───────────────┘
                       │ Returns user data
                       ▼
                ┌──────────────────────┐
                │  Permission Store    │
                │  generateRoutes()    │
                └──────┬───────────────┘
                       │ 6. Fetch menus
                       ▼
                ┌──────────────────────┐
                │  Backend API         │
                │  /api/v1/menus       │
                └──────┬───────────────┘
                       │ Returns menu tree
                       ▼
                ┌──────────────────────┐
                │  Router              │
                │  addRoute() dynamic  │
                └──────┬───────────────┘
                       │ 7. Add routes
                       ▼
                ┌──────────────────────┐
                │  Layout Component    │
                │  (Sidebar + Header)  │
                └──────────────────────┘
```

---

### CRUD Operation Flow (Example: Create User)

```
┌──────────────────┐
│  User Interface  │
│  (CrudTable)     │
└────────┬─────────┘
         │ 1. Click "Create" button
         ▼
┌──────────────────┐
│   CrudModal      │
│   (opened)       │
└────────┬─────────┘
         │ 2. Display empty form
         │
         │ User fills form:
         │  - Username
         │  - Email
         │  - Role
         │
         │ 3. Click "Submit"
         ▼
┌──────────────────┐
│  Form Validation │
│  (n-form rules)  │
└────────┬─────────┘
         │
         ├─► Invalid ──┐
         │             │ Show errors
         │             └─► Stay on form
         │
         └─► Valid
                ▼
         ┌──────────────────┐
         │  API Call        │
         │  api.createUser()│
         └────────┬─────────┘
                  │ 4. POST /api/v1/users
                  │    Headers: { Authorization: Bearer <token> }
                  │    Body: { username, email, role_id }
                  ▼
         ┌──────────────────┐
         │  HTTP Interceptor│
         │  (Request)       │
         └────────┬─────────┘
                  │ 5. Add token to headers
                  ▼
         ┌──────────────────┐
         │  Backend API     │
         │  (FastAPI)       │
         └────────┬─────────┘
                  │ 6. Process request
                  │    - Validate token
                  │    - Check permissions
                  │    - Create user in DB
                  │    - Return user data
                  ▼
         ┌──────────────────┐
         │  HTTP Interceptor│
         │  (Response)      │
         └────────┬─────────┘
                  │ 7. Check response status
                  │
                  ├─► Success (200) ─────┐
                  │                       │
                  └─► Error (4xx/5xx) ──┐│
                                        ││
            ┌───────────────────────────┘│
            │ Show error message         │
            │ (n-message)                │
            └───────────────────────────┐│
                                        ││
         ┌──────────────────────────────▼▼─┐
         │  UI Updates                     │
         │  - Show success message         │
         │  - Close modal                  │
         │  - Refresh table data           │
         │  - Highlight new row            │
         └─────────────────────────────────┘
```

---

### Route Navigation Flow

```
┌────────────────┐
│  User Action   │
│  (Click menu)  │
└───────┬────────┘
        │ router.push('/system/user')
        ▼
┌────────────────────┐
│  Router Guards     │
│  (beforeEach)      │
└───────┬────────────┘
        │
        ├─► Page Loading Guard
        │     └─► Show loading indicator
        │
        ├─► Auth Guard
        │     ├─► Check token
        │     ├─► Check user info
        │     └─► Check permissions
        │
        └─► Page Title Guard
              └─► Set document.title
        │
        ▼
┌────────────────────┐
│  Route Component   │
│  (views/system/    │
│   user/index.vue)  │
└───────┬────────────┘
        │
        ├─► onMounted()
        │     └─► Fetch initial data
        │
        ├─► Component renders
        │     ├─► CommonPage
        │     ├─► QueryBar
        │     └─► CrudTable
        │
        └─► Tags Store
              └─► addTag(route)
        │
        ▼
┌────────────────────┐
│  After Navigation  │
│  (afterEach)       │
└───────┬────────────┘
        │
        └─► Hide loading indicator
        │
        ▼
┌────────────────────┐
│  Page Displayed    │
└────────────────────┘
```

---

## 🧩 Reusable Component Patterns

### Pattern 1: CRUD Page Template

```vue
<!-- views/system/[entity]/index.vue -->
<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.getEntityList"
      :create-data="api.createEntity"
      :update-data="api.updateEntity"
      :delete-data="api.deleteEntity"
    >
      <!-- Query Bar Slot -->
      <template #queryBar>
        <QueryBarItem label="Name">
          <n-input v-model:value="queryItems.name" />
        </QueryBarItem>
        <QueryBarItem label="Status">
          <n-select v-model:value="queryItems.status" :options="statusOptions" />
        </QueryBarItem>
      </template>

      <!-- Custom Actions Slot (Optional) -->
      <template #actions>
        <n-button @click="handleExport">Export</n-button>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import CommonPage from '@/components/page/CommonPage.vue'
import CrudTable from '@/components/table/CrudTable.vue'
import QueryBarItem from '@/components/query-bar/QueryBarItem.vue'

const $table = ref(null)
const queryItems = ref({})

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Created At', key: 'created_at' },
]

const statusOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 0 },
]

function handleExport() {
  // Export logic
}
</script>
```

### Pattern 2: Header Action Component

```vue
<!-- layout/components/header/components/[Action].vue -->
<template>
  <div class="header-action" @click="handleClick">
    <TheIcon :icon="icon" :size="20" />
    <span v-if="showLabel">{{ label }}</span>
  </div>
</template>

<script setup>
import TheIcon from '@/components/icon/TheIcon.vue'

defineProps({
  icon: String,
  label: String,
  showLabel: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

function handleClick() {
  // Action logic
  emit('click')
}
</script>

<style scoped>
.header-action {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.header-action:hover {
  background-color: var(--hover-color);
}
</style>
```

---

## 📊 Store Interaction Map

```
┌─────────────────────────────────────────────────────────────┐
│                        Components                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layout   Header   Sidebar   Tags   Pages   Modals          │
│    │       │         │        │       │       │             │
│    └───────┴─────────┴────────┴───────┴───────┘             │
│                      │                                       │
│                      │ useXxxStore()                        │
│                      ▼                                       │
├─────────────────────────────────────────────────────────────┤
│                     Pinia Stores                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌────────────┐  ┌──────────────┐        │
│  │  App Store  │  │ User Store │  │ Permission   │         │
│  │             │  │            │  │    Store     │         │
│  │ - collapsed │  │ - userInfo │  │ - menus      │         │
│  │ - theme     │  │ - token    │  │ - routes     │         │
│  │ - locale    │  │ - userId   │  │ - apis       │         │
│  └──────┬──────┘  └─────┬──────┘  └──────┬───────┘        │
│         │               │                 │                 │
│         │               │                 │                 │
│         └───────────────┴─────────────────┘                 │
│                         │                                    │
│                         │ API Calls                         │
│                         ▼                                    │
├─────────────────────────────────────────────────────────────┤
│                    HTTP Layer                                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │  Axios Instance (utils/http/index.js)          │        │
│  │                                                 │        │
│  │  Request Interceptor:                          │        │
│  │  - Add Authorization header                    │        │
│  │  - Add timestamp                                │        │
│  │                                                 │        │
│  │  Response Interceptor:                         │        │
│  │  - Handle errors                                │        │
│  │  - Refresh token logic                         │        │
│  │  - Show error messages                         │        │
│  └────────────────┬───────────────────────────────┘        │
│                   │                                          │
│                   ▼                                          │
│         ┌──────────────────┐                               │
│         │  Backend API     │                               │
│         │  (FastAPI)       │                               │
│         └──────────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

---

This comprehensive visualization shows all the component relationships, data flows, and architectural patterns in your Vue FastAPI Admin project. Every component, route, store, and utility has been mapped to show how they interconnect and communicate.
