<template>
  <div class="home-page">
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
            <a
              v-if="slide.external"
              :href="slide.link"
              target="_blank"
              class="slide-btn"
            >
              {{ slide.buttonText }}
            </a>
            <router-link
              v-else
              :to="slide.link"
              class="slide-btn"
            >
              {{ slide.buttonText }}
            </router-link>
          </div>
        </div>

        <!-- Slider Controls -->
        <button class="slider-control prev" @click="prevSlide">
          <span>‹</span>
        </button>
        <button class="slider-control next" @click="nextSlide">
          <span>›</span>
        </button>

        <!-- Slider Indicators -->
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
      <div class="container">
        <div class="section-title">
          <h2>Bienvenue à <span>Formation Électro Inc</span></h2>
          <div class="title-border">
            <span class="bulb-icon">💡</span>
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
              <div class="callout-icon">
                <span class="icon-emoji">{{ program.emoji }}</span>
              </div>
              <h3>{{ program.shortTitle }}</h3>
              <p>{{ program.title }}</p>
            </div>
            <div class="animated-border"></div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Counters Section -->
    <section class="counters-section">
      <div class="container">
        <div class="counters-grid">
          <div class="counter-item">
            <div class="counter-icon">💎</div>
            <div class="counter-number">
              <span class="count">{{ animatedCount1 }}</span>
            </div>
            <p>Plus de 25 ans d'existence</p>
          </div>

          <div class="counter-item">
            <div class="counter-icon">👥</div>
            <div class="counter-number">
              <span class="count">{{ animatedCount2 }}</span><span>%</span>
            </div>
            <p>Taux de réussite</p>
          </div>

          <div class="counter-item">
            <div class="counter-icon">💻</div>
            <div class="counter-number">
              <span class="count">{{ animatedCount3 }}</span>
            </div>
            <p>Plus de 50 entreprises loyal</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <h3>À propos de "Formation Électro Inc."</h3>
            <p class="text-justify">
              Nous dispensons des formations pratiques et théoriques en contrôle de moteurs,
              l'installation et le contrôle de chauffage, d'éclairage et l'installation de
              transformateurs monophasé ou triphasé. Des cours en lecture de plans et devis,
              de croquis et schémas, élaboration d'examens pré-embauche théoriques et pratiques.
            </p>
            <ul class="about-list">
              <li><span class="list-arrow">›</span> Contrôle de Moteurs</li>
              <li><span class="list-arrow">›</span> Installation et Contrôle de Chauffage, de climatisation et d'éclairage</li>
              <li><span class="list-arrow">›</span> Installation de Transformateurs Monophasé ou Triphasé</li>
            </ul>
            <router-link to="/about" class="btn-primary">En savoir plus</router-link>
          </div>
          <div class="about-image">
            <img src="/images/main-about.png" alt="Formation Électro" />
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h3>Formation en vue de l'obtention de la qualification de compagnon électricien <em>(Licence C)</em></h3>
          </div>
          <div class="cta-button">
            <router-link to="/contact" class="btn-white">Contactez-nous</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-title light">
          <h2>Nos <span>Instructeurs</span></h2>
          <div class="title-border">
            <span class="bulb-icon">💡</span>
          </div>
        </div>
        <div class="team-image">
          <img src="/images/team1.png" alt="Nos Instructeurs" />
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <div class="testimonials-slider">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonial-item"
            :class="{ active: currentTestimonial === index }"
          >
            <blockquote>
              <p>"{{ testimonial.quote }}"</p>
              <div class="testimonial-author">
                <div class="author-avatar">{{ testimonial.initials }}</div>
                <h4>{{ testimonial.name }} <span>{{ testimonial.title }}</span></h4>
              </div>
            </blockquote>
          </div>

          <!-- Testimonial Indicators -->
          <div class="testimonial-indicators">
            <span
              v-for="(testimonial, index) in testimonials"
              :key="index"
              :class="{ active: currentTestimonial === index }"
              @click="currentTestimonial = index"
            ></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Slider Data
const slides = ref([
  {
    title: 'FORMATION ÉLECTRO INC',
    subtitle: 'Peut intervenir auprès de votre entreprise de plusieurs façon, à titre d\'expert-conseil et de formateur',
    buttonText: 'Contactez-nous',
    link: '/contact',
    external: false,
    image: '/images/slide1.png'
  },
  {
    title: 'Reconnu par Emploi Québec',
    subtitle: 'Formation électro inc. est un organisme de formation qui est officiellement reconnu par Emploi Québec, No. d\'agrément: 0055420.',
    buttonText: 'Référence d\'Emploi Québec',
    link: 'http://www.emploiquebec.gouv.qc.ca/fileadmin/fichiers/pdf/Guide-qualif/electricite_fiche.pdf#page=9',
    external: true,
    image: '/images/slide2.png'
  },
  {
    title: 'Structurée et Assumée',
    subtitle: 'Une approche personnalisée de l\'apprentissage des étudiants',
    buttonText: 'Contactez-nous',
    link: '/contact',
    external: false,
    image: '/images/slide3.png'
  }
])

