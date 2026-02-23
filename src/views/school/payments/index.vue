<template>
  <CommonPage>
    <template #action>
      <n-button type="primary" @click="handleCreate">
        <TheIcon icon="mdi:plus" :size="18" class="mr-4" />
        Nouvelle facture
      </n-button>
    </template>

    <!-- Stats Cards -->
    <n-grid :cols="4" :x-gap="16" :y-gap="16" class="mb-4">
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Total facturé" :value="formatMoney(stats.total_billed)" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Total perçu" :value="formatMoney(stats.total_collected)" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Solde à percevoir" :value="formatMoney(stats.balance_due)" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small">
          <n-statistic label="Factures en attente" :value="stats.pending" />
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- Filters -->
    <n-card size="small" class="mb-4">
      <n-space>
        <n-input
          v-model:value="filters.search"
          placeholder="Numéro de facture..."
          clearable
          style="width: 200px"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        />

        <n-select
          v-model:value="filters.status"
          placeholder="Statut"
          clearable
          style="width: 150px"
          :options="statusOptions"
          @update:value="handleFilter"
        />

        <n-button @click="handleSearch">Rechercher</n-button>
      </n-space>
    </n-card>

    <!-- Invoices Table -->
    <n-data-table
      :columns="columns"
      :data="invoices"
      :loading="loading"
      :pagination="pagination"
      :row-key="(row) => row.id"
      striped
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />

    <!-- Create Modal -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      :title="isEdit ? 'Modifier la facture' : 'Nouvelle facture'"
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
        <n-form-item label="Étudiant" path="student_id">
          <n-select
            v-model:value="formData.student_id"
            placeholder="Sélectionner un étudiant"
            filterable
            :options="studentOptions"
            :loading="loadingStudents"
            :disabled="isEdit"
          />
        </n-form-item>

        <n-form-item label="Session" path="session_id">
          <n-select
            v-model:value="formData.session_id"
            placeholder="Associer à une session (optionnel)"
            clearable
            :options="sessionOptions"
            :disabled="isEdit"
          />
        </n-form-item>

        <n-form-item label="Montant HT" path="subtotal">
          <n-input-number
            v-model:value="formData.subtotal"
            :min="0"
            :precision="2"
            style="width: 150px"
            @update:value="calculateTaxes"
          />
          <n-text style="margin-left: 8px">$</n-text>
        </n-form-item>

        <!-- Tax display -->
        <n-form-item label="TPS (5%)">
          <n-text>{{ formatMoney(taxes.tps) }}</n-text>
        </n-form-item>
        <n-form-item label="TVQ (9.975%)">
          <n-text>{{ formatMoney(taxes.tvq) }}</n-text>
        </n-form-item>
        <n-form-item label="Total">
          <n-text strong>{{ formatMoney(taxes.total) }}</n-text>
        </n-form-item>

        <n-form-item label="Échéance" path="due_date">
          <n-date-picker
            v-model:formatted-value="formData.due_date"
            type="date"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input
            v-model:value="formData.description"
            type="textarea"
            placeholder="Description de la facture"
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

    <!-- Payment Modal -->
    <n-modal
      v-model:show="showPaymentModal"
      preset="card"
      :title="'Paiement - ' + selectedInvoice?.invoice_number"
      style="width: 500px"
      :mask-closable="false"
    >
      <n-descriptions :column="1" label-placement="left" size="small" class="mb-4">
        <n-descriptions-item label="Étudiant">{{
          selectedInvoice?.student_name
        }}</n-descriptions-item>
        <n-descriptions-item label="Total">{{
          formatMoney(selectedInvoice?.total)
        }}</n-descriptions-item>
        <n-descriptions-item label="Payé">{{
          formatMoney(selectedInvoice?.amount_paid)
        }}</n-descriptions-item>
        <n-descriptions-item label="Solde dû">
          <n-text type="error" strong>{{ formatMoney(selectedInvoice?.balance_due) }}</n-text>
        </n-descriptions-item>
      </n-descriptions>

      <n-divider />

      <n-form
        ref="paymentFormRef"
        :model="paymentData"
        :rules="paymentRules"
        label-placement="left"
        label-width="100px"
      >
        <n-form-item label="Montant" path="amount">
          <n-input-number
            v-model:value="paymentData.amount"
            :min="0.01"
            :max="selectedInvoice?.balance_due"
            :precision="2"
            style="width: 150px"
          />
          <n-button
            size="small"
            style="margin-left: 8px"
            @click="paymentData.amount = selectedInvoice?.balance_due"
          >
            Tout
          </n-button>
        </n-form-item>

        <n-form-item label="Méthode" path="payment_method">
          <n-select
            v-model:value="paymentData.payment_method"
            :options="paymentMethodOptions"
            style="width: 200px"
          />
        </n-form-item>

        <n-form-item label="Référence" path="reference">
          <n-input v-model:value="paymentData.reference" placeholder="# chèque, transaction..." />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showPaymentModal = false">Annuler</n-button>
          <n-button type="primary" :loading="savingPayment" @click="handleSavePayment">
            Enregistrer le paiement
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

