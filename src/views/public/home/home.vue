<template>
  <div class="home-page fe-page">
    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Home Slider -->
    <section class="home-slider">
      <div class="slider-container">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
          :class="{ active: currentSlide === index }"
        >
          <div class="slide-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.subtitle }}</p>
            <a v-if="slide.external" :href="slide.link" target="_blank" class="slide-btn">
              {{ slide.buttonText }}
            </a>
            <router-link v-else :to="slide.link" class="slide-btn">
              {{ slide.buttonText }}
            </router-link>
          </div>
        </div>

        <button class="slider-control prev" @click="prevSlide" aria-label="Previous">‹</button>
        <button class="slider-control next" @click="nextSlide" aria-label="Next">›</button>

        <div class="slider-indicators">
          <span
            v-for="(slide, index) in slides"
            :key="index"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- Welcome / Callouts Section -->
    <section class="callouts-section">
      <div class="fe-container">
        <div class="fe-section-title">
          <h2>{{ $t('public.home.welcome_title') }} <span>{{ $t('public.home.welcome_company') }}</span></h2>
          <div class="fe-title-border">
            <span class="fe-bulb-icon">💡</span>
          </div>
        </div>

        <div class="callouts-grid">
          <router-link
            v-for="program in programs"
            :key="program.id"
            :to="`/programs/${program.id}`"
            class="callout-card"
          >
            <div class="callout-inner">
              <div class="callout-icon">{{ program.emoji }}</div>
              <h3>{{ program.shortTitle }}</h3>
              <p>{{ program.title }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Counters Section -->
    <section class="counters-section">
      <div class="fe-container">
        <div class="counters-grid">
          <div class="counter-item">
            <div class="counter-icon">💎</div>
            <div class="counter-number">{{ animatedCount1 }}</div>
            <p>{{ $t('public.home.counters.years') }}</p>
          </div>
          <div class="counter-item">
            <div class="counter-icon">👥</div>
            <div class="counter-number">{{ animatedCount2 }}<span>%</span></div>
            <p>{{ $t('public.home.counters.success') }}</p>
          </div>
          <div class="counter-item">
            <div class="counter-icon">💻</div>
            <div class="counter-number">{{ animatedCount3 }}</div>
            <p>{{ $t('public.home.counters.companies') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-home-section">
      <div class="fe-container">
        <div class="about-grid">
          <div class="about-text fe-content">
            <h3>{{ $t('public.home.about.title') }}</h3>
            <p>{{ $t('public.home.about.description') }}</p>
            <ul>
              <li>{{ $t('public.home.about.service1') }}</li>
              <li>{{ $t('public.home.about.service2') }}</li>
              <li>{{ $t('public.home.about.service3') }}</li>
            </ul>
            <router-link to="/about" class="fe-btn fe-btn-primary">{{ $t('public.home.about.button') }}</router-link>
          </div>
          <div class="about-image">
            <img src="/images/main-about.png" alt="Formation Électro" />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <CtaSection :title="ctaTitle" />

    <!-- Team Section -->
    <TeamSection image="/images/team1.png" />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CtaSection, LanguageSwitcher, TeamSection, TestimonialsSection } from '@/components/public'

const { t } = useI18n()

const ctaTitle = computed(() => t('public.home.cta_title'))

const slides = computed(() => [
  {
    title: t('public.home.slide1.title'),
    subtitle: t('public.home.slide1.subtitle'),
    buttonText: t('public.home.slide1.button'),
    link: '/contact',
    external: false,
    image: '/images/slide1.png'
  },
  {
    title: t('public.home.slide2.title'),
    subtitle: t('public.home.slide2.subtitle'),
    buttonText: t('public.home.slide2.button'),
    link: 'http://www.emploiquebec.gouv.qc.ca/fileadmin/fichiers/pdf/Guide-qualif/electricite_fiche.pdf#page=9',
    external: true,
    image: '/images/slide2.png'
  },
  {
    title: t('public.home.slide3.title'),
    subtitle: t('public.home.slide3.subtitle'),
    buttonText: t('public.home.slide3.button'),
    link: '/contact',
    external: false,
    image: '/images/slide3.png'
  }
])

const programs = computed(() => [
  { id: 1, shortTitle: t('public.home.programs.licence_c.short'), title: t('public.home.programs.licence_c.title'), emoji: '⚡' },
  { id: 2, shortTitle: t('public.home.programs.rca.short'), title: t('public.home.programs.rca.title'), emoji: '🔌' },
  { id: 3, shortTitle: t('public.home.programs.rbq.short'), title: t('public.home.programs.rbq.title'), emoji: '🏗️' },
  { id: 4, shortTitle: t('public.home.programs.cmeq.short'), title: t('public.home.programs.cmeq.title'), emoji: '📋' },
  { id: 5, shortTitle: t('public.home.programs.red_seal.short'), title: t('public.home.programs.red_seal.title'), emoji: '🔴' },
  { id: 6, shortTitle: t('public.home.programs.apprenticeship.short'), title: t('public.home.programs.apprenticeship.title'), emoji: '🛠️' }
])

const currentSlide = ref(0)
let slideInterval = null

const animatedCount1 = ref(0)
const animatedCount2 = ref(0)
const animatedCount3 = ref(0)
let countersAnimated = false

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const animateCounter = (targetRef, target, duration = 2000) => {
  const startTime = performance.now()
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    targetRef.value = Math.floor(progress * target)
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

const handleScroll = () => {
  if (countersAnimated) return
  const countersSection = document.querySelector('.counters-section')
  if (countersSection) {
    const rect = countersSection.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true
      animateCounter(animatedCount1, 26)
      animateCounter(animatedCount2, 98)
      animateCounter(animatedCount3, 50)
    }
  }
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped src="@/assets/styles/home.scoped.css"></style>
