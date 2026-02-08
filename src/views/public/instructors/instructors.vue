<template>
  <div class="instructors-page fe-page">
    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Breadcrumb -->
    <BreadcrumbSection :title="$t('public.instructors.breadcrumb')" />

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
            <p>{{ $t('public.instructors.intro_p1') }}</p>
            <p>{{ $t('public.instructors.intro_p2') }}</p>
            <p>{{ $t('public.instructors.intro_p3') }}</p>
            <p>{{ $t('public.instructors.intro_p4') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Gallery Section -->
    <section class="team-content-section">
      <div class="fe-container">
        <div class="fe-section-title">
          <h2>{{ $t('public.instructors.team_title') }} <span>{{ $t('public.instructors.team_title_span') }}</span></h2>
          <div class="fe-title-border">
            <span class="fe-bulb-icon">💡</span>
          </div>
        </div>

        <div class="team-gallery">
          <div v-for="member in teamMembers" :key="member.id" class="team-member">
            <div class="member-image">
              <img :src="member.image" :alt="$t(`public.instructors.members.${member.id}.name`)" />
            </div>
            <div class="member-info">
              <h3>{{ $t(`public.instructors.members.${member.id}.name`) }}</h3>
              <p class="member-role">{{ $t(`public.instructors.members.${member.id}.role`) }}</p>
              <p class="member-bio">{{ $t(`public.instructors.members.${member.id}.bio`) }}</p>
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
import { BreadcrumbSection, LanguageSwitcher, TestimonialsSection } from '@/components/public'

const teamMembers = ref([
  {
    id: 1,
    image: '/images/team5.png'
  },
  {
    id: 2,
    image: '/images/team4.png'
  },
  {
    id: 3,
    image: '/images/team3.png'
  },
  {
    id: 4,
    image: '/images/team-it.png'
  }
])
</script>

<style scoped src="@/assets/styles/instructors.scoped.css"></style>