// Programs Data
const programs = ref([
  {
    id: 1,
    shortTitle: 'Licence C',
    title: 'Compagnon Electricien Licence C',
    emoji: '⚡'
  },
  {
    id: 2,
    shortTitle: 'RCA',
    title: 'Connexions restreintes d\'appareillage électrique',
    emoji: '🔌'
  },
  {
    id: 3,
    shortTitle: 'RBQ',
    title: 'Préparation aux examens de constructeur propriétaire (RBQ)',
    emoji: '🏗️'
  },
  {
    id: 4,
    shortTitle: 'CMEQ',
    title: 'Préparation aux examens de l\'entrepreneur électricien(CMEQ)',
    emoji: '📋'
  },
  {
    id: 5,
    shortTitle: 'Sceau Rouge',
    title: 'Préparation aux examens Sceau Rouge',
    emoji: '🔴'
  },
  {
    id: 6,
    shortTitle: 'Compagnonnage',
    title: 'Compagnonnage en atelier',
    emoji: '🛠️'
  }
])

// Testimonials Data
const testimonials = ref([
  {
    quote: 'Passed 74%, thanks for all Your help very good teacher(@Mahmad)',
    name: 'Maverick Clayton',
    title: 'Tembec Témiscaming',
    initials: 'MC'
  },
  {
    quote: 'Grâce à "Formation Electo Inc.", j\'ai réussi mon examen d\'Emploi Québec dès la première fois et c\'est avec le certificat obtenu que j\'ai rapidement décroché un emploi bien rémunéré dans une compagnie.',
    name: 'Julio-Ngueno',
    title: '',
    initials: 'JN'
  }
])

// Slider State
const currentSlide = ref(0)
const currentTestimonial = ref(0)
let slideInterval = null
let testimonialInterval = null

// Counter animation
const animatedCount1 = ref(0)
const animatedCount2 = ref(0)
const animatedCount3 = ref(0)
let countersAnimated = false

// Slider Methods
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Counter Animation
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

// Scroll handler for counters
const handleScroll = () => {
  if (countersAnimated) return
  const countersSection = document.querySelector('.counters-section')
  if (countersSection) {
    const rect = countersSection.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) {
      countersAnimated = true
      animateCounter(animatedCount1, 26)
      animateCounter(animatedCount2, 98)
      animateCounter(animatedCount3, 50)
    }
  }
}

onMounted(() => {
  // Auto-advance slides
  slideInterval = setInterval(nextSlide, 5000)

  // Auto-advance testimonials
  testimonialInterval = setInterval(() => {
    currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.value.length
  }, 6000)

  // Listen for scroll to animate counters
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial position
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
  if (testimonialInterval) clearInterval(testimonialInterval)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Import fonts matching the original */
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Roboto:300,400,600,700');

.home-page {
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  color: #2d2e2e;
}

/* ================================
   Slider Section
   ================================ */
.home-slider {
  position: relative;
  height: 600px;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.slide.active {
  opacity: 1;
}

.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: #002b53;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 43, 83, 0.75);
}

.slide-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 0 20px;
  max-width: 900px;
  margin: 0 auto;
}

.slide-content h2 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
  animation: fadeInDown 0.8s ease-out;
}

.slide-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  line-height: 1.7;
  margin-bottom: 30px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.slide-btn {
  display: inline-block;
  padding: 14px 40px;
  background: #0277BC;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid #0277BC;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.slide-btn:hover {
  background: transparent;
  color: #fff;
  border-color: #fff;
}

.slider-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  font-size: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-control:hover {
  background: #0277BC;
}

.slider-control.prev {
  left: 20px;
}

.slider-control.next {
  right: 20px;
}

.slider-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.slider-indicators span {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-indicators span.active {
  background: #0277BC;
}

/* ================================
   Callouts Section
   ================================ */
.callouts-section {
  padding: 70px 0 60px;
  background: #fff;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #2d2e2e;
  margin-bottom: 10px;
}

.section-title h2 span {
  color: #0277BC;
}

.section-title.light h2 {
  color: #fff;
}

.section-title.light h2 span {
  color: #0277BC;
}

.title-border {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.bulb-icon {
  font-size: 28px;
}

.callouts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.callout-card {
  position: relative;
  text-decoration: none;
  color: inherit;
  display: block;
}

.callout-inner {
  background: #f5f5f5;
  padding: 45px 25px;
  text-align: center;
  transition: all 0.4s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.callout-card:hover .callout-inner {
  background: #002b53;
}

.callout-card:hover .callout-inner h3,
.callout-card:hover .callout-inner p {
  color: #fff;
}

.callout-icon {
  margin-bottom: 20px;
}

.icon-emoji {
  font-size: 50px;
  display: block;
}

.callout-inner h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.callout-inner p {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  transition: color 0.3s ease;
  margin: 0;
}

.animated-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background: #0277BC;
  transition: width 0.4s ease;
}

.callout-card:hover .animated-border {
  width: 100%;
}

/* ================================
   Counters Section
   ================================ */
.counters-section {
  padding: 70px 0;
  background: linear-gradient(rgba(0, 43, 83, 0.92), rgba(0, 43, 83, 0.92)),
              url('/images/about-us.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.counters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  text-align: center;
}

.counter-item {
  color: #fff;
  padding: 20px;
}

.counter-icon {
  font-size: 52px;
  margin-bottom: 20px;
  opacity: 0.9;
}

.counter-number {
  font-family: 'Roboto', sans-serif;
  font-size: 52px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.counter-item p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  margin: 0;
}

/* ================================
   About Section
   ================================ */
.about-section {
  padding: 70px 0;
  background: #fff;
}

.about-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 50px;
  align-items: center;
}

.about-text h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 25px;
}

.about-text p {
  color: #666;
  line-height: 1.9;
  margin-bottom: 25px;
  font-size: 15px;
}

.text-justify {
  text-align: justify;
}

.about-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
}

