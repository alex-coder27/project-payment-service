import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('inncash_token') || null)
  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: any) {
    try {
      const { data } = await api.post('/auth/login', credentials)
      token.value = data.access_token
      localStorage.setItem('inncash_token', data.access_token)
      return true
    } catch (error) {
      console.error('Erro ao autenticar:', error)
      return false
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem('inncash_token')
  }

  return { token, user, isAuthenticated, login, logout }
})