const loading = ref(false)
const saving = ref(false)
const savingPayment = ref(false)
const showModal = ref(false)
const showPaymentModal = ref(false)
const isEdit = ref(false)
const formRef = ref(null)
const paymentFormRef = ref(null)
const loadingStudents = ref(false)
const selectedInvoice = ref(null)

// Data
const invoices = ref([])
const studentOptions = ref([])
const sessionOptions = ref([])
const stats = reactive({
  total_billed: 0,
  total_collected: 0,
  balance_due: 0,
  pending: 0,
})

// Filters
const filters = reactive({
  search: '',
  status: null,
})

// Form data
const defaultFormData = {
  id: null,
  student_id: null,
  session_id: null,
  subtotal: 0,
  due_date: null,
  description: '',
}

const formData = reactive({ ...defaultFormData })

const taxes = reactive({
  tps: 0,
  tvq: 0,
  total: 0,
})

const paymentData = reactive({
  amount: 0,
  payment_method: 'cash',
  reference: '',
})

// Rules
const rules = {
  student_id: {
    required: true,
    type: 'number',
    message: "L'étudiant est requis",
    trigger: 'change',
  },
  subtotal: { required: true, type: 'number', message: 'Le montant est requis', trigger: 'blur' },
}

const paymentRules = {
  amount: { required: true, type: 'number', message: 'Le montant est requis', trigger: 'blur' },
  payment_method: { required: true, message: 'La méthode est requise', trigger: 'change' },
}

// Options
const statusOptions = [
  { label: 'Brouillon', value: 'draft' },
  { label: 'Envoyée', value: 'sent' },
  { label: 'Payée', value: 'paid' },
  { label: 'Partiel', value: 'partial' },
  { label: 'En retard', value: 'overdue' },
  { label: 'Annulée', value: 'cancelled' },
]

const paymentMethodOptions = [
  { label: 'Comptant', value: 'cash' },
  { label: 'Chèque', value: 'check' },
  { label: 'Carte de crédit', value: 'credit_card' },
  { label: 'Débit', value: 'debit' },
  { label: 'Virement', value: 'transfer' },
  { label: 'Interac', value: 'interac' },
]

// Columns
const columns = [
  { title: 'Numéro', key: 'invoice_number', width: 140 },
  {
    title: 'Étudiant',
    key: 'student_name',
    render(row) {
      return h('div', [
        h('div', row.student_name),
        h('div', { style: 'font-size: 12px; color: #666' }, row.student_email),
      ])
    },
  },
  {
    title: 'Total',
    key: 'total',
    width: 100,
    render(row) {
      return formatMoney(row.total)
    },
  },
  {
    title: 'Payé',
    key: 'amount_paid',
    width: 100,
    render(row) {
      return formatMoney(row.amount_paid)
    },
  },
  {
    title: 'Solde',
    key: 'balance_due',
    width: 100,
    render(row) {
      const color = row.balance_due > 0 ? '#d03050' : '#18a058'
      return h('span', { style: `color: ${color}; font-weight: 500` }, formatMoney(row.balance_due))
    },
  },
  {
    title: 'Statut',
    key: 'status',
    width: 100,
    render(row) {
      const statuses = {
        draft: { label: 'Brouillon', type: 'default' },
        sent: { label: 'Envoyée', type: 'info' },
        paid: { label: 'Payée', type: 'success' },
        partial: { label: 'Partiel', type: 'warning' },
        overdue: { label: 'En retard', type: 'error' },
        cancelled: { label: 'Annulée', type: 'error' },
      }
      const s = statuses[row.status] || statuses.draft
      return h(NTag, { type: s.type, size: 'small' }, { default: () => s.label })
    },
  },
  {
    title: 'Date',
    key: 'issue_date',
    width: 100,
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 200,
    render(row) {
      const actions = [
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            disabled: row.status === 'paid',
            onClick: () => handleAddPayment(row),
          },
          { default: () => 'Payer' }
        ),
        h(
          NButton,
          { size: 'small', quaternary: true, onClick: () => handleEdit(row) },
          { default: () => 'Éditer' }
        ),
      ]

      if (row.status !== 'paid') {
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
              default: () => 'Supprimer cette facture?',
            }
          )
        )
      }

      return h(NSpace, { size: 'small' }, { default: () => actions })
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
})

