<template>
  <div class="about-page">
    <!-- Breadcrumb -->
    <section class="breadcrumb-wrapper">
      <div class="container">
        <div class="breadcrumb-inner">
          <div class="breadcrumb-title">
            <h1>À Propos De Nous</h1>
          </div>
          <div class="breadcrumb-nav">
            <ul>
              <li><router-link to="/">Accueil</router-link></li>
              <li>À propos de nous</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- About Content Section 1 -->
    <section class="about-section">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <h2>Fondateur</h2>
            <p class="text-justify">
              Voici un bref historique de "formation électro Inc." et les noms de plusieurs
              entreprises qui ont pu bénéficier de nos formations et services.
            </p>
            <p class="text-justify">
              Yvan Dumais est maître électricien, il détient un certificat de qualification
              d'électricien interprovincial et d'un brevet d'enseignement en électrotechnique
              du ministère de l'Éducation du Québec, il est aussi formateur en santé et
              sécurité dans le milieu du travail.
            </p>
            <p class="text-justify">
              Après une carrière de plus de 10 ans comme électricien professionnel il a
              poursuivi les prochaines 25 années dans l'enseignement de l'électrotechnique.
              En 1992, il a fondé l'entreprise "formation électro Inc." et depuis il a
              partagé son savoir-faire à M. Mahmad Sabhir Pheerunggee.
            </p>

            <h2>Expérience</h2>
            <p class="text-justify">
              Fort de cette longue expérience pratique et de ses connaissances théoriques
              approfondie, il a d'abord élaboré un plan de formations pour aider les apprentis
              électriciens à réviser leurs notions théoriques dans le but de présenter et
              réussir le test de compagnon électricien (licence C) construction ou hors
              construction et pour le test d'électricien interprovincial (sceau rouge).
            </p>
            <p class="text-justify">
              Par la suite il a élaboré un autre plan de formation pour les électriciens
              afin de les aider pour les tests de Maîtres électriciens ou constructeurs
              propriétaires.
            </p>
          </div>
          <div class="about-images">
            <div class="about-img">
              <img src="/images/team4.png" alt="Fondateur" />
            </div>
            <div class="about-img">
              <img src="/images/aboutUs.png" alt="Formation Électro" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h3>L'élaboration des examens mesurant la compétence du pré-embauche</h3>
            <p>
              À la demande des dirigeants d'entreprises, "Formation électro Inc." élabore
              des examens théoriques et pratiques dans le but d'évaluer la compétence des
              éventuels candidats à l'embauche.
            </p>
          </div>
          <div class="cta-button">
            <router-link to="/contact" class="btn-white">Contactez-nous</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- About Content Section 2 -->
    <section class="about-section">
      <div class="container">
        <div class="about-text full-width">
          <h2>En 2008</h2>
          <p class="text-justify">
            J'ai élaboré un plan de formation pour les futurs compagnons en connexions
            restreintes d'appareillage électrique puisque c'est l'année ou Emploie Québec
            et ses partenaires donnaient cette accessibilité aux travailleurs Québécois
            soit d'obtenir le certificat de compagnon connexions restreintes d'appareillage
            électrique (CRCA).
          </p>
          <p class="text-justify">
            Plus est, Formation Électro inc, dispense des formations pratiques et théoriques
            en contrôle de moteurs, installation et contrôle de chauffage, d'éclairage et
            installation de transformateurs monophasé ou triphasé. Des cours en lecture de
            plans et devis, de croquis et schémas, élaboration d'examens pré-embauche
            théoriques et pratiques.
          </p>
          <p class="text-justify">
            Bref, Formation Électro Inc. peut répondre à plusieurs, sinon tous vos besoins
            de formations en ce qui concerne l'électricité et est une référence très
            appréciable dans ce domaine.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-title">
          <h2>Nos <span>Instructeurs</span></h2>
          <div class="title-border">
            <span class="bulb-icon">💡</span>
          </div>
        </div>
        <div class="team-image">
          <img src="/images/team2.png" alt="Nos Instructeurs" />
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

.about-page {
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
   About Section
   ================================ */
.about-section {
  padding: 60px 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.about-text h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 20px;
  margin-top: 30px;
}

.about-text h2:first-child {
  margin-top: 0;
}

.about-text p {
  color: #666;
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 15px;
}

.text-justify {
  text-align: justify;
}

.about-text.full-width {
  max-width: 100%;
}

/* About Images */
.about-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-img img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* ================================
   Call to Action
   ================================ */
.cta-section {
  background: #0277BC;
  padding: 40px 0;
}

.cta-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.cta-text {
  flex: 1;
}

.cta-text h3 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
}

.cta-text p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.cta-button {
  flex-shrink: 0;
}

.btn-white {
  display: inline-block;
  padding: 12px 30px;
  background: #fff;
  color: #0277BC;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-white:hover {
  background: transparent;
  color: #fff;
  box-shadow: inset 0 0 0 2px #fff;
}

/* ================================
   Team Section
   ================================ */
.team-section {
  background: #002b53;
  padding: 60px 0;
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
  height: auto;
  border-radius: 8px;
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

  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-images {
    order: -1;
    flex-direction: row;
  }

  .about-img {
    flex: 1;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 767px) {
  .breadcrumb-title h1 {
    font-size: 28px;
  }

  .about-text h2 {
    font-size: 24px;
  }

  .about-images {
    flex-direction: column;
  }

  .cta-text h3 {
    font-size: 18px;
  }

  .section-title h2 {
    font-size: 28px;
  }

  .testimonial-item blockquote p {
    font-size: 16px;
  }
}
</style>