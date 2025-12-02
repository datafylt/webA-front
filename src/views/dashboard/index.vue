<template>
  <CommonPage>
    <n-card title="Website Health Monitor" class="mb-4">
      <n-space justify="space-between" align="center">
        <n-text>Monitor all your websites from one place</n-text>
        <n-button type="primary" @click="checkAllHealth">
          <template #icon>
            <TheIcon icon="mdi:refresh" />
          </template>
          Refresh All
        </n-button>
      </n-space>
    </n-card>

    <div class="website-grid">
      <n-card
        v-for="site in websites"
        :key="site.key"
        :title="site.name"
        class="website-card"
      >
        <template #header-extra>
          <n-tag
            :type="site.status === 'online' ? 'success' : 'error'"
            size="small"
          >
            {{ site.status === 'online' ? 'Online' : 'Offline' }}
          </n-tag>
        </template>

        <n-space vertical>
          <div>
            <n-text depth="3">Description: </n-text>
            <n-text>{{ site.description }}</n-text>
          </div>

          <div v-if="site.status === 'online'">
            <n-text depth="3">Response Time: </n-text>
            <n-text type="success">{{ site.responseTime }}ms</n-text>
          </div>

          <div v-else-if="site.error">
            <n-text depth="3">Error: </n-text>
            <n-text type="error">{{ site.error }}</n-text>
          </div>

          <div>
            <n-text depth="3">URL: </n-text>
            <n-text code>{{ site.baseURL }}</n-text>
          </div>

          <div>
            <n-text depth="3">Last Checked: </n-text>
            <n-text>{{ site.lastChecked }}</n-text>
          </div>

          <n-space>
            <n-button size="small" @click="checkHealth(site.key)">
              Check Health
            </n-button>
            <n-button
              size="small"
              type="primary"
              :disabled="site.status !== 'online'"
              @click="goToManagement(site.key)"
            >
              Manage
            </n-button>
          </n-space>
        </n-space>
      </n-card>
    </div>
  </CommonPage>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { apiConfigs } from '@/utils/http/multi-client'
import TheIcon from '@/components/icon/TheIcon.vue'

defineOptions({ name: 'MultiSiteDashboard' })

const router = useRouter()
const websites = ref([])
const loading = ref(false)

onMounted(() => {
  checkAllHealth()
})

async function checkAllHealth() {
  loading.value = true

  const checks = Object.keys(apiConfigs).map(async (key) => {
    const startTime = Date.now()
    try {
      await api[key].health()
      const responseTime = Date.now() - startTime

      return {
        key,
        name: apiConfigs[key].name,
        description: apiConfigs[key].description,
        baseURL: apiConfigs[key].baseURL,
        status: 'online',
        responseTime,
        lastChecked: new Date().toLocaleString(),
        error: null,
      }
    } catch (error) {
      return {
        key,
        name: apiConfigs[key].name,
        description: apiConfigs[key].description,
        baseURL: apiConfigs[key].baseURL,
        status: 'offline',
        responseTime: null,
        lastChecked: new Date().toLocaleString(),
        error: error.message,
      }
    }
  })

  websites.value = await Promise.all(checks)
  loading.value = false
}

async function checkHealth(siteKey) {
  const index = websites.value.findIndex(site => site.key === siteKey)
  if (index === -1) return

  const startTime = Date.now()
  try {
    await api[siteKey].health()
    const responseTime = Date.now() - startTime

    websites.value[index] = {
      ...websites.value[index],
      status: 'online',
      responseTime,
      lastChecked: new Date().toLocaleString(),
      error: null,
    }

    window.$message?.success(`${websites.value[index].name} is healthy`)
  } catch (error) {
    websites.value[index] = {
      ...websites.value[index],
      status: 'offline',
      responseTime: null,
      lastChecked: new Date().toLocaleString(),
      error: error.message,
    }

    window.$message?.error(`${websites.value[index].name} is offline`)
  }
}

function goToManagement(siteKey) {
  if (siteKey === 'websiteA') {
    router.push('/website-a/users')
  } else if (siteKey === 'websiteB') {
    router.push('/website-b/users')
  }
}
</script>

<style scoped>
.website-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.website-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.website-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>