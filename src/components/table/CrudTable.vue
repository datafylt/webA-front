<template>
  <div v-bind="$attrs">
    <QueryBar v-if="$slots.queryBar" mb-30 @search="handleSearch" @reset="handleReset">
      <slot name="queryBar" />
    </QueryBar>

    <n-data-table
      :remote="remote"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      :scroll-x="scrollX"
      :row-key="(row) => row[rowKey]"
      :pagination="isPagination ? pagination : false"
      @update:checked-row-keys="onChecked"
      @update:page="onPageChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  /**
   * @remote true: BackendMinutepage  false： FrontendMinutepage
   */
  remote: {
    type: Boolean,
    default: true,
  },
  /**
   * @remote WhetherMinutepage
   */
  isPagination: {
    type: Boolean,
    default: true,
  },
  scrollX: {
    type: Number,
    default: 450,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  columns: {
    type: Array,
    required: true,
  },
  /** queryBarinParameters */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  /** supplementParameters（Optional） */
  extraParams: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * ! conventionAPIinput paramsoutput params
   * * assignpagemode needs conventionassignpageAPIinput params
   *    @page_size assignpageParameters：onepagedisplayhow manyitems，Default10
   *    @page   assignpageParameters：page number，Default1
   */
  getData: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update:queryItems', 'onChecked', 'onDataChange'])
const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])
const pagination = reactive({
  page: 1,
  page_size: 10,
  pageSizes: [10, 20, 50, 100],
  showSizePicker: true,
  prefix({ itemCount }) {
    return `Total ${itemCount} items`
  },
  onChange: (page) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize) => {
    pagination.page_size = pageSize
    pagination.page = 1
    handleQuery()
  },
})

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}
    // ifnotassignpagemodeororuseFrontendassignpage,thennoneneedpassassignpageParameters
    if (props.isPagination && props.remote) {
      paginationParams = { page: pagination.page, page_size: pagination.page_size }
    }
    const { data, total } = await props.getData({
      ...props.queryItems,
      ...props.extraParams,
      ...paginationParams,
    })
    tableData.value = data
    pagination.itemCount = total || 0
  } catch (error) {
    tableData.value = []
    pagination.itemCount = 0
  } finally {
    emit('onDataChange', tableData.value)
    loading.value = false
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}
async function handleReset() {
  const queryItems = { ...props.queryItems }
  for (const key in queryItems) {
    queryItems[key] = null
  }
  emit('update:queryItems', { ...queryItems, ...initQuery })
  await nextTick()
  pagination.page = 1
  handleQuery()
}
function onPageChange(currentPage) {
  pagination.page = currentPage
  if (props.remote) {
    handleQuery()
  }
}
function onChecked(rowKeys) {
  if (props.columns.some((item) => item.type === 'selection')) {
    emit('onChecked', rowKeys)
  }
}

defineExpose({
  handleSearch,
  handleReset,
  tableData,
})
</script>
