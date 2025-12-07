<template>
  <div class="program-detail-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection :title="program?.title || 'Programme'" />

    <!-- Program Content -->
    <section class="program-section">
      <div class="fe-container">
        <div class="program-grid">
          <!-- Sidebar -->
          <aside class="program-sidebar">
            <div class="fe-sidebar-cta">
              <h4>Voulez-vous en savoir davantage?</h4>
              <router-link to="/contact" class="fe-btn fe-btn-primary">
                Contactez-nous
              </router-link>
            </div>

            <div class="fe-sidebar-widget fe-sidebar-nav">
              <h4>Autres Programmes</h4>
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
    <CtaSection :title="ctaTitle" />

    <!-- Team Section -->
    <TeamSection />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BreadcrumbSection, CtaSection, TeamSection, TestimonialsSection } from '@/components/public'
import { programsData, allPrograms } from './programsData'

const route = useRoute()

const ctaTitle = 'Formation Électro Inc., dispose de 2 locaux pour la théorie équipés de système informatique'

const currentProgramId = computed(() => parseInt(route.params.id) || 1)
const program = computed(() => programsData[currentProgramId.value] || programsData[1])

watch(() => route.params.id, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped src="@/assets/styles/program-detail.scoped.css"></style>
