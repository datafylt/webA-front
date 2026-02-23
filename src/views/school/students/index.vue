<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleCreate">
        <TheIcon icon="mdi:account-plus" :size="18" class="mr-4" />
        Nouvel étudiant
      </n-button>
    </template>

    <!-- Filters -->
    <n-card size="small" class="mb-4">
      <n-space>
        <n-input
          v-model:value="filters.search"
          placeholder="Rechercher par nom, email..."
          clearable
          style="width: 250px"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        >
          <template #prefix>
            <TheIcon icon="mdi:magnify" :size="16" />
          </template>
        </n-input>

        <n-select
          v-model:value="filters.goal"
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

        <n-button @click="handleSearch">
          <TheIcon icon="mdi:magnify" :size="18" class="mr-4" />
          Rechercher
        </n-button>
      </n-space>
    </n-card>

    <!-- Students Table -->
    <n-data-table
      :columns="columns"
      :data="students"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row) => row.id"
      striped
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />

    <!-- Create/Edit Modal -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      :title="modalTitle"
      style="width: 600px"
      :mask-closable="false"
    >
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="140px"
      >
        <n-form-item label="Prénom" path="first_name">
          <n-input v-model:value="formData.first_name" placeholder="Prénom" />
        </n-form-item>

        <n-form-item label="Nom" path="last_name">
          <n-input v-model:value="formData.last_name" placeholder="Nom de famille" />
        </n-form-item>

        <n-form-item label="Email" path="email">
          <n-input v-model:value="formData.email" placeholder="email@example.com" />
        </n-form-item>

        <n-form-item label="Téléphone" path="phone">
          <n-input v-model:value="formData.phone" placeholder="514-555-1234" />
        </n-form-item>

        <n-form-item label="Adresse" path="address">
          <n-input v-model:value="formData.address" placeholder="123 rue Example" />
        </n-form-item>

        <n-space>
          <n-form-item label="Ville" path="city">
            <n-input v-model:value="formData.city" placeholder="Montréal" style="width: 150px" />
          </n-form-item>

          <n-form-item label="Code postal" path="postal_code">
            <n-input
              v-model:value="formData.postal_code"
              placeholder="H1H 1H1"
              style="width: 120px"
            />
          </n-form-item>
        </n-space>

        <n-divider>Informations professionnelles</n-divider>

        <n-form-item label="Employeur" path="employer">
          <n-input v-model:value="formData.employer" placeholder="Nom de l'entreprise" />
        </n-form-item>

        <n-form-item label="No. Carte CCQ" path="ccq_number">
          <n-input
            v-model:value="formData.ccq_number"
            placeholder="Numéro de carte de compétence"
          />
        </n-form-item>

        <n-form-item label="Heures apprenti" path="apprentice_hours">
          <n-input-number
            v-model:value="formData.apprentice_hours"
            placeholder="0"
            :min="0"
            :max="10000"
            style="width: 150px"
          />
        </n-form-item>

        <n-form-item label="Objectif" path="goal">
          <n-select
            v-model:value="formData.goal"
            placeholder="Programme visé"
            :options="programOptions"
            clearable
          />
        </n-form-item>

        <n-form-item v-if="isEdit" label="Statut" path="status">
          <n-select v-model:value="formData.status" placeholder="Statut" :options="statusOptions" />
        </n-form-item>

        <n-form-item label="Notes" path="notes">
          <n-input
            v-model:value="formData.notes"
            type="textarea"
            placeholder="Notes internes..."
            :rows="3"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="handleCloseModal">Annuler</n-button>
          <n-button type="primary" :loading="saving" @click="handleSave">
            {{ isEdit ? 'Modifier' : 'Créer' }}
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </CommonPage>
</template>

