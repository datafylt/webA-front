<template>
  <CommonPage>
    <n-card title="Website B - Product Management" class="mb-4">
      <n-alert type="info" :bordered="false">
        Managing products for Website B ({{ apiConfigs.websiteB.baseURL }})
      </n-alert>
    </n-card>

    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :columns="columns"
      :get-data="api.websiteB.getProducts"
      :create-data="api.websiteB.createProduct"
      :update-data="(id, data) => api.websiteB.updateProduct(id, data)"
      :delete-data="api.websiteB.deleteProduct"
    >
      <template #queryBar>
        <QueryBarItem label="Product Name">
          <n-input
            v-model:value="queryItems.name"
            placeholder="Search product"
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

defineOptions({ name: 'WebsiteB-Products' })

const $table = ref(null)
const queryItems = ref({})

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'Name', key: 'name', width: 200 },
  { title: 'Description', key: 'description', width: 300 },
  { title: 'Price', key: 'price', width: 100 },
  { title: 'Stock', key: 'stock', width: 100 },
  { title: 'Created', key: 'created_at', width: 180 },
]

onMounted(() => {
  $table.value?.handleSearch()
})
</script>