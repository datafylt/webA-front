import { isNullOrWhitespace } from '@/utils'

const ACTIONS = {
  view: 'View',
  edit: 'Edit',
  add: 'Add',
}

export default function ({ name, initForm = {}, doCreate, doDelete, doUpdate, refresh }) {
  const modalVisible = ref(false)
  const modalAction = ref('')
  const modalTitle = computed(() => ACTIONS[modalAction.value] + name)
  const modalLoading = ref(false)
  const modalFormRef = ref(null)
  const modalForm = ref({ ...initForm })

  /** Add */
  function handleAdd() {
    modalAction.value = 'add'
    modalVisible.value = true
    modalForm.value = { ...initForm }
  }

  /** Modify */
  function handleEdit(row) {
    modalAction.value = 'edit'
    modalVisible.value = true
    modalForm.value = { ...row }
  }

  /** View */
  function handleView(row) {
    modalAction.value = 'view'
    modalVisible.value = true
    modalForm.value = { ...row }
  }

  /** Save */
  function handleSave(...callbacks) {
    if (!['edit', 'add'].includes(modalAction.value)) {
      modalVisible.value = false
      return
    }
    modalFormRef.value?.validate(async (err) => {
      if (err) return
      const actions = {
        add: {
          api: () => doCreate(modalForm.value),
          cb: () => {
            callbacks.forEach((callback) => callback && callback())
          },
          msg: () => $message.success('AddSuccess'),
        },
        edit: {
          api: () => doUpdate(modalForm.value),
          cb: () => {
            callbacks.forEach((callback) => callback && callback())
          },
          msg: () => $message.success('EditSuccess'),
        },
      }
      const action = actions[modalAction.value]

      try {
        modalLoading.value = true
        const data = await action.api()
        action.cb()
        action.msg()
        modalLoading.value = modalVisible.value = false
        data && refresh(data)
      } catch (error) {
        modalLoading.value = false
      }
    })
  }

  /** Delete */
  async function handleDelete(params = {}) {
    if (isNullOrWhitespace(params)) return
    try {
      modalLoading.value = true
      const data = await doDelete(params)
      $message.success('Deleted successfully')
      modalLoading.value = false
      refresh(data)
    } catch (error) {
      modalLoading.value = false
    }
  }

  return {
    modalVisible,
    modalAction,
    modalTitle,
    modalLoading,
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
    handleSave,
    modalForm,
    modalFormRef,
  }
}
