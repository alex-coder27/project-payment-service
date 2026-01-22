import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payments', () => {
  const flags = ref({
    newFlow: false,
    enableWebSocket: true
  })

  const remittances = ref([])

  function setRemittances(data: any) {
    remittances.value = data
  }

  return { flags, remittances, setRemittances }
})