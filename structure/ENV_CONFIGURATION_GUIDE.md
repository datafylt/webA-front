# Vite Environment Variables Guide

## Overview
Your current `.env` configuration is for development. Here's a complete guide to managing environment variables in your FastAPI + Vue.js project.

## File Structure

```
your-project/
├── .env                    # Default environment variables (committed)
├── .env.development        # Development environment (committed)
├── .env.production        # Production environment (committed)
├── .env.staging           # Staging environment (committed)
├── .env.local             # Local overrides (NOT committed - in .gitignore)
└── .env.[mode].local      # Mode-specific local overrides (NOT committed)
```

## Variable Priority

Vite loads env files in this order (later ones override earlier):
1. `.env` - loaded in all cases
2. `.env.local` - loaded in all cases (ignored by git)
3. `.env.[mode]` - loaded in specified mode (development/production/staging)
4. `.env.[mode].local` - loaded in specified mode (ignored by git)

## Common Configuration Patterns

### Pattern 1: Development with Proxy (Your Current Setup)
**When to use:** Running Vue dev server on port 3100, FastAPI on port 8000

```bash
# .env.development
VITE_PUBLIC_PATH = '/'
VITE_USE_PROXY = true
VITE_BASE_API = '/api/v1'
VITE_API_URL = 'http://localhost:8000'
```

**Requests flow:**
```
Browser → http://localhost:3100/api/v1/users
         ↓ (Vite proxy)
FastAPI ← http://localhost:8000/api/v1/users
```

### Pattern 2: Production Same Domain
**When to use:** Frontend and backend served from same domain

```bash
# .env.production
VITE_PUBLIC_PATH = '/'
VITE_USE_PROXY = false
VITE_BASE_API = '/api/v1'
```

**Deployment structure:**
```
Nginx
├── / → Vue app (built files)
└── /api/v1/* → FastAPI backend
```

### Pattern 3: Production Different Domains
**When to use:** API on separate domain (most common in production)

```bash
# .env.production
VITE_PUBLIC_PATH = '/'
VITE_USE_PROXY = false
VITE_BASE_API = 'https://api.yourdomain.com/v1'
```

### Pattern 4: Subdirectory Deployment
**When to use:** Deploying to example.com/admin/

```bash
# .env.production
VITE_PUBLIC_PATH = '/admin/'
VITE_USE_PROXY = false
VITE_BASE_API = 'https://api.yourdomain.com/v1'
```

## Recommended Setup for Your Project

### 1. .env (Base - Committed)
```bash
# Application Info
VITE_APP_TITLE = 'Admin System'
VITE_APP_VERSION = '1.0.0'

# Default public path
VITE_PUBLIC_PATH = '/'
```

### 2. .env.development (Committed)
```bash
# Use proxy for local development
VITE_USE_PROXY = true
VITE_BASE_API = '/api/v1'
VITE_API_URL = 'http://localhost:8000'

# Dev server config
VITE_PORT = 3100
VITE_OPEN = true

# Enable source maps
VITE_SOURCEMAP = true
```

### 3. .env.production (Committed)
```bash
# No proxy in production
VITE_USE_PROXY = false

# Update this to your actual API domain
VITE_BASE_API = 'https://api.yourdomain.com/api/v1'
# Or if same domain: VITE_BASE_API = '/api/v1'

# Disable source maps
VITE_SOURCEMAP = false
```

### 4. .env.local (NOT Committed - Personal Settings)
```bash
# Override for your local machine only
# VITE_API_URL = 'http://192.168.1.100:8000'
# VITE_PORT = 5173
```

### 5. .gitignore (Make sure these are included)
```gitignore
# Local env files
.env.local
.env.*.local
```

## Accessing Environment Variables in Code

### In JavaScript/Vue
```javascript
// Get environment variable
const apiBase = import.meta.env.VITE_BASE_API

// Check mode
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
const mode = import.meta.env.MODE

// All VITE_ prefixed variables are available
console.log('App Title:', import.meta.env.VITE_APP_TITLE)
```

### In vite.config.js
```javascript
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  console.log('Base API:', env.VITE_BASE_API)
  console.log('Use Proxy:', env.VITE_USE_PROXY)
  
  // Use in config
  return {
    base: env.VITE_PUBLIC_PATH,
    // ...
  }
})
```

## Running with Different Modes

```bash
# Development (uses .env.development)
npm run dev

# Production build (uses .env.production)
npm run build

# Staging build (uses .env.staging)
npm run build --mode staging

# Custom mode
npm run dev --mode custom  # Uses .env.custom
```

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview"
  }
}
```

## Common Issues and Solutions

### Issue 1: API calls return 404
**Problem:** VITE_BASE_API doesn't match your FastAPI routes

**Solution:** Check your FastAPI app setup:
```python
# main.py
from fastapi import FastAPI

app = FastAPI()

# If you're using /api/v1 prefix
from api.v1 import api_router
app.include_router(api_router, prefix="/api/v1")
```

### Issue 2: CORS errors in development
**Problem:** Proxy not working correctly

**Solution:** Check vite.config.js proxy settings:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    // Don't rewrite if your backend expects /api prefix
  }
}
```

### Issue 3: Environment variables not updating
**Problem:** Variables cached

**Solution:** 
```bash
# Stop dev server
# Delete node_modules/.vite cache
rm -rf node_modules/.vite
# Restart
npm run dev
```

## Security Notes

1. **NEVER** commit `.env.local` files
2. **NEVER** put sensitive data (API keys, passwords) in committed env files
3. **DO** use backend environment variables for secrets
4. **DO** use `.env.local` for personal development settings

## FastAPI Backend Configuration

Your FastAPI should allow CORS from your frontend:

```python
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Development - Allow localhost
if settings.ENVIRONMENT == "development":
    origins = [
        "http://localhost:3100",
        "http://127.0.0.1:3100",
    ]
# Production - Specific domains
else:
    origins = [
        "https://yourdomain.com",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing Your Configuration

```javascript
// Add this to your app to verify env variables
console.log('Environment:', import.meta.env.MODE)
console.log('Base API:', import.meta.env.VITE_BASE_API)
console.log('Use Proxy:', import.meta.env.VITE_USE_PROXY)
console.log('Is Dev:', import.meta.env.DEV)
console.log('Is Prod:', import.meta.env.PROD)
```
