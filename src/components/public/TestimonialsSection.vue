<template>
  <section class="testimonials-section">
    <div class="container">
      <div class="testimonials-slider">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-item"
          :class="{ active: currentIndex === index }"
        >
          <blockquote>
            <p>"{{ testimonial.quote }}"</p>
            <div class="testimonial-author">
              <img :src="testimonial.image" :alt="testimonial.name" />
              <h4>
                {{ testimonial.name }}
                <span v-if="testimonial.title">{{ testimonial.title }}</span>
              </h4>
            </div>
          </blockquote>
        </div>

        <div class="testimonial-indicators">
          <span
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="{ active: currentIndex === index }"
            @click="goTo(index)"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const testimonials = [
  {
    quote: 'Passed 74%, thanks for all Your help very good teacher(@Mahmad)',
    name: 'Maverick Clayton',
    title: 'Tembec Témiscaming',
    image: '/images/testimonials1.png'
  },
  {
    quote: "Grâce à Formation Electo Inc., j'ai réussi mon examen d'Emploi Québec dès la première fois et c'est avec le certificat obtenu que j'ai rapidement décroché un emploi bien rémunéré dans une compagnie.",
    name: 'Julio-Ngueno',
    title: '',
    image: '/images/Julio-Ngueno.png'
  }
]

const currentIndex = ref(0)
let interval = null

const goTo = (index) => {
  currentIndex.value = index
}

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length
  }, 6000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.testimonials-section {
  background: linear-gradient(rgba(0, 43, 83, 0.85), rgba(0, 43, 83, 0.85)),
              url('/images/main-bg2.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 80px 0;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.testimonials-slider {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.testimonial-item {
  display: none;
}

.testimonial-item.active {
  display: block;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.testimonial-item blockquote {
  margin: 0;
  padding: 0;
}

.testimonial-item blockquote p {
  color: #fff;
  font-size: 18px;
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 30px;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.testimonial-author img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #0277BC;
  object-fit: cover;
}

.testimonial-author h4 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.testimonial-author h4 span {
  display: block;
  color: #0277BC;
  font-size: 14px;
  font-weight: 400;
  margin-top: 5px;
}

.testimonial-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
}

.testimonial-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonial-indicators span:hover {
  background: rgba(255, 255, 255, 0.5);
}

.testimonial-indicators span.active {
  background: #0277BC;
}

@media (max-width: 767px) {
  .testimonial-item blockquote p {
    font-size: 16px;
  }
}
</style>
