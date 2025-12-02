<template>
  <CommonPage>
    <n-card title="Website A - User Management" class="mb-4">
      <n-alert type="info" :bordered="false">
        Managing users for Website A ({{ apiConfigs.websiteA.baseURL }})
      </n-alert>
    </n-card>

    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.websiteA.getUsers"
      :create-data="api.websiteA.createUser"
      :update-data="(id, data) => api.websiteA.updateUser(id, data)"
      :delete-data="api.websiteA.deleteUser"
    >
      <template #queryBar>
        <QueryBarItem label="Username">
          <n-input
            v-model:value="queryItems.username"
            placeholder="Search username"
            clearable
          />
        </QueryBarItem>
        <QueryBarItem label="Email">
          <n-input
            v-model:value="queryItems.email"
            placeholder="Search email"
            clearable
          />
        </QueryBarItem>
      </template>
    </CrudTable>
  </CommonPage>
</template>

<script setup>
import api from '@/api'
import { apiConfigs } from '@/utils/http/multi-client'

defineOptions({ name: 'WebsiteA-Users' })

const $table = ref(null)
const queryItems = ref({})

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'Username', key: 'username', width: 150 },
  { title: 'Email', key: 'email', width: 200 },
  { title: 'Status', key: 'status', width: 100 },
  { title: 'Created', key: 'created_at', width: 180 },
]

onMounted(() => {
  $table.value?.handleSearch()
})
</script>