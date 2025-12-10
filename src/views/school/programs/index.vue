<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleCreate">
        <TheIcon icon="mdi:plus" :size="18" class="mr-4" />
        Nouveau programme
      </n-button>
    </template>

    <!-- Loading -->
    <n-spin :show="loading">
      <!-- Programs Grid -->
      <n-grid :cols="3" :x-gap="16" :y-gap="16" responsive="screen" item-responsive>
        <n-grid-item v-for="program in programs" :key="program.id" span="3 m:1">
          <n-card hoverable>
            <template #header>
              <n-space align="center">
                <TheIcon :icon="program.icon || 'mdi:book-education'" :size="24" :color="program.color" />
                <span>{{ program.name }}</span>
              </n-space>
            </template>

            <template #header-extra>
              <n-tag :type="program.is_active ? 'success' : 'warning'" size="small">
                {{ program.is_active ? 'Actif' : 'Inactif' }}
              </n-tag>
            </template>

            <n-space vertical>
              <p class="description">{{ program.description }}</p>

              <n-divider style="margin: 12px 0" />

              <n-space vertical size="small">
                <n-text depth="3">
                  <TheIcon icon="mdi:clock-outline" :size="14" class="mr-4" />
                  Durée: {{ program.duration_hours }} heures
                </n-text>
                <n-text depth="3">
                  <TheIcon icon="mdi:cash" :size="14" class="mr-4" />
                  Prix: {{ formatPrice(program.price) }}
                </n-text>
                <n-text v-if="program.exam_type" depth="3">
                  <TheIcon icon="mdi:file-document" :size="14" class="mr-4" />
                  Examen: {{ getExamTypeLabel(program.exam_type) }}
                </n-text>
              </n-space>
            </n-space>

            <template #footer>
              <n-space justify="end">
                <n-button size="small" @click="handleEdit(program)">
                  <TheIcon icon="mdi:pencil" :size="16" class="mr-4" />
                  Modifier
                </n-button>
                <n-popconfirm @positive-click="handleDelete(program)">
                  <template #trigger>
                    <n-button size="small" type="error" quaternary>
                      <TheIcon icon="mdi:delete" :size="16" />
                    </n-button>
                  </template>
                  Supprimer ce programme?
                </n-popconfirm>
              </n-space>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!-- Empty state -->
      <n-empty v-if="!loading && programs.length === 0" description="Aucun programme" />
    </n-spin>

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
        label-width="120px"
      >
        <n-form-item label="Nom" path="name">
          <n-input v-model:value="formData.name" placeholder="Nom du programme" />
        </n-form-item>

        <n-form-item label="Code" path="code">
          <n-input v-model:value="formData.code" placeholder="ex: licence_c, rca" :disabled="isEdit" />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input
            v-model:value="formData.description"
            type="textarea"
            placeholder="Description du programme"
            :rows="3"
          />
        </n-form-item>

        <n-form-item label="Durée (heures)" path="duration_hours">
          <n-input-number
            v-model:value="formData.duration_hours"
            :min="0"
            :max="500"
            style="width: 150px"
          />
        </n-form-item>

        <n-form-item label="Prix ($)" path="price">
          <n-input-number
            v-model:value="formData.price"
            :min="0"
            :precision="2"
            style="width: 150px"
          />
        </n-form-item>

        <n-form-item label="Type d'examen" path="exam_type">
          <n-select
            v-model:value="formData.exam_type"
            placeholder="Sélectionner"
            :options="examTypeOptions"
            clearable
          />
        </n-form-item>

        <n-form-item label="Couleur" path="color">
          <n-select
            v-model:value="formData.color"
            placeholder="Couleur"
            :options="colorOptions"
          />
        </n-form-item>

        <n-form-item label="Icône" path="icon">
          <n-select
            v-model:value="formData.icon"
            placeholder="Icône"
            :options="iconOptions"
          />
        </n-form-item>

        <n-form-item label="Actif" path="is_active">
          <n-switch v-model:value="formData.is_active" />
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { request } from '@/utils'

const message = useMessage()

const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

// Programs data
const programs = ref([])

// Form data
const defaultFormData = {
  id: null,
  name: '',
  code: '',
  description: '',
  duration_hours: 30,
  price: 450,
  exam_type: null,
  is_active: true,
  color: '#0277BC',
  icon: 'mdi:lightning-bolt',
}

const formData = reactive({ ...defaultFormData })

