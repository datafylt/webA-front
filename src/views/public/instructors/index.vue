<template>
  <div class="instructors-page">
    <!-- Breadcrumb -->
    <section class="breadcrumb-wrapper">
      <div class="container">
        <div class="breadcrumb-inner">
          <div class="breadcrumb-title">
            <h1>Nos instructeurs</h1>
          </div>
          <div class="breadcrumb-nav">
            <ul>
              <li><router-link to="/">Accueil</router-link></li>
              <li>Pages</li>
              <li>Nos instructeurs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Content Section -->
    <section class="team-content-section">
      <div class="container">
        <div class="team-grid">
          <div class="team-image-wrapper">
            <div class="title-border">
              <span class="bulb-icon">💡</span>
            </div>
            <div class="member-image">
              <img src="/images/team1.png" alt="Nos instructeurs" />
            </div>
          </div>
          <div class="team-text">
            <p>
              Notre éventail de services étant vaste, nous disposons depuis ... 2017
              d'un autre formateur bilingue en la personne de M. Mahmad Sabhir Pheerunggee.
              Il s'est joint à l'équipe comme formateur et associé et depuis, l'entreprise
              ne cesse de s'épanouir et d'offrir les meilleurs services de formation en
              Français ainsi qu'en Anglais pour un meilleur support aux entreprises de
              même qu'aux particuliers.
            </p>
            <p>
              C'est donc avec force et enthousiasme que nous répondons à vos besoins
              dans le domaine de l'électrotechnique.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members Gallery -->
    <section class="team-gallery-section">
      <div class="container">
        <div class="section-title">
          <h2>Notre <span>Équipe</span></h2>
          <div class="title-border-dark">
            <span class="bulb-icon">💡</span>
          </div>
        </div>
        <div class="team-gallery">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="team-member"
          >
            <div class="member-photo">
              <img :src="member.image" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <span class="member-role">{{ member.role }}</span>
            </div>
          </div>
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
                <img :src="testimonial.image" :alt="testimonial.name" />
                <h3>{{ testimonial.name }} <span v-if="testimonial.title">{{ testimonial.title }}</span></h3>
              </div>
            </blockquote>
          </div>

          <!-- Testimonial Indicators -->
          <div class="testimonial-indicators">
            <span
              v-for="(testimonial, index) in testimonials"
              :key="index"
              :class="{ active: currentTestimonial === index }"
              @click="goToTestimonial(index)"
            ></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Team Members Data
const teamMembers = ref([
  {
    id: 1,
    name: 'Yvan Dumais',
    role: 'Fondateur & Maître Électricien',
    image: '/images/team4.png'
  },
  {
    id: 2,
    name: 'Mahmad Sabhir Pheerunggee',
    role: 'Formateur & Associé',
    image: '/images/team2.png'
  },
  {
    id: 3,
    name: 'Équipe Formation',
    role: 'Instructeurs Qualifiés',
    image: '/images/team3.png'
  }
])

// Testimonials Data
const testimonials = ref([
  {
    quote: 'Passed 74%, thanks for all Your help very good teacher(@Mahmad)',
    name: 'Maverick Clayton',
    title: 'Tembec Témiscaming',
    image: '/images/testimonials1.png'
  },
  {
    quote: 'Grâce à "Formation Electo Inc.", j\'ai réussi mon examen d\'Emploi Québec dès la première fois et c\'est avec le certificat obtenu que j\'ai rapidement décroché un emploi bien rémunéré dans une compagnie.',
    name: 'Julio-Ngueno',
    title: '',
    image: '/images/Julio-Ngueno.png'
  }
])

// Testimonial slider state
const currentTestimonial = ref(0)
let testimonialInterval = null

const goToTestimonial = (index) => {
  currentTestimonial.value = index
}

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.value.length
}

// Lifecycle
onMounted(() => {
  // Auto-advance testimonials
  testimonialInterval = setInterval(nextTestimonial, 6000)
})

onUnmounted(() => {
  if (testimonialInterval) {
    clearInterval(testimonialInterval)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Roboto:300,400,600,700');

.instructors-page {
  font-family: 'Open Sans', sans-serif;
  color: #2d2e2e;
}

/* ================================
   Breadcrumb
   ================================ */
.breadcrumb-wrapper {
  background: linear-gradient(rgba(0, 43, 83, 0.9), rgba(0, 43, 83, 0.9)),
              url('/images/about-us.jpg');
  background-size: cover;
  background-position: center;
  padding: 60px 0;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.breadcrumb-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.breadcrumb-title h1 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
}

.breadcrumb-nav ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 10px;
}

.breadcrumb-nav ul li {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.breadcrumb-nav ul li::after {
  content: '/';
  margin-left: 10px;
  color: rgba(255, 255, 255, 0.5);
}

.breadcrumb-nav ul li:last-child::after {
  display: none;
}

.breadcrumb-nav ul li a {
  color: #0277BC;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb-nav ul li a:hover {
  color: #fff;
}

/* ================================
   Team Content Section
   ================================ */
.team-content-section {
  background: #002b53;
  padding: 60px 0;
}

.team-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 50px;
  align-items: center;
}

.team-image-wrapper {
  text-align: center;
}

.title-border {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.title-border::before,
.title-border::after {
  content: '';
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.bulb-icon {
  font-size: 24px;
}

.member-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.team-text {
  padding: 20px 0;
}

.team-text p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.9;
  margin-bottom: 20px;
}

.team-text p:last-child {
  margin-bottom: 0;
}

/* ================================
   Team Gallery Section
   ================================ */
.team-gallery-section {
  padding: 80px 0;
  background: #f5f5f5;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 15px;
}

.section-title h2 span {
  color: #0277BC;
}

.title-border-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.title-border-dark::before,
.title-border-dark::after {
  content: '';
  width: 80px;
  height: 2px;
  background: #ddd;
}

.team-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.team-member {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.member-photo {
  position: relative;
  overflow: hidden;
}

.member-photo img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-member:hover .member-photo img {
  transform: scale(1.05);
}

.member-info {
  padding: 25px;
  text-align: center;
  background: #fff;
}

.member-info h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 5px;
}

.member-role {
  color: #0277BC;
  font-size: 14px;
  font-weight: 500;
}

/* ================================
   Testimonials Section
   ================================ */
.testimonials-section {
  background: linear-gradient(rgba(0, 43, 83, 0.85), rgba(0, 43, 83, 0.85)),
              url('/images/main-bg2.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 80px 0;
}

.testimonials-slider {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.testimonial-item {
  display: none;
}

.testimonial-item.active {
  display: block;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

.testimonial-author h3 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.testimonial-author h3 span {
  display: block;
  color: #0277BC;
  font-size: 14px;
  font-weight: 400;
  margin-top: 5px;
}

/* Testimonial Indicators */
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
  transition: background 0.3s;
}

.testimonial-indicators span.active {
  background: #0277BC;
}

.testimonial-indicators span:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* ================================
   Responsive
   ================================ */
@media (max-width: 991px) {
  .breadcrumb-inner {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .team-image-wrapper {
    order: -1;
  }

  .team-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .breadcrumb-title h1 {
    font-size: 28px;
  }

  .team-gallery {
    grid-template-columns: 1fr;
  }

  .section-title h2 {
    font-size: 28px;
  }

  .testimonial-item blockquote p {
    font-size: 16px;
  }
}
</style>