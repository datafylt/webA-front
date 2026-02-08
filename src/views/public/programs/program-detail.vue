<template>
  <div class="program-detail-page fe-page">
    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Breadcrumb -->
    <BreadcrumbSection :title="program?.title || 'Programme'" />

    <!-- Program Content -->
    <section class="program-section">
      <div class="fe-container">
        <div class="program-grid">
          <!-- Sidebar -->
          <aside class="program-sidebar">
            <div class="fe-sidebar-cta">
              <h4>{{ $t('public.program_detail.sidebar_cta') }}</h4>
              <router-link to="/contact" class="fe-btn fe-btn-primary">
                {{ $t('public.program_detail.contact_button') }}
              </router-link>
            </div>

            <div class="fe-sidebar-widget fe-sidebar-nav">
              <h4>{{ $t('public.program_detail.other_programs') }}</h4>
              <ul>
                <li 
                  v-for="prog in allPrograms" 
                  :key="prog.id" 
                  :class="{ active: prog.id === currentProgramId }"
                >
                  <router-link :to="`/programs/${prog.id}`">{{ prog.title }}</router-link>
                </li>
              </ul>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="program-main fe-content" v-if="program">
            <h3>{{ program.subTitle1 }}</h3>
            <div v-html="program.content"></div>
          </main>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <CtaSection :title="$t('public.program_detail.cta_title')" />

    <!-- Team Section -->
    <TeamSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { BreadcrumbSection, CtaSection, LanguageSwitcher, TeamSection, TestimonialsSection } from '@/components/public'
import { getProgramsData, getAllPrograms } from './programsData'

const route = useRoute()
const { locale } = useI18n()

const currentProgramId = computed(() => parseInt(route.params.id) || 1)

// Get data based on current locale
const programsData = computed(() => getProgramsData(locale.value))
const allPrograms = computed(() => getAllPrograms(locale.value))

const program = computed(() => programsData.value[currentProgramId.value] || programsData.value[1])

watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Watch locale changes to ensure reactivity
watch(() => locale.value, () => {
  // Trigger re-render by accessing computed properties
  programsData.value
  allPrograms.value
})
</script>

<style scoped src="@/assets/styles/program-detail.scoped.css"></style>
