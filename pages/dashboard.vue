<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

type LeadStatus = 'New' | 'Qualified' | 'Contacted' | 'Closed'

interface Lead {
  id: string
  name: string
  email: string
  company: string
  industry: string
  revenueRange: string
  mainProblem: string
  status: LeadStatus
  score: number
  tags: string[]
  notes: string[]
  activity: string[]
  createdAt: string
  updatedAt: string
}

interface LeadResponse {
  leads: Lead[]
  summary: {
    total: number
    qualified: number
    closed: number
    conversionRate: number
    averageScore: number
  }
}

const authorized = ref(false)
const checkingSession = ref(true)
const search = ref('')
const status = ref('')
const selected = ref<Lead | null>(null)
const note = ref('')
const loading = ref(false)
const error = ref('')
const login = reactive({ email: '', password: '' })
const statuses: LeadStatus[] = ['New', 'Qualified', 'Contacted', 'Closed']

const data = reactive<LeadResponse>({
  leads: [],
  summary: { total: 0, qualified: 0, closed: 0, conversionRate: 0, averageScore: 0 }
})

const recentActivity = computed(() =>
  data.leads
    .flatMap((lead) => lead.activity.slice(0, 2).map((item) => ({ item, lead })))
    .slice(0, 6)
)

async function loadLeads() {
  loading.value = true
  error.value = ''
  try {
    const response = await $fetch<LeadResponse>('/api/leads', {
      query: { search: search.value, status: status.value }
    })
    data.leads = response.leads
    data.summary = response.summary
    selected.value = selected.value
      ? data.leads.find((lead) => lead.id === selected.value?.id) || data.leads[0] || null
      : data.leads[0] || null
    authorized.value = true
  } catch (err: any) {
    error.value = err?.statusMessage || 'No autorizado'
    authorized.value = false
  } finally {
    loading.value = false
  }
}

async function loginAdmin() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: login.email, password: login.password }
    })
    authorized.value = true
    login.password = ''
    await loadLeads()
  } catch (err: any) {
    error.value = err?.statusMessage || 'Credenciales inválidas'
    authorized.value = false
  } finally {
    loading.value = false
  }
}

async function logoutAdmin() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  authorized.value = false
  selected.value = null
  data.leads = []
  data.summary = { total: 0, qualified: 0, closed: 0, conversionRate: 0, averageScore: 0 }
}

async function updateSelected(patch: { status?: LeadStatus; note?: string }) {
  if (!selected.value) return
  const response = await $fetch<{ lead: Lead }>(`/api/leads/${selected.value.id}`, {
    method: 'PATCH',
    body: patch
  })
  selected.value = response.lead
  note.value = ''
  await loadLeads()
}

watch([search, status], () => {
  if (authorized.value) loadLeads()
})

onMounted(async () => {
  try {
    const session = await $fetch<{ authenticated: boolean }>('/api/auth/me')
    authorized.value = session.authenticated
    if (authorized.value) await loadLeads()
  } finally {
    checkingSession.value = false
  }
})
</script>

