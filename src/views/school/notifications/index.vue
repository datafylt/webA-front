<template>
  <CommonPage>
    <template #action>
      <n-space>
        <n-button @click="showTemplateModal = true">
          <TheIcon icon="mdi:file-document-edit" :size="18" class="mr-4" />
          Gérer les templates
        </n-button>
      </n-space>
    </template>

    <!-- Stats Cards -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16" class="mb-4">
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Total envoyés" :value="stats.sent" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="En attente" :value="stats.pending" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Échecs" :value="stats.failed" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Total" :value="stats.total" />
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- Send Notification Form -->
    <n-card title="Envoyer une notification" class="mb-4">
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="140px"
      >
        <n-form-item label="Destinataires" path="recipients">
          <n-select
            v-model:value="formData.recipient_ids"
            placeholder="Sélectionner les étudiants..."
            filterable
            multiple
            :options="studentOptions"
            :loading="loadingStudents"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="Template" path="template_id">
          <n-select
            v-model:value="formData.template_id"
            placeholder="Utiliser un template (optionnel)"
            clearable
            :options="templateOptions"
            @update:value="handleTemplateSelect"
          />
        </n-form-item>

        <n-form-item label="Type" path="notification_type">
          <n-select
            v-model:value="formData.notification_type"
            :options="typeOptions"
            style="width: 200px"
          />
        </n-form-item>

        <n-form-item label="Sujet" path="subject">
          <n-input v-model:value="formData.subject" placeholder="Sujet de l'email" />
        </n-form-item>

        <n-form-item label="Message" path="body">
          <n-input
            v-model:value="formData.body"
            type="textarea"
            placeholder="Corps du message... Variables: {student_name}, {first_name}, {last_name}, {email}"
            :rows="8"
          />
        </n-form-item>

        <n-form-item label="Variables">
          <n-text depth="3">
            Disponibles: {student_name}, {first_name}, {last_name}, {email}
          </n-text>
        </n-form-item>

        <n-form-item>
          <n-space>
            <n-button
              type="primary"
              :loading="sending"
              :disabled="formData.recipient_ids.length === 0"
              @click="handleSend"
            >
              <TheIcon icon="mdi:send" :size="18" class="mr-4" />
              Envoyer ({{ formData.recipient_ids.length }} destinataire(s))
            </n-button>
            <n-button @click="handleReset">Réinitialiser</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </n-card>

    <!-- Template Management Modal -->
    <n-modal
      v-model:show="showTemplateModal"
      preset="card"
      title="Gestion des templates"
      style="width: 900px"
    >
      <n-space vertical size="large">
        <n-button type="primary" @click="handleCreateTemplate">
          <TheIcon icon="mdi:plus" :size="18" class="mr-4" />
          Nouveau template
        </n-button>

        <n-data-table
          :columns="templateColumns"
          :data="templates"
          :loading="loadingTemplates"
          :row-key="(row) => row.id"
          size="small"
        />
      </n-space>
    </n-modal>

    <!-- Edit Template Modal -->
    <n-modal
      v-model:show="showEditTemplateModal"
      preset="card"
      :title="isEditTemplate ? 'Modifier le template' : 'Nouveau template'"
      style="width: 700px"
      :mask-closable="false"
    >
      <n-form
        ref="templateFormRef"
        :model="templateFormData"
        :rules="templateRules"
        label-placement="left"
        label-width="120px"
      >
        <n-form-item label="Nom" path="name">
          <n-input v-model:value="templateFormData.name" placeholder="Nom du template" />
        </n-form-item>

        <n-form-item label="Type" path="notification_type">
          <n-select v-model:value="templateFormData.notification_type" :options="typeOptions" />
        </n-form-item>

        <n-form-item label="Sujet" path="subject">
          <n-input v-model:value="templateFormData.subject" placeholder="Sujet de l'email" />
        </n-form-item>

        <n-form-item label="Corps" path="body">
          <n-input
            v-model:value="templateFormData.body"
            type="textarea"
            placeholder="Corps du message (HTML supporté)"
            :rows="10"
          />
        </n-form-item>

        <n-form-item label="Variables" path="variables">
          <n-input
            v-model:value="templateFormData.variables"
            placeholder="{student_name}, {session_date}, etc."
          />
        </n-form-item>

        <n-form-item label="Actif" path="is_active">
          <n-switch v-model:value="templateFormData.is_active" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showEditTemplateModal = false">Annuler</n-button>
          <n-button type="primary" :loading="savingTemplate" @click="handleSaveTemplate">
            Enregistrer
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </CommonPage>
</template>

<script setup>
import { h, ref, reactive, onMounted } from 'vue'
import { NButton, NTag, NSpace, NPopconfirm, useMessage } from 'naive-ui'
import { request } from '@/utils'

const message = useMessage()

const formRef = ref(null)
const templateFormRef = ref(null)
const sending = ref(false)
const loadingStudents = ref(false)
const loadingTemplates = ref(false)
const savingTemplate = ref(false)
const showTemplateModal = ref(false)
const showEditTemplateModal = ref(false)
const isEditTemplate = ref(false)

// Data
const studentOptions = ref([])
const templateOptions = ref([])
const templates = ref([])
const stats = reactive({
  total: 0,
  sent: 0,
  pending: 0,
  failed: 0,
})

// Form data
const formData = reactive({
  recipient_ids: [],
  template_id: null,
  notification_type: 'general',
  subject: '',
  body: '',
})

const defaultTemplateFormData = {
  id: null,
  name: '',
  notification_type: 'general',
  subject: '',
  body: '',
  variables: '{student_name}, {first_name}, {last_name}, {email}',
  is_active: true,
}

