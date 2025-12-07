<template>
  <div class="instructors-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection title="Nos Instructeurs" />

    <!-- Team Content Section -->
    <section class="team-content-section">
      <div class="fe-container">
        <div class="fe-section-title light">
          <h2>Notre <span>Équipe</span></h2>
          <div class="fe-title-border light">
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
    name: 'Yvan Dumais',
    role: 'Fondateur & Instructeur Principal',
    bio: "Maître électricien avec plus de 35 ans d'expérience. Détient un certificat de qualification d'électricien interprovincial et un brevet d'enseignement en électrotechnique du ministère de l'Éducation du Québec.",
    image: '/images/team4.png'
  },
  {
    id: 2,
    name: 'Mahmad Sabhir Pheerunggee',
    role: 'Instructeur',
    bio: "Électricien qualifié et formateur expérimenté. Travaille en étroite collaboration avec Yvan Dumais pour offrir des formations de qualité aux futurs électriciens.",
    image: '/images/team5.png'
  },
  {
    id: 3,
    name: 'Équipe Formation Électro',
    role: 'Support Administratif',
    bio: "Notre équipe administrative assure le bon déroulement des formations et accompagne les étudiants tout au long de leur parcours.",
    image: '/images/team3.png'
  }
])
</script>

<style scoped src="@/assets/styles/instructors.scoped.css"></style>