<template>
  <main class="min-h-screen bg-void text-platinum">
    <section v-if="checkingSession" class="grid min-h-screen place-items-center px-5">
      <div class="font-mono text-xs uppercase tracking-[0.2em] text-muted">Checking session</div>
    </section>

    <section v-else-if="!authorized" class="grid min-h-screen place-items-center px-5">
      <form class="w-full max-w-md rounded-lg border border-line bg-ink p-7 shadow-glow" @submit.prevent="loginAdmin">
        <NuxtLink to="/" class="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-signal">Asterope</NuxtLink>
        <h1 class="mt-5 text-3xl font-light">Command access</h1>
        <p class="mt-3 leading-7 text-muted">Ingrese sus credenciales administrativas para abrir el CRM interno.</p>
        <label class="mt-6 block">
          <span class="premium-label">Email</span>
          <input v-model="login.email" class="premium-input" type="email" autocomplete="username" placeholder="admin@asterope.com" />
        </label>
        <label class="mt-6 block">
          <span class="premium-label">Password</span>
          <input v-model="login.password" class="premium-input" type="password" autocomplete="current-password" placeholder="••••••••••••" />
        </label>
        <p v-if="error" class="mt-3 text-sm text-red-300">{{ error }}</p>
        <button
          class="mt-6 w-full rounded-md bg-cyan px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-void disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Verificando' : 'Entrar' }}
        </button>
      </form>
    </section>

    <section v-else class="mx-auto max-w-7xl px-5 py-7 md:px-8">
      <header class="flex flex-col justify-between gap-5 border-b border-line pb-6 md:flex-row md:items-center">
        <div>
          <NuxtLink to="/" class="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-signal">Asterope Consulting</NuxtLink>
          <h1 class="mt-3 text-3xl font-light md:text-5xl">Acquisition Control Panel</h1>
        </div>
        <div class="flex gap-3">
          <button class="rounded-md border border-line px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:border-signal hover:text-platinum" @click="loadLeads">
            Refresh
          </button>
          <button class="rounded-md border border-line px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:border-red-300 hover:text-red-200" @click="logoutAdmin">
            Logout
          </button>
        </div>
      </header>

      <div class="mt-6 grid gap-4 md:grid-cols-4">
        <div class="rounded-lg border border-line bg-ink p-5">
          <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Total leads</p>
          <p class="mt-3 text-4xl font-semibold">{{ data.summary.total }}</p>
        </div>
        <div class="rounded-lg border border-line bg-ink p-5">
          <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Qualified</p>
          <p class="mt-3 text-4xl font-semibold">{{ data.summary.qualified }}</p>
        </div>
        <div class="rounded-lg border border-line bg-ink p-5">
          <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Conversion</p>
          <p class="mt-3 text-4xl font-semibold">{{ data.summary.conversionRate }}%</p>
        </div>
        <div class="rounded-lg border border-line bg-ink p-5">
          <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Avg score</p>
          <p class="mt-3 text-4xl font-semibold">{{ data.summary.averageScore }}</p>
        </div>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <section class="rounded-lg border border-line bg-ink">
          <div class="grid gap-3 border-b border-line p-4 md:grid-cols-[1fr_180px]">
            <input v-model="search" class="premium-input" placeholder="Search by company, tag, industry, problem" />
            <select v-model="status" class="premium-input">
              <option value="">All statuses</option>
              <option v-for="item in statuses" :key="item" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[760px] text-left">
              <thead class="border-b border-line font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                <tr>
                  <th class="p-4">Lead</th>
                  <th class="p-4">Industry</th>
                  <th class="p-4">Status</th>
                  <th class="p-4">Score</th>
                  <th class="p-4">Tags</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lead in data.leads"
                  :key="lead.id"
                  class="cursor-pointer border-b border-line/70 transition hover:bg-panel"
                  :class="selected?.id === lead.id ? 'bg-panel' : ''"
                  @click="selected = lead"
                >
                  <td class="p-4">
                    <p class="font-semibold">{{ lead.company }}</p>
                    <p class="text-sm text-muted">{{ lead.name }} · {{ lead.email }}</p>
                  </td>
                  <td class="p-4 text-sm text-muted">{{ lead.industry }}</td>
                  <td class="p-4">
                    <span class="rounded-md border border-line px-2 py-1 font-mono text-xs text-signal">{{ lead.status }}</span>
                  </td>
                  <td class="p-4 font-mono text-lg">{{ lead.score }}</td>
                  <td class="p-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="tag in lead.tags" :key="tag" class="rounded bg-cyan/10 px-2 py-1 text-xs text-signal">{{ tag }}</span>
                    </div>
                  </td>
                </tr>
                <tr v-if="!data.leads.length">
                  <td colspan="5" class="p-8 text-center text-muted">No leads captured yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside class="space-y-6">
          <section class="rounded-lg border border-line bg-ink p-5">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Lead detail</p>
            <div v-if="selected" class="mt-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-2xl font-semibold">{{ selected.company }}</h2>
                  <p class="mt-1 text-sm text-muted">{{ selected.name }} · {{ selected.email }}</p>
                </div>
                <p class="font-mono text-3xl text-cyan">{{ selected.score }}</p>
              </div>
              <dl class="mt-5 space-y-3 text-sm">
                <div><dt class="text-muted">Revenue</dt><dd>{{ selected.revenueRange }}</dd></div>
                <div><dt class="text-muted">Industry</dt><dd>{{ selected.industry }}</dd></div>
                <div><dt class="text-muted">Problem</dt><dd class="leading-7">{{ selected.mainProblem }}</dd></div>
              </dl>
              <div class="mt-5 grid grid-cols-2 gap-2">
                <button
                  v-for="item in statuses"
                  :key="item"
                  class="rounded-md border px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] transition"
                  :class="selected.status === item ? 'border-cyan bg-cyan/10 text-cyan' : 'border-line text-muted hover:border-signal hover:text-platinum'"
                  @click="updateSelected({ status: item })"
                >
                  {{ item }}
                </button>
              </div>
              <textarea v-model="note" class="premium-input mt-5 min-h-28" placeholder="Add internal note" />
              <button class="mt-3 w-full rounded-md bg-cyan px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-void disabled:opacity-40" :disabled="!note.trim()" @click="updateSelected({ note })">
                Add note
              </button>
              <div class="mt-5">
                <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Notes</p>
                <p v-if="!selected.notes.length" class="mt-3 text-sm text-muted">No notes yet.</p>
                <ul class="mt-3 space-y-2 text-sm text-muted">
                  <li v-for="item in selected.notes" :key="item" class="rounded border border-line p-3">{{ item }}</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="rounded-lg border border-line bg-ink p-5">
            <p class="font-mono text-xs uppercase tracking-[0.16em] text-muted">Recent activity</p>
            <ul class="mt-4 space-y-3 text-sm text-muted">
              <li v-for="{ item, lead } in recentActivity" :key="`${lead.id}-${item}`" class="border-b border-line pb-3">
                <span class="text-platinum">{{ lead.company }}</span><br />{{ item }}
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </section>
  </main>
</template>
