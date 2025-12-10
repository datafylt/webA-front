<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleCreate">
        <TheIcon icon="mdi:plus" :size="18" class="mr-4" />
        Nouvelle session
      </n-button>
    </template>

    <!-- Filters -->
    <n-card size="small" class="mb-4">
      <n-space>
        <n-input 
          v-model:value="filters.search" 
          placeholder="Rechercher..."
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix>
            <TheIcon icon="mdi:magnify" :size="16" />
          </template>
        </n-input>
        
        <n-select
          v-model:value="filters.program_id"
          placeholder="Programme"
          clearable
          style="width: 200px"
          :options="programOptions"
          @update:value="handleFilter"
        />
        
        <n-select
          v-model:value="filters.status"
          placeholder="Statut"
          clearable
          style="width: 150px"
          :options="statusOptions"
          @update:value="handleFilter"
        />

        <n-checkbox v-model:checked="filters.upcoming" @update:checked="handleFilter">
          À venir seulement
        </n-checkbox>

        <n-button @click="handleSearch">Rechercher</n-button>
      </n-space>
    </n-card>

    <!-- Sessions Table -->
    <n-data-table
      :columns="columns"
      :data="sessions"
      :loading="loading"
      :pagination="pagination"
      :row-key="row => row.id"
      striped
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />

    <!-- Create/Edit Modal -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      :title="modalTitle"
      style="width: 700px"
      :mask-closable="false"
    >
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="130px"
      >
        <n-form-item label="Programme" path="program_id">
          <n-select
            v-model:value="formData.program_id"
            placeholder="Sélectionner un programme"
            :options="programOptions"
          />
        </n-form-item>

        <n-form-item label="Titre" path="title">
          <n-input v-model:value="formData.title" placeholder="Titre de la session" />
        </n-form-item>
        
        <n-form-item label="Description" path="description">
          <n-input 
            v-model:value="formData.description" 
            type="textarea"
            placeholder="Description/notes"
            :rows="2"
          />
        </n-form-item>
        
        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Date début" path="start_date">
              <n-date-picker 
                v-model:formatted-value="formData.start_date"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Date fin" path="end_date">
              <n-date-picker 
                v-model:formatted-value="formData.end_date"
                type="date"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Heure début" path="start_time">
              <n-time-picker 
                v-model:formatted-value="formData.start_time"
                format="HH:mm"
                value-format="HH:mm:ss"
                style="width: 100%"
              />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Heure fin" path="end_time">
              <n-time-picker 
                v-model:formatted-value="formData.end_time"
                format="HH:mm"
                value-format="HH:mm:ss"
                style="width: 100%"
              />
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-form-item label="Type de lieu" path="location_type">
          <n-radio-group v-model:value="formData.location_type">
            <n-radio value="in_person">En personne</n-radio>
            <n-radio value="online">En ligne</n-radio>
            <n-radio value="hybrid">Hybride</n-radio>
          </n-radio-group>
        </n-form-item>

        <n-form-item v-if="formData.location_type !== 'online'" label="Lieu" path="location">
          <n-input v-model:value="formData.location" placeholder="Adresse du lieu" />
        </n-form-item>

        <n-form-item v-if="formData.location_type !== 'in_person'" label="Lien en ligne" path="online_link">
          <n-input v-model:value="formData.online_link" placeholder="Lien Zoom/Teams" />
        </n-form-item>

        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Places max" path="max_participants">
              <n-input-number v-model:value="formData.max_participants" :min="1" :max="100" style="width: 100%" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Places min" path="min_participants">
              <n-input-number v-model:value="formData.min_participants" :min="1" :max="50" style="width: 100%" />
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-form-item label="Formateur" path="instructor_name">
          <n-input v-model:value="formData.instructor_name" placeholder="Nom du formateur" />
        </n-form-item>

        <n-form-item v-if="isEdit" label="Statut" path="status">
          <n-select v-model:value="formData.status" :options="statusOptions" />
        </n-form-item>
      </n-form>
      
      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">Annuler</n-button>
          <n-button type="primary" :loading="saving" @click="handleSave">
            {{ isEdit ? 'Modifier' : 'Créer' }}
          </n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- Enrollments Modal -->
    <n-modal
      v-model:show="showEnrollmentsModal"
      preset="card"
      :title="'Inscriptions - ' + selectedSession?.title"
      style="width: 800px"
    >
      <n-data-table
        :columns="enrollmentColumns"
        :data="enrollments"
        :loading="loadingEnrollments"
        :row-key="row => row.id"
        size="small"
      />
    </n-modal>
  </CommonPage>
