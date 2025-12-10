<template>
  <div class="instructors-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection title="Nos Instructeurs et Équipe" />

    <!-- Intro Section -->
    <section class="team-intro-section">
      <div class="fe-container">
        <div class="team-intro">
          <div class="team-intro-image">
            <div class="title-border">
              <span class="bulb-icon">💡</span>
            </div>
            <img src="/images/team1.png" alt="Notre équipe" />
          </div>
          <div class="team-intro-text">
            <p>
              Notre éventail de services étant vaste, nous disposons depuis 2017 d'un autre 
              formateur bilingue en la personne de M. Mahmad Sabhir Pheerunggee. Il s'est 
              joint à l'équipe comme formateur et associé et depuis, l'entreprise ne cesse 
              de s'épanouir et d'offrir les meilleurs services de formation en Français 
              ainsi qu'en Anglais pour un meilleur support aux entreprises de même qu'aux 
              particuliers.
            </p>
            <p>
              Avec plus de 30 ans d'expertise combinée dans le domaine de l'électricité, 
              notre équipe possède une connaissance approfondie des normes du Code de 
              l'électricité du Québec, des exigences d'Emploi Québec et des meilleures 
              pratiques de l'industrie. Nous offrons un accompagnement personnalisé à 
              chaque étudiant, adaptant nos méthodes d'enseignement selon les besoins 
              individuels et les objectifs professionnels de chacun.
            </p>
            <p>
              Notre approche pédagogique combine la théorie et la pratique, permettant 
              aux candidats de développer les compétences essentielles pour réussir leurs 
              examens de qualification. Que ce soit pour la licence C, le certificat RCA, 
              les examens de la RBQ, de la CMEQ ou le Sceau Rouge, nous préparons nos 
              étudiants avec rigueur et professionnalisme.
            </p>
            <p>
              C'est donc avec force et enthousiasme que nous répondons à vos besoins dans 
              le domaine de l'électrotechnique. Notre mission est de vous accompagner vers 
              la réussite et de contribuer à l'excellence de la main-d'œuvre québécoise 
              dans le secteur de l'électricité.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Gallery Section -->
    <section class="team-content-section">
      <div class="fe-container">
        <div class="fe-section-title">
          <h2>Notre <span>Équipe</span></h2>
          <div class="fe-title-border">
            <span class="fe-bulb-icon">💡</span>
          </div>
        </div>

        <div class="team-gallery">
          <div v-for="member in teamMembers" :key="member.id" class="team-member">
            <div class="member-image">
              <img :src="member.image" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-bio">{{ member.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BreadcrumbSection, TestimonialsSection } from '@/components/public'

const teamMembers = ref([
  {
    id: 1,
    name: 'Mahmad Sabhir Pheerunggee',
    role: 'Instructeur Principal & Associé',
    bio: "Instructeur principal et associé depuis 2017, M. Pheerunggee est un formateur bilingue d'expérience. Il assure la majorité des formations en Français et en Anglais, offrant un accompagnement personnalisé aux entreprises et aux particuliers. Son expertise et son dévouement contribuent grandement au succès de nos étudiants.",
    image: '/images/team5.png'
  },
  {
    id: 2,
    name: 'Yvan Dumais',
    role: 'Fondateur & Instructeur Principal',
    bio: "Maître électricien avec plus de 35 ans d'expérience. Détient un certificat de qualification d'électricien interprovincial et un brevet d'enseignement en électrotechnique du ministère de l'Éducation du Québec.",
    image: '/images/team4.png'
  },
  {
    id: 3,
    name: 'Équipe Formation Électro',
    role: 'Support Administratif',
    bio: "Notre équipe administrative assure le bon déroulement des formations et accompagne les étudiants tout au long de leur parcours.",
    image: '/images/team3.png'
  },
  {
    id: 4,
    name: 'Département TI',
    role: 'Support Informatique',
    bio: "Notre département informatique assure le bon fonctionnement des systèmes, la gestion du site web et des outils numériques, ainsi que le support technique pour garantir une expérience d'apprentissage optimale.",
    image: '/images/team-it.png'
  }
])
</script>

<style scoped src="@/assets/styles/instructors.scoped.css"></style>
