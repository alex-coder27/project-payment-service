<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="logo">INNCASH</div>
      <nav>
        <a href="#" class="active">Remessas</a>
        <a href="#">Configurações</a>
      </nav>
      <button @click="handleLogout" class="logout-link">Sair</button>
    </aside>

    <main class="main-content">
      <header class="top-bar">
        <h2>Painel de Controle</h2>
        <div class="user-status">
          <span class="dot"></span> Online
        </div>
      </header>

      <section class="stats-grid">
        <div class="stat-card">
          <label>Status WebSocket</label>
          <p>Conectado</p>
        </div>
        <div v-if="payments.featureFlags.newFlow" class="stat-card accent">
          <label>Beta Flow</label>
          <p>Ativo</p>
        </div>
      </section>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in payments.remittances" :key="item.id">
              <td>#{{ item.id }}</td>
              <td>{{ item.recipient }}</td>
              <td>R$ {{ item.amount }}</td>
              <td><span :class="['tag', item.status.toLowerCase()]">{{ item.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { usePaymentStore } from '@/stores/payments'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const payments = usePaymentStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.sidebar {
  width: 260px;
  background: #1a1a1a;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  letter-spacing: -1px;
}

nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

nav a {
  color: #94a3b8;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s;
}

nav a.active, nav a:hover {
  background: #2d2d2d;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.stats-grid {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  flex: 1;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-card label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
}

.stat-card p {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.5rem 0 0;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  background: #f1f5f9;
  padding: 1rem;
  font-size: 0.85rem;
  color: #475569;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.tag {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.tag.processing { background: #fef3c7; color: #92400e; }
.tag.sent { background: #dcfce7; color: #166534; }
.tag.failed { background: #fee2e2; color: #991b1b; }

.logout-link {
  background: none;
  border: 1px solid #475569;
  color: #94a3b8;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
</style>