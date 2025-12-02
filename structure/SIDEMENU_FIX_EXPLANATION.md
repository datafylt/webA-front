# SideMenu Duplicate Keys Fix

## Problem
Vue warning: **"Duplicate keys found during update: '/top-menu'"**

This occurred because multiple menu items had the same `key` value in the n-menu component.

## Root Cause
The original code used `route.name` as the key for menu items:
```javascript
key: route.name,
```

This caused issues when:
1. Multiple routes shared the same name
2. Parent and child routes had the same name
3. Routes were nested with conflicting names

## Solution
Changed the key system to use the **full path** instead of route name, ensuring each menu item has a unique identifier.

## Changes Made

### 1. Initial Menu Item Creation (Line 47-54)
**Before:**
```javascript
function getMenuItem(route, basePath = '') {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,  // ❌ Not unique
    path: resolvePath(basePath, route.path),
    icon: getIcon(route.meta),
    order: route.meta?.order || 0,
  }
```

**After:**
```javascript
function getMenuItem(route, basePath = '') {
  const resolvedPath = resolvePath(basePath, route.path)
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: resolvedPath,  // ✅ Unique path
    path: resolvedPath,
    icon: getIcon(route.meta),
    order: route.meta?.order || 0,
  }
```

### 2. Single Child Route Handler (Line 63-72)
**Before:**
```javascript
if (visibleChildren.length === 1) {
  const singleRoute = visibleChildren[0]
  menuItem = {
    ...menuItem,
    label: singleRoute.meta?.title || singleRoute.name,
    key: singleRoute.name,  // ❌ Not unique
    path: resolvePath(menuItem.path, singleRoute.path),
    icon: getIcon(singleRoute.meta),
  }
```

**After:**
```javascript
if (visibleChildren.length === 1) {
  const singleRoute = visibleChildren[0]
  const childPath = resolvePath(menuItem.path, singleRoute.path)
  menuItem = {
    ...menuItem,
    label: singleRoute.meta?.title || singleRoute.name,
    key: childPath,  // ✅ Unique path
    path: childPath,
    icon: getIcon(singleRoute.meta),
  }
```

### 3. Active Key Computation (Line 24)
**Before:**
```javascript
const activeKey = computed(() => curRoute.meta?.activeMenu || curRoute.name)
```

**After:**
```javascript
const activeKey = computed(() => curRoute.meta?.activeMenu || curRoute.path)
```

## Benefits
✅ **Unique keys** - Each menu item now has a guaranteed unique identifier  
✅ **No more warnings** - Vue will no longer complain about duplicate keys  
✅ **Better semantics** - Using path as key makes more sense for navigation  
✅ **Active state works** - Menu correctly highlights the current route

## Testing
After applying this fix:
1. The Vue warning should disappear from the console
2. Menu items should still navigate correctly
3. Active menu item highlighting should work properly
4. Nested menus should expand/collapse correctly