</template>

<script setup>
import { h, ref, reactive, computed, onMounted } from 'vue'
import { NButton, NTag, NSpace, NPopconfirm, useMessage } from 'naive-ui'
import { request } from '@/utils'

const message = useMessage()

const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const showEnrollmentsModal = ref(false)
const loadingEnrollments = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const selectedSession = ref(null)

// Data
const sessions = ref([])
const enrollments = ref([])
const programOptions = ref([])

// Filters
const filters = reactive({
  search: '',
  program_id: null,
  status: null,
  upcoming: false,
})

// Form data
const defaultFormData = {
  id: null,
  program_id: null,
  title: '',
  description: '',
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  location_type: 'in_person',
  location: '',
  online_link: '',
  max_participants: 15,
  min_participants: 1,
  instructor_name: '',
  status: 'scheduled',
}

const formData = reactive({ ...defaultFormData })

// Rules
const rules = {
  program_id: { required: true, type: 'number', message: 'Le programme est requis', trigger: 'change' },
  title: { required: true, message: 'Le titre est requis', trigger: 'blur' },
  start_date: { required: true, message: 'La date de début est requise', trigger: 'change' },
}

// Options
const statusOptions = [
  { label: 'Planifiée', value: 'scheduled' },
  { label: 'En cours', value: 'in_progress' },
  { label: 'Terminée', value: 'completed' },
  { label: 'Annulée', value: 'cancelled' },
]

// Columns
const columns = [
  {
    title: 'Session',
    key: 'title',
    width: 250,
    render(row) {
      return h('div', [
        h('div', { style: 'font-weight: 500' }, row.title),
        h('div', { style: 'font-size: 12px; color: #666' }, row.program_name),
      ])
    },
  },
  {
    title: 'Date',
    key: 'start_date',
    width: 120,
    render(row) {
      return formatDate(row.start_date)
    },
  },
  {
    title: 'Horaire',
    key: 'time',
    width: 100,
    render(row) {
      if (!row.start_time) return '-'
      return `${row.start_time?.substring(0, 5)} - ${row.end_time?.substring(0, 5)}`
    },
  },
  {
    title: 'Lieu',
    key: 'location_type',
    width: 100,
    render(row) {
      const types = {
        in_person: { label: 'Présentiel', type: 'info' },
        online: { label: 'En ligne', type: 'success' },
        hybrid: { label: 'Hybride', type: 'warning' },
      }
      const t = types[row.location_type] || types.in_person
      return h(NTag, { type: t.type, size: 'small' }, { default: () => t.label })
    },
  },
  {
    title: 'Places',
    key: 'spots',
    width: 100,
    render(row) {
      const color = row.available_spots === 0 ? 'error' : row.available_spots <= 3 ? 'warning' : 'success'
      return h(NTag, { type: color, size: 'small' }, { default: () => `${row.enrolled_count}/${row.max_participants}` })
    },
  },
  {
    title: 'Statut',
    key: 'status',
    width: 100,
    render(row) {
      const statuses = {
        scheduled: { label: 'Planifiée', type: 'info' },
        in_progress: { label: 'En cours', type: 'warning' },
        completed: { label: 'Terminée', type: 'success' },
        cancelled: { label: 'Annulée', type: 'error' },
      }
      const s = statuses[row.status] || statuses.scheduled
      return h(NTag, { type: s.type, size: 'small' }, { default: () => s.label })
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 180,
    render(row) {
      return h(NSpace, { size: 'small' }, {
        default: () => [
          h(NButton, { size: 'small', quaternary: true, onClick: () => handleViewEnrollments(row) }, { default: () => 'Inscrits' }),
          h(NButton, { size: 'small', quaternary: true, onClick: () => handleEdit(row) }, { default: () => 'Éditer' }),
          h(NPopconfirm, { onPositiveClick: () => handleDelete(row) }, {
            trigger: () => h(NButton, { size: 'small', quaternary: true, type: 'error' }, { default: () => 'Suppr.' }),
            default: () => 'Supprimer cette session?',
          }),
        ],
      })
    },
  },
]

const enrollmentColumns = [
  { title: 'Étudiant', key: 'student_name' },
  { title: 'Email', key: 'student_email' },
  {
    title: 'Statut',
    key: 'status',
    render(row) {
      const s = { enrolled: 'info', completed: 'success', cancelled: 'error', no_show: 'warning' }
      return h(NTag, { type: s[row.status] || 'default', size: 'small' }, { default: () => row.status })
    },
  },
  {
    title: 'Paiement',
    key: 'payment_status',
    render(row) {
      const p = { pending: 'warning', paid: 'success', refunded: 'error' }
      return h(NTag, { type: p[row.payment_status] || 'default', size: 'small' }, { default: () => row.payment_status })
    },
  },
]

// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  prefix: ({ itemCount }) => `Total: ${itemCount}`,
})

