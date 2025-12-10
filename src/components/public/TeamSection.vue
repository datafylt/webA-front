<template>
  <section class="team-section">
    <div class="container">
      <div class="section-title">
        <h2>Nos <span>Instructeurs</span></h2>
        <div class="title-border">
          <span class="bulb-icon">💡</span>
        </div>
      </div>
      <div class="team-image">
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

<style scoped>
.team-section {
  background: #002b53;
  padding: 60px 0;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
}

.section-title h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 15px;
}

.section-title h2 span {
  color: #0277BC;
}

.title-border {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title-border::before,
.title-border::after {
  content: '';
  width: 80px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.bulb-icon {
  font-size: 24px;
}

.team-image {
  text-align: center;
}

.team-image img {
  max-width: 100%;
  border-radius: 8px;
}

@media (max-width: 767px) {
  .section-title h2 {
    font-size: 28px;
  }
}
</style>
