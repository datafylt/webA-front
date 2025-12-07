<template>
  <section class="fe-breadcrumb">
    <div class="fe-container">
      <div class="fe-breadcrumb-inner">
        <div class="fe-breadcrumb-title">
          <h1>{{ title }}</h1>
        </div>
        <div class="fe-breadcrumb-nav">
          <ul>
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
              <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
              <span v-else>{{ crumb.label }}</span>
            </li>
            <li>{{ title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    default: () => [{ label: 'Accueil', to: '/' }]
  }
})
</script>