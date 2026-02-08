<template>
  <div class="programs-page fe-page">
    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Breadcrumb -->
    <BreadcrumbSection :title="$t('public.programs.breadcrumb')" />

    <!-- Programs Grid -->
    <section class="programs-section">
      <div class="fe-container">
        <div class="fe-section-title">
          <h2>{{ $t('public.programs.section_title') }} <span>{{ $t('public.programs.section_title_span') }}</span></h2>
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
            <h3>{{ $t(`public.programs.list.${program.id}.title`) }}</h3>
            <p>{{ $t(`public.programs.list.${program.id}.description`) }}</p>
            <span class="program-link">{{ $t('public.programs.learn_more') }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <CtaSection :title="$t('public.programs.cta_title')" />

    <!-- Team Section -->
    <TeamSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BreadcrumbSection, CtaSection, LanguageSwitcher, TeamSection, TestimonialsSection } from '@/components/public'

const programs = ref([
  { id: 1, emoji: '⚡' },
  { id: 2, emoji: '🔌' },
  { id: 3, emoji: '🏗️' },
  { id: 4, emoji: '📋' },
  { id: 5, emoji: '🔴' },
  { id: 6, emoji: '🛠️' }
])
</script>

<style scoped src="@/assets/styles/programs.scoped.css"></style>