// Methods
function formatMoney(value) {
  if (value == null) return '0,00 $'
  return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(value)
}

function calculateTaxes() {
  const subtotal = formData.subtotal || 0
  taxes.tps = subtotal * 0.05
  taxes.tvq = subtotal * 0.09975
  taxes.total = subtotal + taxes.tps + taxes.tvq
}

async function loadStats() {
  try {
    const res = await request.get('/invoice/stats')
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
      params: { page: 1, page_size: 100, status: 'active' },
    })
    if (res.code === 200) {
      studentOptions.value = res.data.map((s) => ({
        label: `${s.first_name} ${s.last_name}`,
        value: s.id,
      }))
    }
  } catch (error) {
    console.error('Error loading students:', error)
  } finally {
    loadingStudents.value = false
  }
}

async function loadSessions() {
  try {
    const res = await request.get('/session/list', {
      params: { page: 1, page_size: 50, upcoming: true },
    })
    if (res.code === 200) {
      sessionOptions.value = res.data.map((s) => ({
        label: `${s.title} (${s.start_date})`,
        value: s.id,
      }))
    }
  } catch (error) {
    console.error('Error loading sessions:', error)
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
    if (filters.status) params.status = filters.status

    const res = await request.get('/invoice/list', { params })

    if (res.code === 200) {
      invoices.value = res.data
      pagination.itemCount = res.total
    }
  } catch (error) {
    console.error('Error loading invoices:', error)
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
  Object.assign(taxes, { tps: 0, tvq: 0, total: 0 })
  showModal.value = true
}

function handleEdit(row) {
  isEdit.value = true
  Object.assign(formData, {
    id: row.id,
    student_id: row.student_id,
    session_id: row.session_id,
    subtotal: row.subtotal,
    due_date: row.due_date,
    description: row.description || '',
  })
  calculateTaxes()
  showModal.value = true
}

async function handleDelete(row) {
  try {
    const res = await request.delete('/invoice/delete', { params: { invoice_id: row.id } })

    if (res.code === 200) {
      message.success('Facture supprimée')
      loadData()
      loadStats()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function handleSave() {
  try {
    await formRef.value?.validate()
    saving.value = true

    const data = {
      student_id: formData.student_id,
      session_id: formData.session_id || null,
      subtotal: formData.subtotal,
      due_date: formData.due_date || null,
      description: formData.description || null,
    }

    let res
    if (isEdit.value) {
      data.id = formData.id
      res = await request.post('/invoice/update', data)
    } else {
      res = await request.post('/invoice/create', data)
    }

    if (res.code === 200) {
      message.success(isEdit.value ? 'Facture modifiée' : 'Facture créée')
      showModal.value = false
      loadData()
      loadStats()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    saving.value = false
  }
}

function handleAddPayment(row) {
  selectedInvoice.value = row
  paymentData.amount = row.balance_due
  paymentData.payment_method = 'cash'
  paymentData.reference = ''
  showPaymentModal.value = true
}

async function handleSavePayment() {
  try {
    await paymentFormRef.value?.validate()
    savingPayment.value = true

    const res = await request.post('/invoice/payment', {
      invoice_id: selectedInvoice.value.id,
      amount: paymentData.amount,
      payment_method: paymentData.payment_method,
      reference: paymentData.reference || null,
    })

    if (res.code === 200) {
      message.success('Paiement enregistré')
      showPaymentModal.value = false
      loadData()
      loadStats()
    } else {
      message.error(res.msg || 'Erreur')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    savingPayment.value = false
  }
}

onMounted(() => {
  loadStats()
  loadStudents()
  loadSessions()
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