.about-list li {
  color: #555;
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
}

.list-arrow {
  color: #0277BC;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
}

.btn-primary {
  display: inline-block;
  padding: 12px 32px;
  background: #0277BC;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid #0277BC;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #002b53;
  border-color: #002b53;
}

.about-image img {
  width: 100%;
  height: auto;
}

/* ================================
   CTA Section
   ================================ */
.cta-section {
  padding: 35px 0;
  background: #0277BC;
}

.cta-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.cta-text h3 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
}

.cta-text h3 em {
  font-style: italic;
  font-weight: 300;
}

.btn-white {
  display: inline-block;
  padding: 12px 32px;
  background: #fff;
  color: #0277BC;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  border: 2px solid #fff;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-white:hover {
  background: transparent;
  color: #fff;
}

/* ================================
   Team Section
   ================================ */
.team-section {
  padding: 70px 0;
  background: #002b53;
}

.team-image {
  text-align: center;
  margin-top: 30px;
}

.team-image img {
  max-width: 100%;
  height: auto;
}

/* ================================
   Testimonials Section
   ================================ */
.testimonials-section {
  padding: 90px 0;
  background: linear-gradient(rgba(0, 43, 83, 0.95), rgba(0, 43, 83, 0.95)),
              url('/images/main-bg2.png');
  background-size: cover;
  background-position: center;
}

.testimonials-slider {
  max-width: 750px;
  margin: 0 auto;
  position: relative;
}

.testimonial-item {
  display: none;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.testimonial-item.active {
  display: block;
}

.testimonial-item blockquote {
  border: none;
  padding: 0;
  margin: 0;
}

.testimonial-item blockquote p {
  color: #fff;
  font-size: 18px;
  font-style: italic;
  line-height: 1.9;
  margin-bottom: 35px;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #0277BC;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 18px;
  border: 3px solid rgba(255,255,255,0.3);
}

.testimonial-author h4 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.testimonial-author h4 span {
  display: block;
  color: #0277BC;
  font-size: 14px;
  font-weight: 400;
  margin-top: 6px;
}

.testimonial-indicators {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 35px;
}

.testimonial-indicators span {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonial-indicators span.active {
  background: #0277BC;
}

/* ================================
   Animations
   ================================ */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ================================
   Responsive Styles
   ================================ */
@media (max-width: 991px) {
  .callouts-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-image {
    order: -1;
    text-align: center;
  }

  .about-image img {
    max-width: 450px;
  }

  .slide-content h2 {
    font-size: 36px;
  }
}

@media (max-width: 767px) {
  .home-slider {
    height: 500px;
  }

  .slide-content h2 {
    font-size: 28px;
    line-height: 1.2;
  }

  .slide-content p {
    font-size: 15px;
  }

  .slider-control {
    display: none;
  }

  .callouts-grid {
    grid-template-columns: 1fr;
  }

  .callout-inner {
    min-height: auto;
    padding: 35px 20px;
  }

  .counters-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .counter-number {
    font-size: 42px;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }

  .cta-text h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .section-title h2 {
    font-size: 28px;
  }

  .about-text h3 {
    font-size: 24px;
  }

  .testimonial-item blockquote p {
    font-size: 16px;
  }
}

/* ================================
   Image Placeholders
   ================================ */
.image-placeholder {
  background: linear-gradient(135deg, #002b53, #0277BC);
  border-radius: 8px;
  padding: 60px 40px;
  text-align: center;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 80px;
  display: block;
  margin-bottom: 20px;
}

.placeholder-text {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.team-placeholder {
  background: linear-gradient(135deg, #0277BC, #002b53);
  border-radius: 8px;
  padding: 80px 40px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-icon {
  font-size: 100px;
  display: block;
  margin-bottom: 20px;
}

.team-text {
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 30px;
}

.btn-outline {
  display: inline-block;
  padding: 12px 30px;
  border: 2px solid #fff;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: #fff;
  color: #002b53;
}
</style>