<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleCreate">
        <TheIcon icon="mdi:account-plus" :size="18" class="mr-4" />
        Nouveau formateur
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
          v-model:value="filters.specialization"
          placeholder="Spécialisation"
          clearable
          style="width: 200px"
          :options="specializationOptions"
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

    <!-- Instructors Grid -->
    <n-spin :show="loading">
      <n-grid :cols="3" :x-gap="16" :y-gap="16">
        <n-grid-item v-for="instructor in instructors" :key="instructor.id">
          <n-card hoverable>
            <template #header>
              <n-space align="center">
                <n-avatar :size="48" round :style="{ backgroundColor: getAvatarColor(instructor.specialization) }">
                  {{ getInitials(instructor) }}
                </n-avatar>
                <div>
                  <div style="font-weight: 600">{{ instructor.full_name }}</div>
                  <n-text depth="3" style="font-size: 12px">{{ instructor.email }}</n-text>
                </div>
              </n-space>
            </template>
            
            <template #header-extra>
              <n-tag :type="getStatusType(instructor.status)" size="small">
                {{ getStatusLabel(instructor.status) }}
              </n-tag>
            </template>

            <n-space vertical size="small">
              <n-space v-if="instructor.specialization">
                <TheIcon icon="mdi:certificate" :size="16" />
                <n-text>{{ getSpecializationLabel(instructor.specialization) }}</n-text>
              </n-space>
              
              <n-space v-if="instructor.phone">
                <TheIcon icon="mdi:phone" :size="16" />
                <n-text>{{ instructor.phone }}</n-text>
              </n-space>
              
              <n-space v-if="instructor.years_experience">
                <TheIcon icon="mdi:briefcase" :size="16" />
                <n-text>{{ instructor.years_experience }} ans d'expérience</n-text>
              </n-space>
              
              <n-space v-if="instructor.hourly_rate">
                <TheIcon icon="mdi:currency-usd" :size="16" />
                <n-text>{{ formatMoney(instructor.hourly_rate) }}/h</n-text>
              </n-space>

              <n-space>
                <TheIcon icon="mdi:check-circle" :size="16" />
                <n-text :type="instructor.is_available ? 'success' : 'warning'">
                  {{ instructor.is_available ? 'Disponible' : 'Non disponible' }}
                </n-text>
              </n-space>
            </n-space>

            <template #footer>
              <n-space justify="end">
                <n-button size="small" quaternary @click="handleEdit(instructor)">
                  <TheIcon icon="mdi:pencil" :size="16" class="mr-4" />
                  Modifier
                </n-button>
                <n-popconfirm @positive-click="handleDelete(instructor)">
                  <template #trigger>
                    <n-button size="small" quaternary type="error">
                      <TheIcon icon="mdi:delete" :size="16" class="mr-4" />
                      Supprimer
                    </n-button>
                  </template>
                  Supprimer ce formateur?
                </n-popconfirm>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-spin>

    <!-- Empty state -->
    <n-empty v-if="!loading && instructors.length === 0" description="Aucun formateur trouvé" />

    <!-- Pagination -->
    <n-space justify="end" class="mt-4" v-if="pagination.itemCount > pagination.pageSize">
      <n-pagination
        v-model:page="pagination.page"
        :page-count="Math.ceil(pagination.itemCount / pagination.pageSize)"
        @update:page="handlePageChange"
      />
    </n-space>

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
        label-width="140px"
      >
        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Prénom" path="first_name">
              <n-input v-model:value="formData.first_name" placeholder="Prénom" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Nom" path="last_name">
              <n-input v-model:value="formData.last_name" placeholder="Nom de famille" />
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Email" path="email">
              <n-input v-model:value="formData.email" placeholder="email@example.com" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Téléphone" path="phone">
              <n-input v-model:value="formData.phone" placeholder="514-555-1234" />
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-form-item label="Spécialisation" path="specialization">
          <n-select
            v-model:value="formData.specialization"
            placeholder="Domaine d'expertise"
            :options="specializationOptions"
            clearable
          />
        </n-form-item>

        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Expérience" path="years_experience">
              <n-input-number
                v-model:value="formData.years_experience"
                :min="0"
                :max="50"
                style="width: 100%"
              >
                <template #suffix>ans</template>
              </n-input-number>
            </n-form-item>
          </n-grid-item>
          <n-grid-item>
            <n-form-item label="Taux horaire" path="hourly_rate">
              <n-input-number
                v-model:value="formData.hourly_rate"
                :min="0"
                :precision="2"
                style="width: 100%"
              >
                <template #suffix>$/h</template>
              </n-input-number>
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-form-item label="Certifications" path="certifications">
          <n-input
            v-model:value="formData.certifications"
            placeholder="Licence C, Sceau Rouge, etc."
          />
        </n-form-item>

        <n-form-item label="Biographie" path="bio">
          <n-input
            v-model:value="formData.bio"
            type="textarea"
            placeholder="Parcours et expertise..."
            :rows="3"
          />
        </n-form-item>

        <n-grid :cols="2" :x-gap="16">
          <n-grid-item>
            <n-form-item label="Disponible" path="is_available">
              <n-switch v-model:value="formData.is_available" />
            </n-form-item>
          </n-grid-item>
          <n-grid-item v-if="isEdit">
            <n-form-item label="Statut" path="status">
              <n-select v-model:value="formData.status" :options="statusOptions" />
            </n-form-item>
          </n-grid-item>
        </n-grid>

        <n-form-item label="Notes internes" path="notes">
          <n-input
            v-model:value="formData.notes"
            type="textarea"
            placeholder="Notes privées..."
            :rows="2"
          />
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
  </CommonPage>