const templateFormData = reactive({ ...defaultTemplateFormData })

// Rules
const rules = {
  subject: { required: true, message: 'Le sujet est requis', trigger: 'blur' },
  body: { required: true, message: 'Le message est requis', trigger: 'blur' },
}

const templateRules = {
  name: { required: true, message: 'Le nom est requis', trigger: 'blur' },
  subject: { required: true, message: 'Le sujet est requis', trigger: 'blur' },
  body: { required: true, message: 'Le corps est requis', trigger: 'blur' },
}

// Options
const typeOptions = [
  { label: 'Général', value: 'general' },
  { label: 'Rappel', value: 'reminder' },
  { label: 'Confirmation', value: 'confirmation' },
  { label: 'Facture', value: 'invoice' },
  { label: 'Bienvenue', value: 'welcome' },
  { label: 'Session', value: 'session' },
]

// Template columns
const templateColumns = [
  { title: 'Nom', key: 'name' },
  {
    title: 'Type',
    key: 'notification_type',
    render(row) {
      const opt = typeOptions.find((o) => o.value === row.notification_type)
      return opt?.label || row.notification_type
    },
  },
  { title: 'Sujet', key: 'subject' },
  {
    title: 'Actif',
    key: 'is_active',
    width: 80,
    render(row) {
      return h(
        NTag,
        { type: row.is_active ? 'success' : 'default', size: 'small' },
        { default: () => (row.is_active ? 'Oui' : 'Non') }
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
              { size: 'small', quaternary: true, onClick: () => handleEditTemplate(row) },
              { default: () => 'Éditer' }
            ),
            h(
              NPopconfirm,
              { onPositiveClick: () => handleDeleteTemplate(row) },
              {
                trigger: () =>
                  h(
                    NButton,
                    { size: 'small', quaternary: true, type: 'error' },
                    { default: () => 'Suppr.' }
                  ),
                default: () => 'Supprimer ce template?',
              }
            ),
          ],
        }
      )
    },
  },
]

// Methods
async function loadStats() {
  try {
    const res = await request.get('/notification/stats')
    if (res.code === 200) {
      Object.assign(stats, res.data)
    }
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

async function loadStudents() {
  loadingStudents.value = true
  try {
    const res = await request.get('/student/list', {
      params: { page: 1, page_size: 200, status: 'active' },
    })
    if (res.code === 200) {
      studentOptions.value = res.data.map((s) => ({
        label: `${s.first_name} ${s.last_name} (${s.email})`,
        value: s.id,
      }))
    }
  } catch (error) {
    console.error('Error loading students:', error)
  } finally {
    loadingStudents.value = false
  }
}

async function loadTemplates() {
  loadingTemplates.value = true
  try {
    const res = await request.get('/notification/templates', { params: { page: 1, page_size: 50 } })
    if (res.code === 200) {
      templates.value = res.data
      templateOptions.value = res.data
        .filter((t) => t.is_active)
        .map((t) => ({
          label: t.name,
          value: t.id,
          subject: t.subject,
          body: t.body,
          type: t.notification_type,
        }))
    }
  } catch (error) {
    console.error('Error loading templates:', error)
  } finally {
    loadingTemplates.value = false
  }
}

function handleTemplateSelect(templateId) {
  if (templateId) {
    const template = templateOptions.value.find((t) => t.value === templateId)
    if (template) {
      formData.subject = template.subject
      formData.body = template.body
      formData.notification_type = template.type
    }
  }
}

function handleReset() {
  formData.recipient_ids = []
  formData.template_id = null
  formData.notification_type = 'general'
  formData.subject = ''
  formData.body = ''
}

async function handleSend() {
  try {
    await formRef.value?.validate()
    sending.value = true

    const res = await request.post('/notification/send-bulk', {
      recipient_ids: formData.recipient_ids,
      subject: formData.subject,
      body: formData.body,
      notification_type: formData.notification_type,
      template_id: formData.template_id,
    })

    if (res.code === 200) {
      message.success(res.msg || 'Notifications envoyées!')
      handleReset()
      loadStats()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    sending.value = false
  }
}

function handleCreateTemplate() {
  isEditTemplate.value = false
  Object.assign(templateFormData, defaultTemplateFormData)
  showEditTemplateModal.value = true
}

function handleEditTemplate(row) {
  isEditTemplate.value = true
  Object.assign(templateFormData, {
    id: row.id,
    name: row.name,
    notification_type: row.notification_type,
    subject: row.subject,
    body: row.body,
    variables: row.variables || '',
    is_active: row.is_active,
  })
  showEditTemplateModal.value = true
}

async function handleSaveTemplate() {
  try {
    await templateFormRef.value?.validate()
    savingTemplate.value = true

    const data = {
      name: templateFormData.name,
      notification_type: templateFormData.notification_type,
      subject: templateFormData.subject,
      body: templateFormData.body,
      variables: templateFormData.variables || null,
      is_active: templateFormData.is_active,
    }

    let res
    if (isEditTemplate.value) {
      data.id = templateFormData.id
      res = await request.post('/notification/template/update', data)
    } else {
      res = await request.post('/notification/template/create', data)
    }

    if (res.code === 200) {
      message.success('Template enregistré!')
      showEditTemplateModal.value = false
      loadTemplates()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    savingTemplate.value = false
  }
}

async function handleDeleteTemplate(row) {
  try {
    const res = await request.delete('/notification/template/delete', {
      params: { template_id: row.id },
    })
    if (res.code === 200) {
      message.success('Template supprimé')
      loadTemplates()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(() => {
  loadStats()
  loadStudents()
  loadTemplates()
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