// Validation rules
const rules = {
  name: { required: true, message: 'Le nom est requis', trigger: 'blur' },
  code: { required: true, message: 'Le code est requis', trigger: 'blur' },
  duration_hours: { required: true, type: 'number', message: 'La durée est requise', trigger: 'blur' },
  price: { required: true, type: 'number', message: 'Le prix est requis', trigger: 'blur' },
}

// Options
const examTypeOptions = [
  { label: 'Emploi-Québec', value: 'emploi_quebec' },
  { label: 'CMEQ', value: 'cmeq' },
  { label: 'RBQ', value: 'rbq' },
  { label: 'Sceau Rouge (Interprovincial)', value: 'sceau_rouge' },
]

const colorOptions = [
  { label: '🔵 Bleu', value: '#0277BC' },
  { label: '🟢 Vert', value: '#4CAF50' },
  { label: '🟠 Orange', value: '#FF9800' },
  { label: '🟣 Violet', value: '#9C27B0' },
  { label: '🔴 Rouge', value: '#F44336' },
  { label: '⚫ Gris', value: '#607D8B' },
]

const iconOptions = [
  { label: '⚡ Éclair', value: 'mdi:lightning-bolt' },
  { label: '🔧 Outils', value: 'mdi:tools' },
  { label: '🏠 Bâtiment', value: 'mdi:home-city' },
  { label: '🏢 Bureau', value: 'mdi:office-building-marker' },
  { label: '📜 Certificat', value: 'mdi:certificate' },
  { label: '🎓 École', value: 'mdi:school' },
]

const modalTitle = computed(() => isEdit.value ? 'Modifier le programme' : 'Nouveau programme')

// Methods
function formatPrice(price) {
  if (!price || price === 0) return 'Sur demande'
  return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(price)
}

function getExamTypeLabel(type) {
  const labels = {
    emploi_quebec: 'Emploi-Québec',
    cmeq: 'CMEQ',
    rbq: 'RBQ',
    sceau_rouge: 'Sceau Rouge',
  }
  return labels[type] || type
}

async function loadData() {
  loading.value = true
  try {
    const res = await request.get('/program/list', { params: { page: 1, page_size: 50 } })

    if (res.code === 200) {
      programs.value = res.data
    } else {
      message.error(res.msg || 'Erreur lors du chargement')
    }
  } catch (error) {
    console.error('Error loading programs:', error)
    message.error('Erreur de connexion au serveur')
  } finally {
    loading.value = false
  }
}

function handleCreate() {
  isEdit.value = false
  Object.assign(formData, defaultFormData)
  showModal.value = true
}

function handleEdit(program) {
  isEdit.value = true
  Object.assign(formData, {
    id: program.id,
    name: program.name,
    code: program.code,
    description: program.description || '',
    duration_hours: program.duration_hours || 30,
    price: parseFloat(program.price) || 0,
    exam_type: program.exam_type,
    is_active: Boolean(program.is_active),
    color: program.color || '#0277BC',
    icon: program.icon || 'mdi:lightning-bolt',
  })
  showModal.value = true
}

async function handleDelete(program) {
  try {
    const res = await request.delete('/program/delete', { params: { program_id: program.id } })

    if (res.code === 200) {
      message.success('Programme supprimé avec succès')
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Error deleting program:', error)
    message.error('Erreur de connexion au serveur')
  }
}

async function handleSave() {
  try {
    await formRef.value?.validate()
    saving.value = true

    const data = {
      name: formData.name,
      code: formData.code,
      description: formData.description || null,
      duration_hours: formData.duration_hours || 0,
      price: formData.price || 0,
      exam_type: formData.exam_type || null,
      is_active: formData.is_active,
      color: formData.color,
      icon: formData.icon,
    }

    let res
    if (isEdit.value) {
      data.id = formData.id
      res = await request.post('/program/update', data)
    } else {
      res = await request.post('/program/create', data)
    }

    if (res.code === 200) {
      message.success(isEdit.value ? 'Programme modifié avec succès' : 'Programme créé avec succès')
      showModal.value = false
      loadData()
    } else {
      message.error(res.msg || 'Erreur lors de la sauvegarde')
    }
  } catch (error) {
    if (error.message) {
      console.error('Validation failed:', error)
    } else {
      console.error('Error saving program:', error)
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
.description {
  color: #666;
  font-size: 13px;
  line-height: 1.5;
  min-height: 60px;
}
.mr-4 {
  margin-right: 4px;
}
</style>
