<template>
  <div class="about-page fe-page">
    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Breadcrumb -->
    <BreadcrumbSection :title="$t('public.about.breadcrumb')" />

    <!-- About Content Section 1 -->
    <section class="about-section">
      <div class="fe-container">
        <div class="about-grid">
          <div class="about-text fe-content">
            <h2>{{ $t('public.about.history_title') }}</h2>
            <p class="fe-text-justify">{{ $t('public.about.history_content') }}</p>

            <h2>{{ $t('public.about.founder_title') }}</h2>
            <p class="fe-text-justify">{{ $t('public.about.founder_p1') }}</p>
            <p class="fe-text-justify">{{ $t('public.about.founder_p2') }}</p>
            <p class="fe-text-justify">{{ $t('public.about.founder_p3') }}</p>

            <h2>{{ $t('public.about.expertise_title') }}</h2>
            <p class="fe-text-justify">{{ $t('public.about.expertise_p1') }}</p>
            <p class="fe-text-justify">{{ $t('public.about.expertise_p2') }}</p>
          </div>
          <div class="about-images">
            <div class="about-img">
              <img src="/images/team4.png" alt="Yvan Dumais - Fondateur" />
            </div>
            <div class="about-img">
              <img src="/images/aboutUs.png" alt="Formation Électro - Nos installations" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <CtaSection
      :title="$t('public.about.cta_title')"
      :description="$t('public.about.cta_description')"
    />

    <!-- About Content Section 2 -->
    <section class="about-section">
      <div class="fe-container">
        <div class="about-text fe-content about-text--narrow">
          <h2>{{ $t('public.about.expansion_title') }}</h2>
          <p class="fe-text-justify">{{ $t('public.about.expansion_content') }}</p>

          <h2>{{ $t('public.about.services_title') }}</h2>
          <p class="fe-text-justify">{{ $t('public.about.services_intro') }}</p>
          <ul class="fe-list">
            <li>{{ $t('public.about.service1') }}</li>
            <li>{{ $t('public.about.service2') }}</li>
            <li>{{ $t('public.about.service3') }}</li>
            <li>{{ $t('public.about.service4') }}</li>
            <li>{{ $t('public.about.service5') }}</li>
            <li>{{ $t('public.about.service6') }}</li>
            <li>{{ $t('public.about.service7') }}</li>
          </ul>

          <h2>{{ $t('public.about.commitment_title') }}</h2>
          <p class="fe-text-justify">{{ $t('public.about.commitment_p1') }}</p>
          <p class="fe-text-justify">{{ $t('public.about.commitment_p2') }}</p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <TeamSection image="/images/team2.png" />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { BreadcrumbSection, CtaSection, LanguageSwitcher, TeamSection, TestimonialsSection } from '@/components/public'
</script>

<style scoped src="@/assets/styles/about.scoped.css"></style>
