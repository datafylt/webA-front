<template>
  <section class="fe-testimonials">
    <div class="fe-container">
      <div class="fe-testimonials-slider">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="fe-testimonial-item"
          :class="{ active: currentIndex === index }"
        >
          <blockquote>
            <p>"{{ testimonial.quote }}"</p>
            <div class="fe-testimonial-author">
              <img :src="testimonial.image" :alt="testimonial.name" />
              <h4>
                {{ testimonial.name }}
                <span v-if="testimonial.title">{{ testimonial.title }}</span>
              </h4>
            </div>
          </blockquote>
        </div>

        <div class="fe-testimonial-indicators">
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