const modalTitle = computed(() => isEdit.value ? 'Modifier la session' : 'Nouvelle session')

// Methods
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: 'numeric' })
}

async function loadPrograms() {
  try {
    const res = await request.get('/program/all')
    if (res.code === 200) {
      programOptions.value = res.data.map(p => ({
        label: p.name,
        value: p.id,
      }))
    }
  } catch (error) {
    console.error('Error loading programs:', error)
  }
}

async function loadData() {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
    }
    
    if (filters.search) params.search = filters.search
    if (filters.program_id) params.program_id = filters.program_id
    if (filters.status) params.status = filters.status
    if (filters.upcoming) params.upcoming = true

    const res = await request.get('/session/list', { params })
    
    if (res.code === 200) {
      sessions.value = res.data
      pagination.itemCount = res.total
    } else {
      message.error(res.msg || 'Erreur lors du chargement')
    }
  } catch (error) {
    console.error('Error loading sessions:', error)
    message.error('Erreur de connexion au serveur')
  } finally {
    loading.value = false
  }
}

function handlePageChange(page) {
  pagination.page = page
  loadData()
}

function handlePageSizeChange(pageSize) {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadData()
}

function handleSearch() {
  pagination.page = 1
  loadData()
}

function handleFilter() {
  pagination.page = 1
  loadData()
}

function handleCreate() {
  isEdit.value = false
  Object.assign(formData, defaultFormData)
  showModal.value = true
}

function handleEdit(row) {
  isEdit.value = true
  Object.assign(formData, {
    id: row.id,
    program_id: row.program_id,
    title: row.title,
    description: row.description || '',
    start_date: row.start_date,
    end_date: row.end_date,
    start_time: row.start_time,
    end_time: row.end_time,
    location_type: row.location_type || 'in_person',
    location: row.location || '',
    online_link: row.online_link || '',
    max_participants: row.max_participants || 15,
    min_participants: row.min_participants || 1,
    instructor_name: row.instructor_name || '',
    status: row.status || 'scheduled',
  })
  showModal.value = true
}

async function handleDelete(row) {
  try {
    const res = await request.delete('/session/delete', { params: { session_id: row.id } })
    
    if (res.code === 200) {
      message.success('Session supprimée avec succès')
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Error deleting session:', error)
    message.error('Erreur de connexion au serveur')
  }
}

async function handleSave() {
  try {
    await formRef.value?.validate()
    saving.value = true
    
    const data = {
      program_id: formData.program_id,
      title: formData.title,
      description: formData.description || null,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      start_time: formData.start_time || null,
      end_time: formData.end_time || null,
      location_type: formData.location_type,
      location: formData.location || null,
      online_link: formData.online_link || null,
      max_participants: formData.max_participants,
      min_participants: formData.min_participants,
      instructor_name: formData.instructor_name || null,
    }

    let res
    if (isEdit.value) {
      data.id = formData.id
      data.status = formData.status
      res = await request.post('/session/update', data)
    } else {
      res = await request.post('/session/create', data)
    }

    if (res.code === 200) {
      message.success(isEdit.value ? 'Session modifiée avec succès' : 'Session créée avec succès')
      showModal.value = false
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la sauvegarde')
    }
  } catch (error) {
    if (error.message) {
      console.error('Validation failed:', error)
    } else {
      console.error('Error saving session:', error)
      message.error('Erreur de connexion au serveur')
    }
  } finally {
    saving.value = false
  }
}

async function handleViewEnrollments(row) {
  selectedSession.value = row
  showEnrollmentsModal.value = true
  loadingEnrollments.value = true
  
  try {
    const res = await request.get('/session/enrollments', { params: { session_id: row.id } })
    if (res.code === 200) {
      enrollments.value = res.data
    }
  } catch (error) {
    console.error('Error loading enrollments:', error)
  } finally {
    loadingEnrollments.value = false
  }
}

onMounted(() => {
  loadPrograms()
  loadData()
})
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.mr-4 {
  margin-right: 4px;
}
</style>
