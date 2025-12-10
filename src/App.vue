<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>

<script setup>
import AppProvider from '@/components/common/AppProvider.vue'
</script>

<style>
/* Global reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
}
</style>
