<template>
  <section class="fe-team-section">
    <div class="fe-container">
      <div class="fe-section-title light">
        <h2>Nos <span>Instructeurs</span></h2>
        <div class="fe-title-border light">
          <span class="fe-bulb-icon">💡</span>
        </div>
      </div>
      <div class="fe-team-image">
        <img :src="image" :alt="alt" />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    default: '/images/team3.png'
  },
  alt: {
    type: String,
    default: 'Nos Instructeurs'
  }
})
</script>