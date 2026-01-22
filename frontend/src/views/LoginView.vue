<template>
    <div class="login-wrapper">
        <div class="organic-card">
            <h1 class="title">Sistema de Pagamentos</h1>
            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label>E-mail</label>
                    <input v-model="email" type="email" placeholder="seu@email.com" class="inn-input" required />
                </div>

                <div class="form-group">
                    <label>Senha</label>
                    <input v-model="password" type="password" placeholder="••••••••" class="inn-input" required />
                </div>

                <button type="submit" :disabled="loading" class="inn-button">
                    {{ loading ? 'Autenticando...' : 'Entrar' }}
                </button>

                <p v-if="error" class="error-msg">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
    loading.value = true
    error.value = ''

    const success = await auth.login({
        email: email.value,
        password: password.value
    })

    if (success) {
        router.push('/')
    } else {
        error.value = 'Credenciais inválidas. Tente novamente.'
    }
    loading.value = false
}
</script>

<style scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f3f4f6;
    font-family: 'Inter', sans-serif;
}

.organic-card {
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.03);
}

.title {
    font-size: 2.2rem;
    font-weight: 800;
    margin: 0;
    letter-spacing: -1px;
    color: #1a1a1a;
    margin-bottom: 2rem;
}

.form-group {
    text-align: left;
    margin-bottom: 1.2rem;
}

.form-group label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    color: #475569;
    letter-spacing: 0.5px;
}

.inn-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    font-size: 1rem;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.inn-input:focus {
    outline: none;
    border-color: #3b82f6;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.inn-button {
    width: 100%;
    background: #1a1a1a;
    color: white;
    padding: 14px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.1s active, background 0.2s;
    margin-top: 1rem;
}

.inn-button:hover {
    background: #000;
}

.inn-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-msg {
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: 1rem;
    font-weight: 500;
}
</style>