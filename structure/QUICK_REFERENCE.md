# Quick Reference Guide - Vue FastAPI Admin

## 🚀 Quick Start Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev
# Opens at http://localhost:3100

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm prettier
```

---

## 📁 Where to Find Things

### Adding a New Page

1. **Create view component:**
   ```
   src/views/my-module/my-page/index.vue
   ```

2. **Add to backend permissions** (FastAPI returns this in menu API)

3. **Route auto-loads** via `import.meta.glob('@/views/**/index.vue')`

### Adding a New Component

```
src/components/
├── common/        # App-wide utilities
├── icon/          # Icon-related
├── page/          # Page wrappers
├── query-bar/     # Search/filter
└── table/         # Data tables
```

### API Endpoints

```javascript
// src/api/index.js
export default {
  // Pattern: action + Entity + optional detail
  getUsers: (params) => get('/users', params),
  createUser: (data) => post('/users', data),
  updateUser: (id, data) => put(`/users/${id}`, data),
  deleteUser: (id) => del(`/users/${id}`),
}
```

### Store Modules

```javascript
// Get store instance
import { useUserStore } from '@/store'

// In component
const userStore = useUserStore()
const userName = userStore.userInfo?.username
```

---

## 🎨 Component Usage Examples

### Creating a CRUD Page

```vue
<template>
  <CommonPage>
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.getItems"
      :create-data="api.createItem"
      :update-data="api.updateItem"
      :delete-data="api.deleteItem"
    >
      <template #queryBar>
        <QueryBarItem label="Name">
          <n-input v-model:value="queryItems.name" />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
const $table = ref(null)
const queryItems = ref({})
const columns = [
  { title: 'Name', key: 'name', width: 200 },
  { title: 'Status', key: 'status', width: 100 },
]
</script>
```

### Using Icons

```vue
<template>
  <!-- Iconify icon (100,000+ available) -->
  <TheIcon icon="mdi:account" :size="24" />
  
  <!-- Custom SVG icon -->
  <TheIcon icon="logo" :size="32" />
  
  <!-- With color -->
  <TheIcon icon="carbon:user" color="#1890ff" />
</template>
```

### Loading & Empty States

```vue
<template>
  <LoadingEmptyWrapper :loading="loading" :empty="!data.length">
    <div v-for="item in data" :key="item.id">
      {{ item.name }}
    </div>
  </LoadingEmptyWrapper>
</template>

<script setup>
const loading = ref(false)
const data = ref([])

onMounted(async () => {
  loading.value = true
  data.value = await fetchData()
  loading.value = false
})
</script>
```

### Permission Directive

```vue
<template>
  <!-- Hide button if user lacks permission -->
  <n-button v-permission="['user:create']">
    Create User
  </n-button>
  
  <!-- Multiple permissions (OR logic) -->
  <n-button v-permission="['user:update', 'user:delete']">
    Edit
  </n-button>
</template>
```

---

## 🗺️ File Naming Conventions

### Components
```
MyComponent.vue       ✅ PascalCase for components
my-component.vue      ❌ Not kebab-case
```

### Views
```
index.vue             ✅ Always index.vue in folder
UserList.vue          ❌ Not named files
```

### Utilities
```
useMyHook.js          ✅ Composables with 'use' prefix
myHelper.js           ✅ camelCase for utilities
```

### Routes
```
/system/user          ✅ kebab-case URLs
/systemUser           ❌ Not camelCase
```

---

## 🔧 Common Tasks

### Adding a Store Module

1. **Create module:**
   ```javascript
   // src/store/modules/my-store/index.js
   import { defineStore } from 'pinia'
   
   export const useMyStore = defineStore('my-store', {
     state: () => ({
       data: null
     }),
     getters: {
       hasData: (state) => !!state.data
     },
     actions: {
       setData(value) {
         this.data = value
       }
     }
   })
   ```

2. **Export in modules index:**
   ```javascript
   // src/store/modules/index.js
   export * from './my-store'
   ```

3. **Use in component:**
   ```javascript
   import { useMyStore } from '@/store'
   const myStore = useMyStore()
   ```

### Adding a Route Guard

```javascript
// src/router/guard/my-guard.js
export function createMyGuard(router) {
  router.beforeEach((to, from, next) => {
    // Your logic here
    next()
  })
}

