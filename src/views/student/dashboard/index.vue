<template>
  <CommonPage show-header>
    <template #header>
      <n-space vertical>
        <n-h2 style="margin: 0">
          Bonjour, {{ studentName }} 👋
        </n-h2>
        <n-text depth="3">Bienvenue dans votre espace étudiant</n-text>
      </n-space>
    </template>

    <!-- Stats Cards -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16" responsive="screen" item-responsive>
      <n-grid-item span="4 m:1">
        <n-card>
          <n-statistic label="Programmes inscrits">
            <template #prefix>
              <n-icon color="#0277BC"><mdi-book-education /></n-icon>
            </template>
            {{ stats.enrolledPrograms }}
          </n-statistic>
        </n-card>
      </n-grid-item>
      
      <n-grid-item span="4 m:1">
        <n-card>
          <n-statistic label="Documents disponibles">
            <template #prefix>
              <n-icon color="#4CAF50"><mdi-file-document-multiple /></n-icon>
            </template>
            {{ stats.documentsAvailable }}
          </n-statistic>
        </n-card>
      </n-grid-item>
      
      <n-grid-item span="4 m:1">
        <n-card>
          <n-statistic label="Prochaine session">
            <template #prefix>
              <n-icon color="#FF9800"><mdi-calendar-clock /></n-icon>
            </template>
            <template #suffix>
              <n-text depth="3" style="font-size: 14px">jours</n-text>
            </template>
            {{ stats.daysUntilNextSession }}
          </n-statistic>
        </n-card>
      </n-grid-item>
      
      <n-grid-item span="4 m:1">
        <n-card>
          <n-statistic label="Téléchargements">
            <template #prefix>
              <n-icon color="#9C27B0"><mdi-download /></n-icon>
            </template>
            {{ stats.totalDownloads }}
          </n-statistic>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- Main Content -->
    <n-grid :cols="3" :x-gap="16" :y-gap="16" style="margin-top: 16px" responsive="screen" item-responsive>
      <!-- Enrolled Programs -->
      <n-grid-item span="3 m:2">
        <n-card title="Mes programmes">
          <template #header-extra>
            <n-button text type="primary" @click="goToCourses">
              Voir tout
              <template #icon>
                <n-icon><mdi-arrow-right /></n-icon>
              </template>
            </n-button>
          </template>
          
          <n-space vertical>
            <n-card 
              v-for="program in enrolledPrograms" 
              :key="program.id"
              size="small"
              hoverable
              @click="goToProgram(program.id)"
              style="cursor: pointer"
            >
              <n-space align="center" justify="space-between">
                <n-space align="center">
                  <n-icon size="32" :color="program.color">
                    <mdi-lightning-bolt />
                  </n-icon>
                  <n-space vertical size="small">
                    <n-text strong>{{ program.name }}</n-text>
                    <n-text depth="3" style="font-size: 12px">
                      {{ program.course_count }} cours • {{ program.material_count }} documents
                    </n-text>
                  </n-space>
                </n-space>
                
                <n-space align="center">
                  <n-tag :type="program.status === 'active' ? 'success' : 'warning'" size="small">
                    {{ program.status === 'active' ? 'Actif' : 'Expiré' }}
                  </n-tag>
                  <n-icon><mdi-chevron-right /></n-icon>
                </n-space>
              </n-space>
            </n-card>
            
            <n-empty v-if="enrolledPrograms.length === 0" description="Aucun programme inscrit" />
          </n-space>
        </n-card>
      </n-grid-item>

      <!-- Upcoming Sessions -->
      <n-grid-item span="3 m:1">
        <n-card title="Prochaines sessions">
          <template #header-extra>
            <n-button text type="primary" @click="goToCalendar">
              Calendrier
              <template #icon>
                <n-icon><mdi-calendar /></n-icon>
              </template>
            </n-button>
          </template>
          
          <n-space vertical>
            <div v-for="session in upcomingSessions" :key="session.id" class="session-item">
              <n-space vertical size="small">
                <n-text strong>{{ session.title }}</n-text>
                <n-space align="center" size="small">
                  <n-icon size="14"><mdi-calendar /></n-icon>
                  <n-text depth="3" style="font-size: 12px">{{ formatDate(session.date) }}</n-text>
                </n-space>
                <n-space align="center" size="small">
                  <n-icon size="14"><mdi-clock-outline /></n-icon>
                  <n-text depth="3" style="font-size: 12px">{{ session.time }}</n-text>
                </n-space>
                <n-tag :type="session.type === 'in_person' ? 'info' : 'success'" size="small">
                  {{ session.type === 'in_person' ? 'Présentiel' : 'En ligne' }}
                </n-tag>
              </n-space>
            </div>
            
            <n-empty v-if="upcomingSessions.length === 0" description="Aucune session prévue" />
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- Recent Documents -->
    <n-card title="Documents récents" style="margin-top: 16px">
      <n-list>
        <n-list-item v-for="doc in recentDocuments" :key="doc.id">
          <template #prefix>
            <n-icon size="24" :color="getDocColor(doc.type)">
              <component :is="getDocIcon(doc.type)" />
            </n-icon>
          </template>
          <n-thing :title="doc.title" :description="doc.program">
            <template #header-extra>
              <n-button type="primary" size="small" @click="downloadDocument(doc)">
                <template #icon>
                  <n-icon><mdi-download /></n-icon>
                </template>
                Télécharger
              </n-button>
            </template>
          </n-thing>
        </n-list-item>
      </n-list>
      
      <n-empty v-if="recentDocuments.length === 0" description="Aucun document disponible" />
    </n-card>
  </CommonPage>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Icons