</template>

<script setup>
import { h, ref, reactive, computed, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { request } from '@/utils'

const message = useMessage()

const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

// Data
const instructors = ref([])

// Filters
const filters = reactive({
  search: '',
  specialization: null,
  status: null,
})

// Form data
const defaultFormData = {
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  specialization: null,
  bio: '',
  certifications: '',
  years_experience: 0,
  hourly_rate: null,
  is_available: true,
  status: 'active',
  notes: '',
}

const formData = reactive({ ...defaultFormData })

// Rules
const rules = {
  first_name: { required: true, message: 'Le prénom est requis', trigger: 'blur' },
  last_name: { required: true, message: 'Le nom est requis', trigger: 'blur' },
  email: [
    { required: true, message: 'L\'email est requis', trigger: 'blur' },
    { type: 'email', message: 'Email invalide', trigger: 'blur' },
  ],
}

// Options
const specializationOptions = [
  { label: 'Licence C - Compagnon', value: 'licence_c' },
  { label: 'RCA - Connexions Restreintes', value: 'rca' },
  { label: 'RBQ - Constructeur Propriétaire', value: 'rbq' },
  { label: 'CMEQ - Entrepreneur', value: 'cmeq' },
  { label: 'Sceau Rouge', value: 'sceau_rouge' },
  { label: 'Code de construction', value: 'code' },
  { label: 'Sécurité électrique', value: 'securite' },
  { label: 'Formation générale', value: 'general' },
]

const statusOptions = [
  { label: 'Actif', value: 'active' },
  { label: 'Inactif', value: 'inactive' },
  { label: 'En congé', value: 'on_leave' },
]

// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 9,
  itemCount: 0,
})

const modalTitle = computed(() => isEdit.value ? 'Modifier le formateur' : 'Nouveau formateur')

// Helper functions
function formatMoney(value) {
  if (value == null) return '0 $'
  return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(value)
}

function getInitials(instructor) {
  return `${instructor.first_name?.charAt(0) || ''}${instructor.last_name?.charAt(0) || ''}`.toUpperCase()
}

function getAvatarColor(specialization) {
  const colors = {
    licence_c: '#18a058',
    rca: '#2080f0',
    rbq: '#f0a020',
    cmeq: '#d03050',
    sceau_rouge: '#722ed1',
    code: '#13c2c2',
    securite: '#fa8c16',
    general: '#666',
  }
  return colors[specialization] || '#666'
}

function getStatusType(status) {
  const types = { active: 'success', inactive: 'error', on_leave: 'warning' }
  return types[status] || 'default'
}

function getStatusLabel(status) {
  const labels = { active: 'Actif', inactive: 'Inactif', on_leave: 'En congé' }
  return labels[status] || status
}

function getSpecializationLabel(spec) {
  const option = specializationOptions.find(o => o.value === spec)
  return option?.label || spec
}

// Methods
async function loadData() {
  loading.value = true
  try {
    const params = {
      page: pagination.page,
      page_size: pagination.pageSize,
    }

    if (filters.search) params.search = filters.search
    if (filters.specialization) params.specialization = filters.specialization
    if (filters.status) params.status = filters.status

    const res = await request.get('/instructor/list', { params })

    if (res.code === 200) {
      instructors.value = res.data
      pagination.itemCount = res.total
    } else {
      message.error(res.msg || 'Erreur lors du chargement')
    }
  } catch (error) {
    console.error('Error loading instructors:', error)
    message.error('Erreur de connexion au serveur')
  } finally {
    loading.value = false
  }
}

function handlePageChange(page) {
  pagination.page = page
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
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    phone: row.phone || '',
    specialization: row.specialization,
    bio: row.bio || '',
    certifications: row.certifications || '',
    years_experience: row.years_experience || 0,
    hourly_rate: row.hourly_rate,
    is_available: row.is_available,
    status: row.status,
    notes: row.notes || '',
  })
  showModal.value = true
}

async function handleDelete(row) {
  try {
    const res = await request.delete('/instructor/delete', { params: { instructor_id: row.id } })

    if (res.code === 200) {
      message.success('Formateur supprimé avec succès')
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Error deleting instructor:', error)
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
      specialization: formData.specialization || null,
      bio: formData.bio || null,
      certifications: formData.certifications || null,
      years_experience: formData.years_experience || 0,
      hourly_rate: formData.hourly_rate || null,
      is_available: formData.is_available,
      notes: formData.notes || null,
    }

    let res
    if (isEdit.value) {
      data.id = formData.id
      data.status = formData.status
      res = await request.post('/instructor/update', data)
    } else {
      res = await request.post('/instructor/create', data)
    }

    if (res.code === 200) {
      message.success(isEdit.value ? 'Formateur modifié avec succès' : 'Formateur créé avec succès')
      showModal.value = false
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la sauvegarde')
    }
  } catch (error) {
    if (error.message) {
      console.error('Validation failed:', error)
    } else {
      console.error('Error saving instructor:', error)
      message.error('Erreur de connexion au serveur')
    }
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}
.mt-4 {
  margin-top: 16px;
}
.mr-4 {
  margin-right: 4px;
}
</style>
