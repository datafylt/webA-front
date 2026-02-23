<template>
  <CommonPage>
    <!-- Filters -->
    <n-card size="small" class="mb-4">
      <n-space>
        <n-input
          v-model:value="filters.search"
          placeholder="Rechercher par email, sujet..."
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
          v-model:value="filters.status"
          placeholder="Statut"
          clearable
          style="width: 150px"
          :options="statusOptions"
          @update:value="handleFilter"
        />

        <n-select
          v-model:value="filters.notification_type"
          placeholder="Type"
          clearable
          style="width: 150px"
          :options="typeOptions"
          @update:value="handleFilter"
        />

        <n-button @click="handleSearch">Rechercher</n-button>
      </n-space>
    </n-card>

    <!-- Notifications Table -->
    <n-data-table
      :columns="columns"
      :data="notifications"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row) => row.id"
      striped
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />

    <!-- Detail Modal -->
    <n-modal
      v-model:show="showDetailModal"
      preset="card"
      :title="selectedNotification?.subject"
      style="width: 700px"
    >
      <n-descriptions :column="2" label-placement="left" bordered size="small">
        <n-descriptions-item label="Destinataire">{{
          selectedNotification?.recipient_name
        }}</n-descriptions-item>
        <n-descriptions-item label="Email">{{
          selectedNotification?.recipient_email
        }}</n-descriptions-item>
        <n-descriptions-item label="Type">{{
          getTypeLabel(selectedNotification?.notification_type)
        }}</n-descriptions-item>
        <n-descriptions-item label="Statut">
          <n-tag :type="getStatusType(selectedNotification?.status)" size="small">
            {{ getStatusLabel(selectedNotification?.status) }}
          </n-tag>
        </n-descriptions-item>
        <n-descriptions-item label="Créé le">{{
          formatDate(selectedNotification?.created_at)
        }}</n-descriptions-item>
        <n-descriptions-item label="Envoyé le">{{
          formatDate(selectedNotification?.sent_at) || '-'
        }}</n-descriptions-item>
      </n-descriptions>

      <n-divider>Contenu</n-divider>

      <n-card size="small" embedded>
        <div v-html="selectedNotification?.body"></div>
      </n-card>

      <n-alert v-if="selectedNotification?.error_message" type="error" title="Erreur" class="mt-4">
        {{ selectedNotification?.error_message }}
      </n-alert>
    </n-modal>
  </CommonPage>
</template>

<script setup>
import { h, ref, reactive, onMounted } from 'vue'
import { NButton, NTag, NSpace, NPopconfirm, useMessage } from 'naive-ui'
import { request } from '@/utils'

const message = useMessage()

const loading = ref(false)
const showDetailModal = ref(false)
const selectedNotification = ref(null)

// Data
const notifications = ref([])

// Filters
const filters = reactive({
  search: '',
  status: null,
  notification_type: null,
})

// Options
const statusOptions = [
  { label: 'En attente', value: 'pending' },
  { label: 'Envoyé', value: 'sent' },
  { label: 'Échec', value: 'failed' },
  { label: 'Annulé', value: 'cancelled' },
]

const typeOptions = [
  { label: 'Général', value: 'general' },
  { label: 'Rappel', value: 'reminder' },
  { label: 'Confirmation', value: 'confirmation' },
  { label: 'Facture', value: 'invoice' },
  { label: 'Bienvenue', value: 'welcome' },
  { label: 'Session', value: 'session' },
]

// Columns
const columns = [
  {
    title: 'Destinataire',
    key: 'recipient',
    render(row) {
      return h('div', [
        h('div', row.recipient_name || '-'),
        h('div', { style: 'font-size: 12px; color: #666' }, row.recipient_email),
      ])
    },
  },
  { title: 'Sujet', key: 'subject', ellipsis: { tooltip: true } },
  {
    title: 'Type',
    key: 'notification_type',
    width: 120,
    render(row) {
      return getTypeLabel(row.notification_type)
    },
  },
  {
    title: 'Statut',
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        { type: getStatusType(row.status), size: 'small' },
        { default: () => getStatusLabel(row.status) }
      )
    },
  },
  {
    title: 'Date',
    key: 'created_at',
    width: 150,
    render(row) {
      return formatDate(row.created_at)
    },
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 150,
    render(row) {
      const actions = [
        h(
          NButton,
          { size: 'small', quaternary: true, onClick: () => handleView(row) },
          { default: () => 'Voir' }
        ),
      ]

      if (row.status === 'pending') {
        actions.push(
          h(
            NButton,
            {
              size: 'small',
              quaternary: true,
              type: 'success',
              onClick: () => handleMarkSent(row),
            },
            { default: () => 'Marquer envoyé' }
          )
        )
      }

      actions.push(
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
            default: () => 'Supprimer cette notification?',
          }
        )
      )

      return h(NSpace, { size: 'small' }, { default: () => actions })
    },
  },
]

// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 20,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
})

// Helper functions
function getStatusType(status) {
  const types = { pending: 'warning', sent: 'success', failed: 'error', cancelled: 'default' }
  return types[status] || 'default'
}

function getStatusLabel(status) {
  const labels = { pending: 'En attente', sent: 'Envoyé', failed: 'Échec', cancelled: 'Annulé' }
  return labels[status] || status
}

function getTypeLabel(type) {
  const labels = {
    general: 'Général',
    reminder: 'Rappel',
    confirmation: 'Confirmation',
    invoice: 'Facture',
    welcome: 'Bienvenue',
    session: 'Session',
  }
  return labels[type] || type
}

function formatDate(dateStr) {
  if (!dateStr) return null
  const date = new Date(dateStr)
  return date.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
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
    if (filters.status) params.status = filters.status
    if (filters.notification_type) params.notification_type = filters.notification_type

    const res = await request.get('/notification/list', { params })

    if (res.code === 200) {
      notifications.value = res.data
      pagination.itemCount = res.total
    } else {
      message.error(res.msg || 'Erreur lors du chargement')
    }
  } catch (error) {
    console.error('Error loading notifications:', error)
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

function handleView(row) {
  selectedNotification.value = row
  showDetailModal.value = true
}

async function handleMarkSent(row) {
  try {
    const res = await request.post('/notification/mark-sent', null, {
      params: { notification_id: row.id },
    })
    if (res.code === 200) {
      message.success('Notification marquée comme envoyée')
      loadData()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function handleDelete(row) {
  try {
    const res = await request.delete('/notification/delete', {
      params: { notification_id: row.id },
    })
    if (res.code === 200) {
      message.success('Notification supprimée')
      loadData()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
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
</style>
