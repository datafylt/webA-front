# Formation Électro - Shared Styles Guide

## Overview

This guide explains how to use the factorized CSS system for Formation Électro public pages.

## File Structure

```
src/
├── assets/
│   └── styles/
│       └── public.css          # All shared styles
├── components/
│   └── public/
│       ├── index.js            # Component exports
│       ├── BreadcrumbSection.vue
│       ├── CtaSection.vue
│       ├── TeamSection.vue
│       └── TestimonialsSection.vue
└── views/
    └── public/
        ├── home/
        ├── about/
        ├── programs/
        ├── instructors/
        └── contact/
```

## Setup

### 1. Import Shared CSS Globally

In `src/main.js`, add:

```javascript
import '@/assets/styles/public.css'
```

Or in `src/App.vue`:

```vue
<style>
@import '@/assets/styles/public.css';
</style>
```

### 2. Using CSS Variables

The shared CSS provides design tokens as CSS variables:

```css
/* Colors */
--fe-primary: #0277BC;
--fe-primary-dark: #025d94;
--fe-dark: #002b53;
--fe-text: #2d2e2e;
--fe-white: #fff;

/* Typography */
--fe-font-primary: 'Open Sans', sans-serif;
--fe-font-heading: 'Roboto', sans-serif;

/* Spacing */
--fe-section-padding: 60px;
--fe-container-width: 1170px;
```

### 3. Using Shared Classes

#### Container
```html
<div class="fe-container">
  <!-- Content here -->
</div>
```

#### Breadcrumb
```html
<section class="fe-breadcrumb">
  <div class="fe-container">
    <div class="fe-breadcrumb-inner">
      <h1>Page Title</h1>
      <nav class="fe-breadcrumb-nav">
        <ul>
          <li><a href="/">Accueil</a></li>
          <li>Current Page</li>
        </ul>
      </nav>
    </div>
  </div>
</section>
```

#### Section Title
```html
<div class="fe-section-title">
  <h2>Title <span>Highlighted</span></h2>
  <div class="fe-title-border">
    <span class="icon">💡</span>
  </div>
</div>
```

#### Buttons
```html
<a class="fe-btn fe-btn-primary">Primary Button</a>
<a class="fe-btn fe-btn-white">White Button</a>
<a class="fe-btn fe-btn-outline">Outline Button</a>
```

#### Cards
```html
<div class="fe-card">
  <div class="fe-card-body">
    <h3 class="fe-card-title">Title</h3>
    <p class="fe-card-text">Description</p>
  </div>
</div>
```

#### Forms
```html
<div class="fe-form-group">
  <input type="text" class="fe-form-control" placeholder="Name">
</div>
```

#### Alerts
```html
<div class="fe-alert fe-alert-success">Success message</div>
<div class="fe-alert fe-alert-error">Error message</div>
```

## Using Reusable Components

### Import Components

```vue
<script setup>
import { 
  BreadcrumbSection, 
  CtaSection, 
  TeamSection, 
  TestimonialsSection 
} from '@/components/public'
</script>
```

### BreadcrumbSection

```vue
<BreadcrumbSection 
  title="Page Title"
  :breadcrumbs="[
    { label: 'Accueil', to: '/' },
    { label: 'Current Page' }
  ]"
/>
```

### CtaSection

```vue
<CtaSection 
  title="Call to Action Title"
  :paragraphs="[
    'First paragraph text.',
    'Second paragraph text.'
  ]"
  buttonText="Contact Us"
  buttonLink="/contact"
/>
```

### TeamSection

```vue
<TeamSection 
  image="/images/team3.png"
  alt="Our Team"
/>
```

### TestimonialsSection

```vue
<TestimonialsSection />
```

## Page Template Example

```vue
<template>
  <div class="my-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection 
      title="My Page"
      :breadcrumbs="[
        { label: 'Accueil', to: '/' },
        { label: 'My Page' }
      ]"
    />

    <!-- Main Content -->
    <section class="my-section">
      <div class="fe-container">
        <div class="fe-section-title">
          <h2>Section <span>Title</span></h2>
        </div>
        <div class="fe-content">
          <p>Your content here...</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CtaSection 
      title="Ready to start?"
      :paragraphs="['Contact us today.']"
    />

    <!-- Team -->
    <TeamSection />

    <!-- Testimonials -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { 
  BreadcrumbSection, 
  CtaSection, 
  TeamSection, 
  TestimonialsSection 
} from '@/components/public'
</script>

<style scoped>
/* Only page-specific styles here */
.my-section {
  padding: var(--fe-section-padding) 0;
}
</style>
```

## Benefits

1. **Consistency**: All pages share the same design tokens
2. **Maintainability**: Change colors/fonts in one place
3. **Smaller files**: Each page only has unique styles
4. **Reusable components**: No duplicate code for common sections
5. **Easier updates**: Modify TestimonialsSection once, updates everywhere

## Migration Guide

To migrate existing pages to use shared CSS:

1. Remove duplicate CSS (fonts, colors, breadcrumb, buttons, etc.)
2. Replace class names with `fe-` prefixed classes
3. Import and use reusable components
4. Keep only page-specific styles in scoped style block