import MdiBookEducation from '~icons/mdi/book-education'
import MdiFileDocumentMultiple from '~icons/mdi/file-document-multiple'
import MdiCalendarClock from '~icons/mdi/calendar-clock'
import MdiDownload from '~icons/mdi/download'
import MdiArrowRight from '~icons/mdi/arrow-right'
import MdiLightningBolt from '~icons/mdi/lightning-bolt'
import MdiChevronRight from '~icons/mdi/chevron-right'
import MdiCalendar from '~icons/mdi/calendar'
import MdiClockOutline from '~icons/mdi/clock-outline'
import MdiFilePdfBox from '~icons/mdi/file-pdf-box'
import MdiFileWord from '~icons/mdi/file-word'
import MdiFileExcel from '~icons/mdi/file-excel'
import MdiFile from '~icons/mdi/file'

const router = useRouter()

// Student info (would come from store/API)
const studentName = ref('Jean Tremblay')

// Stats
const stats = ref({
  enrolledPrograms: 2,
  documentsAvailable: 18,
  daysUntilNextSession: 7,
  totalDownloads: 12,
})

// Enrolled programs
const enrolledPrograms = ref([
  {
    id: 1,
    name: 'Licence C - Compagnon Électricien',
    course_count: 5,
    material_count: 24,
    status: 'active',
    color: '#0277BC',
  },
  {
    id: 2,
    name: 'RCA - Connexions Restreintes',
    course_count: 3,
    material_count: 15,
    status: 'active',
    color: '#4CAF50',
  },
])

// Upcoming sessions
const upcomingSessions = ref([
  {
    id: 1,
    title: 'Licence C - Circuits résidentiels',
    date: '2025-12-14',
    time: '9h00 - 16h00',
    type: 'in_person',
  },
  {
    id: 2,
    title: 'RCA - Révision générale',
    date: '2025-12-21',
    time: '9h00 - 12h00',
    type: 'online',
  },
])

// Recent documents
const recentDocuments = ref([
  {
    id: 1,
    title: 'Code électricité - Chapitres 1-4',
    program: 'Licence C',
    type: 'pdf',
    url: '/documents/code_elec_1-4.pdf',
  },
  {
    id: 2,
    title: 'Formules importantes',
    program: 'Licence C',
    type: 'pdf',
    url: '/documents/formules.pdf',
  },
  {
    id: 3,
    title: 'Examen pratique #1',
    program: 'Licence C',
    type: 'pdf',
    url: '/documents/exam_pratique_1.pdf',
  },
])

// Methods
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-CA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

function getDocIcon(type) {
  const icons = {
    pdf: MdiFilePdfBox,
    doc: MdiFileWord,
    docx: MdiFileWord,
    xls: MdiFileExcel,
    xlsx: MdiFileExcel,
  }
  return icons[type] || MdiFile
}

function getDocColor(type) {
  const colors = {
    pdf: '#F44336',
    doc: '#2196F3',
    docx: '#2196F3',
    xls: '#4CAF50',
    xlsx: '#4CAF50',
  }
  return colors[type] || '#607D8B'
}

function goToCourses() {
  router.push('/student/courses')
}

function goToProgram(id) {
  router.push(`/student/courses/${id}`)
}

function goToCalendar() {
  router.push('/student/calendar')
}

function downloadDocument(doc) {
  // TODO: Implement download
  $message.success(`Téléchargement de "${doc.title}"`)
  console.log('Download:', doc)
}

onMounted(() => {
  // Load student data from API
})
</script>

<style scoped>
.session-item {
  padding: 12px;
  border-radius: 8px;
  background: var(--n-color-embedded);
  margin-bottom: 8px;
}

.session-item:last-child {
  margin-bottom: 0;
}
</style>