// src/router/guard/index.js
import { createMyGuard } from './my-guard'

export function setupRouterGuard(router) {
  // ... existing guards
  createMyGuard(router)
}
```

### Adding Global Component

```javascript
// src/main.js
import MyComponent from '@/components/MyComponent.vue'

app.component('MyComponent', MyComponent)
```

### Adding Utility Function

```javascript
// src/utils/my-utils.js
export function myHelper(value) {
  return value.toString()
}

// src/utils/index.js
export * from './my-utils'

// Usage in component
import { myHelper } from '@/utils'
```

---

## 🎯 Store Quick Reference

### App Store
```javascript
const appStore = useAppStore()

// Sidebar
appStore.collapsed         // Boolean
appStore.setCollapsed(true)

// Theme
appStore.theme            // 'light' | 'dark'
appStore.setTheme('dark')

// Language
appStore.locale           // 'en' | 'zh'
appStore.setLocale('zh')

// Page reload
appStore.reloadPage()
```

### User Store
```javascript
const userStore = useUserStore()

// User info
userStore.userInfo        // { username, email, ... }
userStore.userId         // String

// Auth
await userStore.login({ username, password })
await userStore.logout()
await userStore.getUserInfo()
```

### Permission Store
```javascript
const permStore = usePermissionStore()

// Routes
permStore.menus          // Menu tree
permStore.routes         // Route array

// Generate routes
await permStore.generateRoutes()
await permStore.getAccessApis()
```

### Tags Store
```javascript
const tagsStore = useTagsStore()

// Tags
tagsStore.tags           // Array of route tags
tagsStore.activeTag      // Current active tag

// Actions
tagsStore.addTag(route)
tagsStore.removeTag(tag)
tagsStore.removeOtherTags(tag)
tagsStore.removeAllTags()
```

---

## 🌐 API Client Usage

### Basic Requests

```javascript
import { get, post, put, del } from '@/utils/http'

// GET request
const users = await get('/users', { page: 1, size: 10 })

// POST request
const newUser = await post('/users', {
  username: 'john',
  email: 'john@example.com'
})

// PUT request
const updated = await put('/users/123', { email: 'new@example.com' })

// DELETE request
await del('/users/123')
```

### With Error Handling

```javascript
try {
  const data = await get('/users')
  console.log('Success:', data)
} catch (error) {
  console.error('Failed:', error.message)
  // Error already shown via interceptor
}
```

### Custom Requests

```javascript
import request from '@/utils/http'

const response = await request({
  url: '/custom-endpoint',
  method: 'POST',
  data: { key: 'value' },
  headers: { 'Custom-Header': 'value' }
})
```

---

## 🎨 Styling Guide

### UnoCSS Utilities

```vue
<template>
  <!-- Flexbox -->
  <div class="flex items-center justify-between">
  
  <!-- Spacing -->
  <div class="p-4 m-2 px-8 py-4">
  
  <!-- Colors -->
  <div class="bg-blue-500 text-white">
  
  <!-- Dark mode -->
  <div class="bg-white dark:bg-gray-800">
  
  <!-- Responsive -->
  <div class="text-sm md:text-base lg:text-lg">