<script setup>
import { h, ref, reactive, computed, onMounted } from 'vue'
import { NButton, NTag, NSpace, NPopconfirm, useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { request } from '@/utils'

const message = useMessage()
const route = useRoute()
const router = useRouter()

// Track if we came from a session
const returnToSessionId = ref(null)

const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

// Filters
const filters = reactive({
  search: '',
  goal: null,
  status: null,
})

// Form data
const defaultFormData = {
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postal_code: '',
  employer: '',
  ccq_number: '',
  apprentice_hours: 0,
  goal: null,
  status: 'active',
  notes: '',
}

const formData = reactive({ ...defaultFormData })

// Validation rules
const rules = {
  first_name: { required: true, message: 'Le prénom est requis', trigger: 'blur' },
  last_name: { required: true, message: 'Le nom est requis', trigger: 'blur' },
  email: [
    { required: true, message: "L'email est requis", trigger: 'blur' },
    { type: 'email', message: 'Email invalide', trigger: 'blur' },
  ],
}

// Options
const programOptions = [
  { label: 'Licence C - Compagnon Électricien', value: 'licence_c' },
  { label: 'RCA - Connexions Restreintes', value: 'rca' },
  { label: 'RBQ - Constructeur Propriétaire', value: 'rbq' },
  { label: 'CMEQ - Entrepreneur Électricien', value: 'cmeq' },
  { label: 'Sceau Rouge - Interprovincial', value: 'sceau_rouge' },
  { label: 'Formation sur mesure', value: 'custom' },
]

const statusOptions = [
  { label: 'Actif', value: 'active' },
  { label: 'Inactif', value: 'inactive' },
  { label: 'Expiré', value: 'expired' },
]

// Table columns
const columns = [
  {
    title: 'Nom',
    key: 'name',
    render(row) {
      return `${row.first_name} ${row.last_name}`
    },
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Téléphone',
    key: 'phone',
  },
  {
    title: 'Programme',
    key: 'goal',
    render(row) {
      if (!row.goal) return '-'
      const colors = {
        licence_c: 'info',
        rca: 'success',
        rbq: 'warning',
        cmeq: 'error',
        sceau_rouge: 'default',
        custom: 'default',
      }
      const labels = {
        licence_c: 'Licence C',
        rca: 'RCA',
        rbq: 'RBQ',
        cmeq: 'CMEQ',
        sceau_rouge: 'Sceau Rouge',
        custom: 'Sur mesure',
      }
      return h(
        NTag,
        { type: colors[row.goal] || 'default', size: 'small' },
        { default: () => labels[row.goal] || row.goal }
      )
    },
  },
  {
    title: 'Statut',
    key: 'status',
    render(row) {
      const colors = {
        active: 'success',
        inactive: 'warning',
        expired: 'error',
      }
      const labels = {
        active: 'Actif',
        inactive: 'Inactif',
        expired: 'Expiré',
      }
      return h(
        NTag,
        { type: colors[row.status], size: 'small' },
        { default: () => labels[row.status] || row.status }
      )
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 150,
    render(row) {
      return h(
        NSpace,
        { size: 'small' },
        {
          default: () => [
            h(
              NButton,
              { size: 'small', quaternary: true, onClick: () => handleEdit(row) },
              { default: () => 'Éditer' }
            ),
            h(
              NPopconfirm,
              { onPositiveClick: () => handleDelete(row) },
              {
                trigger: () =>
                  h(
                    NButton,
                    { size: 'small', quaternary: true, type: 'error' },
                    { default: () => 'Suppr.' }
                  ),
                default: () => 'Supprimer cet étudiant?',
              }
            ),
          ],
        }
      )
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

// Students data
const students = ref([])

const modalTitle = computed(() => (isEdit.value ? "Modifier l'étudiant" : 'Nouvel étudiant'))

// Methods
async function loadData() {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
    }

    if (filters.search) params.search = filters.search
    if (filters.goal) params.goal = filters.goal
    if (filters.status) params.status = filters.status

    const res = await request.get('/student/list', { params })

    if (res.code === 200) {
      students.value = res.data
      pagination.itemCount = res.total
    } else {
      message.error(res.msg || 'Erreur lors du chargement')
    }
  } catch (error) {
    console.error('Error loading students:', error)
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
  returnToSessionId.value = null // Clear return when creating new
  Object.assign(formData, defaultFormData)
  showModal.value = true
}

function handleCloseModal() {
  showModal.value = false
  // Return to session if we came from there
  if (returnToSessionId.value) {
    router.push(`/school/sessions?open_enrollments=${returnToSessionId.value}`)
    returnToSessionId.value = null
  }
}

function handleEdit(row) {
  isEdit.value = true
  Object.assign(formData, {
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    phone: row.phone || '',
    address: row.address || '',
    city: row.city || '',
    postal_code: row.postal_code || '',
    employer: row.employer || '',
    ccq_number: row.ccq_number || '',
    apprentice_hours: row.apprentice_hours || 0,
    goal: row.goal,
    status: row.status,
    notes: row.notes || '',
  })
  showModal.value = true
}

async function handleDelete(row) {
  try {
    const res = await request.delete('/student/delete', { params: { student_id: row.id } })

    if (res.code === 200) {
      message.success('Étudiant supprimé avec succès')
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Error deleting student:', error)
    message.error('Erreur de connexion au serveur')
  }
}

async function handleSave() {
  try {
    await formRef.value?.validate()
    saving.value = true

    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone || null,
      address: formData.address || null,
      city: formData.city || null,
      postal_code: formData.postal_code || null,
      employer: formData.employer || null,
      ccq_number: formData.ccq_number || null,
      apprentice_hours: formData.apprentice_hours || 0,
      goal: formData.goal || null,
      notes: formData.notes || null,
    }

    let res
    if (isEdit.value) {
      data.id = formData.id
      data.status = formData.status
      res = await request.post('/student/update', data)
    } else {
      res = await request.post('/student/create', data)
    }

    if (res.code === 200) {
      message.success(isEdit.value ? 'Étudiant modifié avec succès' : 'Étudiant créé avec succès')
      showModal.value = false
      loadData()
      // Return to session if we came from there
      if (returnToSessionId.value) {
        router.push(`/school/sessions?open_enrollments=${returnToSessionId.value}`)
        returnToSessionId.value = null
      }
    } else {
      message.error(res.msg || 'Erreur lors de la sauvegarde')
    }
  } catch (error) {
    if (error.message) {
      console.error('Validation failed:', error)
    } else {
      console.error('Error saving student:', error)
      message.error('Erreur de connexion au serveur')
    }
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadData()

  // Check if we need to open a student from URL
  if (route.query.id) {
    openStudentById(parseInt(route.query.id))
    // Track if we came from a session
    if (route.query.from_session) {
      returnToSessionId.value = parseInt(route.query.from_session)
    }
  }
})

async function openStudentById(studentId) {
  try {
    const res = await request.get('/student/get', { params: { student_id: studentId } })
    if (res.code === 200) {
      handleEdit(res.data)
      // Clear the URL param to avoid reopening on next visit
      window.history.replaceState({}, '', '/school/students')
    }
  } catch (error) {
    console.error('Error loading student:', error)
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.mr-4 {
  margin-right: 4px;
}
</style>
