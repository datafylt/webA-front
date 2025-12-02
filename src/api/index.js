import { request } from '@/utils'
import apiClients from '@/utils/http/multi-client'

// Keep ALL existing APIs unchanged
const singleBackendApi = {
  login: (data) => request.post('/base/access_token', data, { noNeedToken: true }),
  getUserInfo: () => request.get('/base/userinfo'),
  getUserMenu: () => request.get('/base/usermenu'),
  getUserApi: () => request.get('/base/userapi'),
  updatePassword: (data = {}) => request.post('/base/update_password', data),
  getUserList: (params = {}) => request.get('/user/list', { params }),
  getUserById: (params = {}) => request.get('/user/get', { params }),
  createUser: (data = {}) => request.post('/user/create', data),
  updateUser: (data = {}) => request.post('/user/update', data),
  deleteUser: (params = {}) => request.delete(`/user/delete`, { params }),
  resetPassword: (data = {}) => request.post(`/user/reset_password`, data),
  getRoleList: (params = {}) => request.get('/role/list', { params }),
  createRole: (data = {}) => request.post('/role/create', data),
  updateRole: (data = {}) => request.post('/role/update', data),
  deleteRole: (params = {}) => request.delete('/role/delete', { params }),
  updateRoleAuthorized: (data = {}) => request.post('/role/authorized', data),
  getRoleAuthorized: (params = {}) => request.get('/role/authorized', { params }),
  getMenus: (params = {}) => request.get('/menu/list', { params }),
  createMenu: (data = {}) => request.post('/menu/create', data),
  updateMenu: (data = {}) => request.post('/menu/update', data),
  deleteMenu: (params = {}) => request.delete('/menu/delete', { params }),
  getApis: (params = {}) => request.get('/api/list', { params }),
  createApi: (data = {}) => request.post('/api/create', data),
  updateApi: (data = {}) => request.post('/api/update', data),
  deleteApi: (params = {}) => request.delete('/api/delete', { params }),
  refreshApi: (data = {}) => request.post('/api/refresh', data),
  getDepts: (params = {}) => request.get('/dept/list', { params }),
  createDept: (data = {}) => request.post('/dept/create', data),
  updateDept: (data = {}) => request.post('/dept/update', data),
  deleteDept: (params = {}) => request.delete('/dept/delete', { params }),
  getAuditLogList: (params = {}) => request.get('/auditlog/list', { params }),
}

// NEW: Multi-backend APIs
const multiBackendApi = {
  // Website A APIs
  websiteA: {
    getUsers: (params = {}) => apiClients.websiteA.get('/api/v1/users', { params }),
    createUser: (data = {}) => apiClients.websiteA.post('/api/v1/users', data),
    updateUser: (id, data = {}) => apiClients.websiteA.put(`/api/v1/users/${id}`, data),
    deleteUser: (id) => apiClients.websiteA.delete(`/api/v1/users/${id}`),
    getRoles: (params = {}) => apiClients.websiteA.get('/api/v1/roles', { params }),
    getDepts: (params = {}) => apiClients.websiteA.get('/api/v1/depts', { params }),
    health: () => apiClients.websiteA.get('/health'),
  },

  // Website B APIs
  websiteB: {
    getProducts: (params = {}) => apiClients.websiteB.get('/api/v1/products', { params }),
    createProduct: (data = {}) => apiClients.websiteB.post('/api/v1/products', data),
    updateProduct: (id, data = {}) => apiClients.websiteB.put(`/api/v1/products/${id}`, data),
    deleteProduct: (id) => apiClients.websiteB.delete(`/api/v1/products/${id}`),
    health: () => apiClients.websiteB.get('/health'),
  },

  // Website C APIs
  websiteC: {
    getPosts: (params = {}) => apiClients.websiteC.get('/api/v1/posts', { params }),
    createPost: (data = {}) => apiClients.websiteC.post('/api/v1/posts', data),
    health: () => apiClients.websiteC.get('/health'),
  },

  // Website D APIs
  websiteD: {
    getPages: (params = {}) => apiClients.websiteD.get('/api/v1/pages', { params }),
    updatePage: (id, data = {}) => apiClients.websiteD.put(`/api/v1/pages/${id}`, data),
    health: () => apiClients.websiteD.get('/health'),
  },
}

// Export everything
export default {
  ...singleBackendApi,  // All existing APIs still work
  ...multiBackendApi,   // New multi-backend APIs
}