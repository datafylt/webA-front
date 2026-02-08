<template>
  <section class="fe-breadcrumb-section">
    <div class="fe-breadcrumb-container">
      <div class="fe-breadcrumb-inner">
        <div class="fe-breadcrumb-title">
          <h1 v-html="title"></h1>
        </div>
        <div class="fe-breadcrumb-nav">
          <ul>
            <li v-for="(crumb, index) in computedBreadcrumbs" :key="index">
              <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
              <span v-else>{{ crumb.label }}</span>
            </li>
            <li class="current">{{ plainTitle }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
})

// Default breadcrumb with translated home
const defaultBreadcrumbs = computed(() => [{ label: t('lang') === 'Français' ? 'Accueil' : 'Home', to: '/' }])

// Use provided breadcrumbs or default
const computedBreadcrumbs = computed(() => props.breadcrumbs.length > 0 ? props.breadcrumbs : defaultBreadcrumbs.value)

// Strip HTML tags for breadcrumb nav text
const plainTitle = computed(() => props.title.replace(/<[^>]*>/g, ''))
</script>

<style scoped>
.fe-breadcrumb-section {
  background: linear-gradient(rgba(0, 43, 83, 0.9), rgba(0, 43, 83, 0.9)),
              url('/images/about-us.jpg');
  background-size: cover;
  background-position: center;
  padding: 60px 0;
}

.fe-breadcrumb-container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.fe-breadcrumb-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fe-breadcrumb-title h1 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}

.fe-breadcrumb-title h1 :deep(em) {
  font-style: italic;
}

.fe-breadcrumb-nav ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
}

.fe-breadcrumb-nav li {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.fe-breadcrumb-nav li::after {
  content: '/';
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.5);
}

.fe-breadcrumb-nav li:last-child::after,
.fe-breadcrumb-nav li.current::after {
  display: none;
}

.fe-breadcrumb-nav a {
  color: #0277BC;
  text-decoration: none;
  transition: color 0.3s ease;
}

.fe-breadcrumb-nav a:hover {
  color: #fff;
}

@media (max-width: 991px) {
  .fe-breadcrumb-inner {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .fe-breadcrumb-title h1 {
    font-size: 28px;
  }
}
</style>
