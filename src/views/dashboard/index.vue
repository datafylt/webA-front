<template>
  <CommonPage>
    <n-grid :cols="4" :x-gap="16" :y-gap="16" class="mb-4">
      <n-grid-item>
        <n-card hoverable class="stat-card" @click="$router.push('/school/students')">
          <n-space align="center" justify="space-between">
            <div>
              <n-text depth="3">Étudiants actifs</n-text>
              <div class="stat-value">{{ stats.students?.active || 0 }}</div>
              <n-text depth="3" style="font-size: 12px">+{{ stats.students?.new_this_week || 0 }} cette semaine</n-text>
            </div>
            <n-avatar :size="48" round style="background-color: #18a058">
              <TheIcon icon="mdi:account-school" :size="28" />
            </n-avatar>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card hoverable class="stat-card" @click="$router.push('/school/sessions')">
          <n-space align="center" justify="space-between">
            <div>
              <n-text depth="3">Sessions à venir</n-text>
              <div class="stat-value">{{ stats.sessions?.upcoming || 0 }}</div>
              <n-text depth="3" style="font-size: 12px">{{ stats.sessions?.total || 0 }} total</n-text>
            </div>
            <n-avatar :size="48" round style="background-color: #2080f0">
              <TheIcon icon="mdi:calendar-clock" :size="28" />
            </n-avatar>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card hoverable class="stat-card" @click="$router.push('/school/payments')">
          <n-space align="center" justify="space-between">
            <div>
              <n-text depth="3">Revenus perçus</n-text>
              <div class="stat-value">{{ formatMoney(stats.revenue?.total_collected) }}</div>
              <n-text type="warning" style="font-size: 12px">{{ formatMoney(stats.revenue?.pending) }} en attente</n-text>
            </div>
            <n-avatar :size="48" round style="background-color: #f0a020">
              <TheIcon icon="mdi:cash-multiple" :size="28" />
            </n-avatar>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card hoverable class="stat-card" @click="$router.push('/school/instructors')">
          <n-space align="center" justify="space-between">
            <div>
              <n-text depth="3">Formateurs disponibles</n-text>
              <div class="stat-value">{{ stats.instructors?.available || 0 }}</div>
              <n-text depth="3" style="font-size: 12px">{{ stats.instructors?.total || 0 }} total</n-text>
            </div>
            <n-avatar :size="48" round style="background-color: #722ed1">
              <TheIcon icon="mdi:human-male-board" :size="28" />
            </n-avatar>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-grid :cols="2" :x-gap="16" :y-gap="16">
      <n-grid-item>
        <n-card title="Prochaines sessions" size="small">
          <template #header-extra>
            <n-button text type="primary" @click="$router.push('/school/sessions')">Voir tout</n-button>
          </template>
          <n-spin :show="loadingSessions">
            <n-list v-if="upcomingSessions.length > 0">
              <n-list-item v-for="session in upcomingSessions" :key="session.id">
                <n-thing>
                  <template #header>
                    <n-space align="center">
                      {{ session.title }}
                      <n-tag size="small" :type="getLocationTagType(session.location_type)">{{ getLocationLabel(session.location_type) }}</n-tag>
                    </n-space>
                  </template>
                  <template #description>
                    <n-space>
                      <n-text depth="3">{{ session.program_name }} • {{ formatDate(session.start_date) }} • </n-text>
                      <n-text :type="session.enrolled >= session.max_participants ? 'error' : 'success'">{{ session.enrolled }}/{{ session.max_participants }}</n-text>
                    </n-space>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
            <n-empty v-else description="Aucune session à venir" />
          </n-spin>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Paiements en attente" size="small">
          <template #header-extra>
            <n-button text type="primary" @click="$router.push('/school/payments')">Voir tout</n-button>
          </template>
          <n-spin :show="loadingPayments">
            <n-list v-if="pendingPayments.length > 0">
              <n-list-item v-for="invoice in pendingPayments" :key="invoice.id">
                <n-thing>
                  <template #header>
                    <n-space align="center">
                      {{ invoice.invoice_number }}
                      <n-tag size="small" :type="getInvoiceStatusType(invoice.status)">{{ getInvoiceStatusLabel(invoice.status) }}</n-tag>
                    </n-space>
                  </template>
                  <template #description>
                    <n-text depth="3">{{ invoice.student_name }} • </n-text>
                    <n-text type="error" strong>{{ formatMoney(invoice.balance_due) }} dû</n-text>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
            <n-empty v-else description="Aucun paiement en attente" />
          </n-spin>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Nouveaux étudiants" size="small">
          <template #header-extra>
            <n-button text type="primary" @click="$router.push('/school/students')">Voir tout</n-button>
          </template>
          <n-spin :show="loadingStudents">
            <n-list v-if="recentStudents.length > 0">
              <n-list-item v-for="student in recentStudents" :key="student.id">
                <n-thing>
                  <template #avatar><n-avatar round style="background-color: #18a058">{{ getInitials(student.full_name) }}</n-avatar></template>
                  <template #header>{{ student.full_name }}</template>
                  <template #description>
                    <n-text depth="3">{{ student.email }}</n-text>
                    <n-tag v-if="student.goal" size="small" style="margin-left: 8px">{{ getGoalLabel(student.goal) }}</n-tag>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
            <n-empty v-else description="Aucun nouvel étudiant" />
          </n-spin>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="Actions rapides" size="small">
          <n-grid :cols="2" :x-gap="12" :y-gap="12">
            <n-grid-item><n-button block @click="$router.push('/school/students')"><template #icon><TheIcon icon="mdi:account-plus" /></template>Nouvel étudiant</n-button></n-grid-item>
            <n-grid-item><n-button block @click="$router.push('/school/sessions')"><template #icon><TheIcon icon="mdi:calendar-plus" /></template>Nouvelle session</n-button></n-grid-item>
            <n-grid-item><n-button block @click="$router.push('/school/payments')"><template #icon><TheIcon icon="mdi:file-document-plus" /></template>Nouvelle facture</n-button></n-grid-item>
            <n-grid-item><n-button block @click="$router.push('/school/notifications')"><template #icon><TheIcon icon="mdi:email-send" /></template>Notification</n-button></n-grid-item>
          </n-grid>
          <n-divider />
          <n-space vertical>
            <n-space justify="space-between"><n-text>Programmes actifs</n-text><n-text strong>{{ stats.programs?.active || 0 }}</n-text></n-space>
            <n-space justify="space-between"><n-text>Inscriptions cette semaine</n-text><n-text strong>{{ stats.enrollments?.new_this_week || 0 }}</n-text></n-space>
            <n-space justify="space-between"><n-text>Factures en attente</n-text><n-text strong type="warning">{{ stats.revenue?.pending_invoices || 0 }}</n-text></n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </CommonPage>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { request } from '@/utils'

