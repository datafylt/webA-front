<template>
  <div class="programs-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection title="Nos Programmes" />

    <!-- Programs Grid -->
    <section class="programs-section">
      <div class="fe-container">
        <div class="fe-section-title">
          <h2>Programmes de <span>Formation</span></h2>
          <div class="fe-title-border">
            <span class="fe-bulb-icon">💡</span>
          </div>
        </div>

        <div class="programs-grid">
          <router-link
            v-for="program in programs"
            :key="program.id"
            :to="`/programs/${program.id}`"
            class="program-card"
          >
            <div class="program-icon">{{ program.emoji }}</div>
            <h3>{{ program.title }}</h3>
            <p>{{ program.description }}</p>
            <span class="program-link">En savoir plus →</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <CtaSection :title="ctaTitle" />

    <!-- Team Section -->
    <TeamSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BreadcrumbSection, CtaSection, TeamSection, TestimonialsSection } from '@/components/public'

const ctaTitle = 'Formation en vue de l\'obtention de la qualification de compagnon électricien <em>(Licence C)</em>'

const programs = ref([
  {
    id: 1,
    title: 'Compagnon Électricien Licence C',
    description: 'Formation complète pour obtenir la qualification de compagnon électricien hors construction.',
    emoji: '⚡'
  },
  {
    id: 2,
    title: 'Connexions restreintes (RCA)',
    description: "Formation pour le certificat restreint en connexion d'appareillage électrique.",
    emoji: '🔌'
  },
  {
    id: 3,
    title: 'Constructeur propriétaire (RBQ)',
    description: 'Préparation aux examens de constructeur propriétaire de la Régie du bâtiment.',
    emoji: '🏗️'
  },
  {
    id: 4,
    title: 'Entrepreneur électricien (CMEQ)',
    description: "Préparation aux examens d'entrepreneur électricien de la CMEQ.",
    emoji: '📋'
  },
  {
    id: 5,
    title: 'Sceau Rouge',
    description: "Préparation à l'examen interprovincial Sceau Rouge pour électriciens.",
    emoji: '🔴'
  },
  {
    id: 6,
    title: 'Compagnonnage en atelier',
    description: 'Formation pratique en atelier avec accompagnement professionnel personnalisé.',
    emoji: '🛠️'
  }
])
</script>

<style scoped src="@/assets/styles/programs.scoped.css"></style>
