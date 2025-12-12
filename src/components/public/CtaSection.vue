<template>
  <section class="fe-cta-section">
    <div class="fe-cta-container">
      <div class="fe-cta-content">
        <div class="fe-cta-text">
          <h3 v-html="title"></h3>
          <p v-if="description">{{ description }}</p>
        </div>
        <div class="fe-cta-button">
          <router-link :to="buttonLink" class="fe-btn-white">
            {{ buttonText }}
          </router-link>
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
  description: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Contactez-nous'
  },
  buttonLink: {
    type: String,
    default: '/contact'
  }
})
</script>

<style scoped>
.fe-cta-section {
  background: #0277BC;
  padding: 50px 0;
}

.fe-cta-container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.fe-cta-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.fe-cta-text h3 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.fe-cta-text h3 :deep(em) {
  font-style: italic;
}

.fe-cta-text p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.fe-btn-white {
  display: inline-block;
  padding: 14px 35px;
  background: #fff;
  color: #0277BC;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  border: 2px solid #fff;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.fe-btn-white:hover {
  background: transparent;
  color: #fff;
}

@media (max-width: 991px) {
  .fe-cta-content {
    flex-direction: column;
    text-align: center;
  }

  .fe-cta-text h3 {
    font-size: 20px;
  }
}
</style>