</template>
```

### SCSS Variables

```scss
// src/styles/global.scss
$primary-color: #1890ff;
$border-radius: 4px;
$header-height: 60px;
```

### Component Scoped Styles

```vue
<style scoped>
.my-component {
  /* Scoped to this component */
}
</style>
```

---

## 🔒 Authentication Flow

### Login Process
```
1. User enters credentials
2. userStore.login(credentials)
3. Backend validates → returns token
4. Frontend stores token (localStorage)
5. Fetch user info
6. Generate dynamic routes
7. Redirect to dashboard
```

### Token Refresh
```
1. API call returns 401
2. Response interceptor catches error
3. Attempt token refresh (if implemented)
4. Retry original request
5. If refresh fails → logout
```

### Logout Process
```
1. userStore.logout()
2. Clear token from localStorage
3. Clear user info from store
4. Clear permission routes
5. Reset router
6. Redirect to login
```

---

## 🐛 Debugging Tips

### Vue DevTools
1. Install Vue DevTools extension
2. Open DevTools → Vue tab
3. Inspect:
   - Component tree
   - Pinia stores
   - Routes
   - Performance

### Check Store State
```javascript
// In component or console
import { useUserStore } from '@/store'
const userStore = useUserStore()
console.log('User:', userStore.$state)
```

### Check Current Route
```javascript
import { useRoute } from 'vue-router'
const route = useRoute()
console.log('Current route:', route)
```

### Check Permissions
```javascript
import { usePermissionStore } from '@/store'
const permStore = usePermissionStore()
console.log('Menus:', permStore.menus)
console.log('Routes:', permStore.routes)
```

### Network Requests
1. Open DevTools → Network tab
2. Filter: XHR/Fetch
3. Check:
   - Request headers (token included?)
   - Response status
   - Response data

---

## 📦 Build & Deploy

### Environment Variables

```bash
# .env.development
VITE_BASE_API = '/api/v1'
VITE_USE_PROXY = true

# .env.production  
VITE_BASE_API = 'https://api.example.com/api/v1'
VITE_USE_PROXY = false
```

### Build Process

```bash
# Development build
pnpm build --mode development

# Production build
pnpm build --mode production

# Output directory
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── vendor-[hash].js
│   └── index-[hash].css
└── ...
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/dist;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # API proxy
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
    
    # Vue Router history mode
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🎓 Best Practices

### Component Design
✅ Keep components small and focused
✅ Use props for parent→child data
✅ Use emits for child→parent communication
✅ Extract reusable logic to composables
❌ Don't access parent/child directly via $parent/$refs

### State Management
✅ Use Pinia stores for shared state
✅ Keep component-local state with ref/reactive
✅ Use computed for derived state
❌ Don't mutate props
❌ Don't use stores for everything

### Performance
✅ Use v-show for frequently toggled elements
✅ Use v-if for conditionally rendered content
✅ Lazy load routes and components
✅ Use virtual scrolling for long lists
❌ Don't use v-for without :key

### Code Organization
✅ One component per file
✅ Group related files in folders
✅ Use index.js for clean exports
✅ Keep utilities pure functions
❌ Don't create circular dependencies

---

## 🔗 Useful Links

- **Naive UI Docs:** https://www.naiveui.com/
- **Vue 3 Docs:** https://vuejs.org/
- **Vite Docs:** https://vitejs.dev/
- **Pinia Docs:** https://pinia.vuejs.org/
- **UnoCSS Docs:** https://unocss.dev/
- **Iconify Icon Sets:** https://icon-sets.iconify.design/

---

## 💡 Common Pitfalls

### Issue: Page not loading after login
**Solution:** Check if dynamic routes are generated
```javascript
const permStore = usePermissionStore()
console.log('Routes:', permStore.routes)
```

### Issue: API returns 401 even with token
**Solution:** Check token format in Authorization header
```javascript
// Should be: 'Bearer <token>'
Authorization: `Bearer ${token}`
```

### Issue: Component not reactive
**Solution:** Ensure you're using ref() or reactive()
```javascript
// ❌ Wrong
let count = 0

// ✅ Correct
const count = ref(0)
```

### Issue: Route not found after refresh
**Solution:** Ensure you're using history mode + server config
```javascript
// vite.config.js - correct
history: createWebHistory('/')

// Nginx - ensure try_files is set
try_files $uri $uri/ /index.html;
```

---

This quick reference covers the most common tasks and patterns you'll encounter while developing with this Vue FastAPI Admin template. Keep this handy for daily development!
