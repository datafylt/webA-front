<template>
  <div class="home-page fe-page">
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
          <h2>Bienvenue à <span>Formation Électro Inc</span></h2>
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
            <p>Plus de 25 ans d'existence</p>
          </div>
          <div class="counter-item">
            <div class="counter-icon">👥</div>
            <div class="counter-number">{{ animatedCount2 }}<span>%</span></div>
            <p>Taux de réussite</p>
          </div>
          <div class="counter-item">
            <div class="counter-icon">💻</div>
            <div class="counter-number">{{ animatedCount3 }}</div>
            <p>Plus de 50 entreprises loyal</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-home-section">
      <div class="fe-container">
        <div class="about-grid">
          <div class="about-text fe-content">
            <h3>À propos de "Formation Électro Inc."</h3>
            <p>
              Nous dispensons des formations pratiques et théoriques en contrôle de moteurs,
              l'installation et le contrôle de chauffage, d'éclairage et l'installation de
              transformateurs monophasé ou triphasé. Des cours en lecture de plans et devis,
              de croquis et schémas, élaboration d'examens pré-embauche théoriques et pratiques.
            </p>
            <ul>
              <li>Contrôle de Moteurs</li>
              <li>Installation et Contrôle de Chauffage, de climatisation et d'éclairage</li>
              <li>Installation de Transformateurs Monophasé ou Triphasé</li>
            </ul>
            <router-link to="/about" class="fe-btn fe-btn-primary">En savoir plus</router-link>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { CtaSection, TeamSection, TestimonialsSection } from '@/components/public'

const ctaTitle = 'Formation en vue de l\'obtention de la qualification de compagnon électricien <em>(Licence C)</em>'

const slides = ref([
  {
    title: 'FORMATION ÉLECTRO INC',
    subtitle: "Peut intervenir auprès de votre entreprise de plusieurs façon, à titre d'expert-conseil et de formateur",
    buttonText: 'Contactez-nous',
    link: '/contact',
    external: false,
    image: '/images/slide1.png'
  },
  {
    title: 'Reconnu par Emploi Québec',
    subtitle: "Formation électro inc. est un organisme de formation qui est officiellement reconnu par Emploi Québec, No. d'agrément: 0055420.",
    buttonText: "Référence d'Emploi Québec",
    link: 'http://www.emploiquebec.gouv.qc.ca/fileadmin/fichiers/pdf/Guide-qualif/electricite_fiche.pdf#page=9',
    external: true,
    image: '/images/slide2.png'
  },
  {
    title: 'Structurée et Assumée',
    subtitle: "Une approche personnalisée de l'apprentissage des étudiants",
    buttonText: 'Contactez-nous',
    link: '/contact',
    external: false,
    image: '/images/slide3.png'
  }
])

const programs = ref([
  { id: 1, shortTitle: 'Licence C', title: 'Compagnon Electricien Licence C', emoji: '⚡' },
  { id: 2, shortTitle: 'RCA', title: "Connexions restreintes d'appareillage électrique", emoji: '🔌' },
  { id: 3, shortTitle: 'RBQ', title: 'Préparation aux examens de constructeur propriétaire (RBQ)', emoji: '🏗️' },
  { id: 4, shortTitle: 'CMEQ', title: "Préparation aux examens de l'entrepreneur électricien(CMEQ)", emoji: '📋' },
  { id: 5, shortTitle: 'Sceau Rouge', title: 'Préparation aux examens Sceau Rouge', emoji: '🔴' },
  { id: 6, shortTitle: 'Compagnonnage', title: 'Compagnonnage en atelier', emoji: '🛠️' }
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
