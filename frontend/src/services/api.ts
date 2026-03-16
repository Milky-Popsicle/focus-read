import axios from 'axios'

const API_BASE = 'http://localhost:3000'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  role: 'admin' | 'teacher' | 'student'
}

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth API
export const authAPI = {
  login: (payload: LoginPayload) => apiClient.post('/auth/login', payload),
  register: (payload: RegisterPayload) => apiClient.post('/auth/register', payload),
}

// Users API
export const usersAPI = {
  create: (payload: RegisterPayload) => apiClient.post('/users', payload),
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  updateProfilePicture: (id: string, profilePicture: string) => apiClient.put(`/users/${id}/profile-picture`, { profilePicture }),
}

// Students API
export const studentsAPI = {
  create: (payload: any) => apiClient.post('/students', payload),
  getAll: () => apiClient.get('/students'),
  getById: (id: string) => apiClient.get(`/students/${id}`),
}

// Teachers API
export const teachersAPI = {
  create: (payload: any) => apiClient.post('/teachers', payload),
  getAll: () => apiClient.get('/teachers'),
  getById: (id: string) => apiClient.get(`/teachers/${id}`),
}

// Study Plans API
export const studyPlansAPI = {
  create: (studentId: string, payload: { title: string; description: string }) => apiClient.post(`/study-plans/${studentId}`, payload),
  getAllByStudent: (studentId: string) => apiClient.get(`/study-plans/student/${studentId}`),
  getById: (id: string) => apiClient.get(`/study-plans/${id}`),
  update: (id: string, payload: { title?: string; description?: string }) => apiClient.put(`/study-plans/${id}`, payload),
  markCompleted: (id: string) => apiClient.patch(`/study-plans/${id}/complete`),
  delete: (id: string) => apiClient.delete(`/study-plans/${id}`),
}

// Reading Materials API
export const materialAPI = {
  create: (payload: any) => apiClient.post('/reading-materials', payload),
  getAll: () => apiClient.get('/reading-materials'),
  getById: (id: string) => apiClient.get(`/reading-materials/${id}`),
}

// Assessments API
export const assessmentsAPI = {
  create: (payload: any) => apiClient.post('/assessments', payload),
  getAll: () => apiClient.get('/assessments'),
  getById: (id: string) => apiClient.get(`/assessments/${id}`),
}

// Results API
export const resultsAPI = {
  create: (payload: any) => apiClient.post('/results', payload),
  getAll: () => apiClient.get('/results'),
  getById: (id: string) => apiClient.get(`/results/${id}`),
}

// Reports API
export const reportsAPI = {
  create: (payload: any) => apiClient.post('/reports', payload),
  getAll: () => apiClient.get('/reports'),
}