defineOptions({ name: 'SchoolDashboard' })

const loadingSessions = ref(false)
const loadingPayments = ref(false)
const loadingStudents = ref(false)
const stats = reactive({})
const upcomingSessions = ref([])
const pendingPayments = ref([])
const recentStudents = ref([])

function formatMoney(v) { return v == null ? '0 $' : new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(v) }
function formatDate(d) { return d ? new Date(d).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' }) : '' }
function getInitials(n) { return n ? n.split(' ').map(x => x[0]).join('').toUpperCase().slice(0, 2) : '?' }
function getLocationTagType(t) { return { in_person: 'success', online: 'info', hybrid: 'warning' }[t] || 'default' }
function getLocationLabel(t) { return { in_person: 'Présentiel', online: 'En ligne', hybrid: 'Hybride' }[t] || t }
function getInvoiceStatusType(s) { return { sent: 'info', partial: 'warning', overdue: 'error' }[s] || 'default' }
function getInvoiceStatusLabel(s) { return { sent: 'Envoyée', partial: 'Partiel', overdue: 'En retard' }[s] || s }
function getGoalLabel(g) { return { licence_c: 'Licence C', rca: 'RCA', rbq: 'RBQ', cmeq: 'CMEQ', sceau_rouge: 'Sceau Rouge' }[g] || g }

async function loadStats() { try { const r = await request.get('/dashboard/stats'); if (r.code === 200) Object.assign(stats, r.data) } catch (e) { console.error(e) } }
async function loadUpcomingSessions() { loadingSessions.value = true; try { const r = await request.get('/dashboard/upcoming-sessions'); if (r.code === 200) upcomingSessions.value = r.data } catch (e) { console.error(e) } finally { loadingSessions.value = false } }
async function loadPendingPayments() { loadingPayments.value = true; try { const r = await request.get('/dashboard/pending-payments'); if (r.code === 200) pendingPayments.value = r.data } catch (e) { console.error(e) } finally { loadingPayments.value = false } }
async function loadRecentStudents() { loadingStudents.value = true; try { const r = await request.get('/dashboard/recent-students'); if (r.code === 200) recentStudents.value = r.data } catch (e) { console.error(e) } finally { loadingStudents.value = false } }

onMounted(() => { loadStats(); loadUpcomingSessions(); loadPendingPayments(); loadRecentStudents() })
</script>

<style scoped>
.mb-4 { margin-bottom: 16px; }
.stat-card { cursor: pointer; transition: transform 0.2s; }
.stat-card:hover { transform: translateY(-2px); }
.stat-value { font-size: 28px; font-weight: 600; margin: 4px 0; }
</style>
