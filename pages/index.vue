<script setup lang="ts">
import { computed, ref } from 'vue'

const themes = {
  stellar: {
    name: 'Stellar',
    page: 'bg-[#f7fafc] text-[#0d2942]',
    nav: 'border-[#dfe8ef] bg-[#f7fafc]/90',
    border: 'border-[#dfe8ef]',
    soft: 'bg-white/70',
    panel: 'bg-[#f7fafc]',
    card: 'bg-white',
    primary: 'text-[#0d2942]',
    muted: 'text-[#63788c]',
    accent: 'text-[#1699c9]',
    button: 'bg-[#0d2942] text-white hover:bg-[#173d5f]',
    outline: 'border-[#d1dee8] hover:bg-white',
    contact: 'bg-[#0d2942]',
    contactAccent: 'text-[#64c8f0]'
  },
  orbit: {
    name: 'Orbit',
    page: 'bg-[#050914] text-[#d7e7f7]',
    nav: 'border-white/10 bg-[#050914]/88',
    border: 'border-white/10',
    soft: 'bg-[#0b1423]',
    panel: 'bg-[#08111f]',
    card: 'bg-[#0b1423]',
    primary: 'text-[#d7e7f7]',
    muted: 'text-[#7d8da3]',
    accent: 'text-[#7cc7ff]',
    button: 'bg-[#7cc7ff] text-[#03070d] hover:bg-[#b8e6ff]',
    outline: 'border-white/15 hover:bg-white/5',
    contact: 'bg-[#03070d]',
    contactAccent: 'text-[#7cc7ff]'
  }
}

const activeTheme = ref<keyof typeof themes>('stellar')
const theme = computed(() => themes[activeTheme.value])
const selectedDetail = ref<{
  eyebrow: string
  title: string
  description?: string
  items: string[]
} | null>(null)

function openDetail(detail: typeof selectedDetail.value) {
  selectedDetail.value = detail
}

const services = [
  {
    id: '01',
    label: 'PRODUCTOS DIGITALES',
    title: 'Productos Digitales',
    description:
      'Biblioteca de plantillas y herramientas empresariales listas para usar, con opciones personalizadas.',
    items: [
      'Plan de Negocios',
      'Presentación de Revisión de Negocio',
      'Pronóstico de Capacidad',
      'Plan de Acción Correctiva',
      'Plan de Desarrollo',
      'Ledger Financiero',
      'Control de Inventario',
      'Descripción de Puesto',
      'Tablero de KPIs',
      'Manual Operativo',
      'Planes de Precios',
      'eMenus',
      'Acuerdo Operativo + Resoluciones Clave + Ledger de Miembros',
      'Plan de Mejora del Desempeño',
      'Playbook',
      'Política Interna',
      'Tarjeta de Evaluación',
      'Scorecard',
      'Procedimiento Operativo Estándar (SOP)',
      'Glidepath de Capacitación'
    ]
  },
  {
    id: '02',
    label: 'MARKETING & ADVERTISEMENT',
    title: 'Marketing & Advertisement',
    description:
      'Soluciones de marca, producción creativa y presencia digital con claridad, consistencia y escala.',
    items: [
      'Gestión de Campañas Publicitarias',
      'Producción Audiovisual (AVP)',
      'Estrategia de Marca + Identidad Visual + Branding Guidelines',
      'Diseño Gráfico',
      'Fotografía Profesional',
      'Diseño de Sitios Web'
    ]
  },
  {
    id: '03',
    label: 'APOYO EMPRESARIAL & OPERATIVO',
    title: 'Apoyo Empresarial & Operativo',
    description:
      'Consultoría, ejecución por proyectos y liderazgo fraccional para construir sistemas sostenibles.',
    items: [
      'Sesion de Desarrollo de Liderazgo 1:1',
      'Asterope Sistema Operativo (AOS) - Potenciado por MS 365',
      'Soporte para Preparación de Auditorias',
      'Servicios de Incorporación de Empresas',
      'Consultoría',
      'Revisión de Arquitectura de Documentación',
      'Diseño de Intranet',
      'Taller de Desarrollo de Liderazgo',
      'Marco de Medición del Desempeño',
      'Marco de Monitoreo de Calidad',
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Auditoria del Ciclo de Ingresos (Sector Salud)',
      'Análisis de Causa Raíz + Plan de Remediación Integral',
      'Planificación de Sucesion',
      'Desarrollo de Contenido de Capacitación',
      'Marco de Capacitación',
      'Diseño de Sitio Web + Tarifa Anual de Hosting',
      'Membresía Anual'
    ]
  }
]

const packages = [
  {
    id: '01',
    title: 'Formación de Empresas',
    tagline: 'ASTEROPE MULTIVERSO',
    items: [
      'Consultoría',
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Servicios de Incorporación de Empresas',
      'Plan de Negocios',
      'Estrategia de Marca + Identidad Visual',
      'Diseño de Sitio Web + Hosting',
      'Asterope Sistema Operativo (AOS)',
      'Revisión de Arquitectura de Documentación',
      'Diseño de Intranet'
    ]
  },
  {
    id: '02',
    title: 'Membresía Anual',
    tagline: 'ASTEROPE UNIVERSO',
    items: [
      'Hasta 80 horas de consultoria en el año',
      '2 servicios basados en proyectos',
      'Diseño de Sitio Web + Hosting en membresia inicial',
      'Tarifa anual de hosting en renovaciones'
    ]
  },
  {
    id: '03',
    title: 'Crecimiento Empresarial',
    tagline: 'ASTEROPE GALAXIA',
    items: [
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Plan de Crecimiento de Negocio',
      'Pronóstico de Capacidad',
      'Control de Inventario',
      'Presentación de Revisión de Negocio',
      'Planificación de Sucesion'
    ]
  },
  {
    id: '04',
    title: 'Mejoramiento de RCM',
    tagline: 'ASTEROPE SISTEMA',
    items: [
      'Consultoría',
      'Auditoria del Ciclo de Ingresos (Sector Salud)',
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Análisis de Causa Raíz + Plan de Remediación Integral',
      'Marco de Monitoreo de Calidad',
      'Sesion de Desarrollo de Liderazgo 1:1'
    ]
  },
  {
    id: '05',
    title: 'Remediación Organizacional',
    tagline: 'ASTEROPE ORBITA',
    items: [
      'Consultoría',
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Análisis de Causa Raíz + Plan de Remediación Integral',
      'Marco de Medición del Desempeño',
      'Marco de Monitoreo de Calidad',
      'Tarjeta de Evaluación',
      'Plan de Acción Correctiva'
    ]
  },
  {
    id: '06',
    title: 'Marco de Capacitación',
    tagline: 'ASTEROPE PILAR',
    items: [
      'Consultoría',
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Procedimiento Operativo Estándar (SOP)',
      'Apoyo para Desarrollo de Contenido de Capacitación',
      'Glidepath de Capacitación',
      'Taller de Desarrollo de Liderazgo',
      'Scorecard'
    ]
  },
  {
    id: '07',
    title: 'Incorporación de Empresas',
    tagline: 'ASTEROPE UMBRAL',
    items: [
      'Consultoría',
      'Diagnóstico y Plan de Remediación de Alto Nivel',
      'Servicios de Incorporación de Empresas',
      'Acuerdo Operativo + Resoluciones Clave + Ledger de Miembros',
      'Ledger Financiero',
      'Binder Corporativo',
      'Sello Corporativo'
    ]
  }
]
</script>

<template>
  <main class="min-h-screen transition-colors duration-300" :class="[theme.page, theme.primary]">
    <nav class="fixed inset-x-0 top-0 z-50 border-b backdrop-blur transition-colors duration-300" :class="theme.nav">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href="#" class="flex items-center gap-3">
          <img src="/logo-mini.jpg" alt="Asterope" class="h-10 w-10 rounded-md object-cover" />
          <span class="font-mono text-xs font-semibold uppercase tracking-[0.24em]">Asterope</span>
        </a>
        <div class="hidden items-center gap-8 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] md:flex" :class="theme.muted">
          <a href="#services" class="hover:opacity-70">Soluciones</a>
          <a href="#packages" class="hover:opacity-70">Paquetes</a>
          <a href="#diagnostico" :class="theme.accent">Contacto</a>
          <NuxtLink to="/dashboard" class="hover:opacity-70">Dashboard</NuxtLink>
          <div class="flex rounded-md border p-1" :class="theme.border">
            <button
              v-for="(item, key) in themes"
              :key="key"
              type="button"
              class="rounded px-2 py-1 transition"
              :class="activeTheme === key ? [theme.button] : 'opacity-70 hover:opacity-100'"
              @click="activeTheme = key"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <section class="relative overflow-hidden border-b pt-20 transition-colors duration-300" :class="theme.border">
      <img
        src="/pleiades-nebula.jpg"
        alt=""
        class="pointer-events-none absolute -right-28 -top-24 w-[520px] opacity-25 mix-blend-multiply md:w-[740px]"
        style="mask-image: radial-gradient(circle at center, black 30%, transparent 70%)"
      />
      <div class="relative mx-auto grid min-h-[72vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <div>
          <p class="font-mono text-xs font-medium uppercase tracking-[0.3em]" :class="theme.accent">
            Claridad · Alineación · Rendimiento Estelar
          </p>
          <h1 class="mt-6 max-w-3xl text-balance text-4xl font-light leading-[1.08] tracking-normal md:text-6xl lg:text-7xl">
            Ecosistema de <span class="font-semibold">Negocios</span> y Operaciones
          </h1>
          <p class="mt-7 max-w-[56ch] text-base leading-8 md:text-lg" :class="theme.muted">
            Consultoría, herramientas y apoyo práctico para empresas en crecimiento, operaciones complejas e industrias reguladas.
          </p>
          <div class="mt-10 flex flex-wrap gap-4">
            <a href="#diagnostico" class="rounded-md px-8 py-4 font-mono text-xs font-medium uppercase tracking-widest transition" :class="theme.button">
              Diagnóstico Estratégico
            </a>
            <a href="#services" class="rounded-md border px-8 py-4 font-mono text-xs font-medium uppercase tracking-widest transition" :class="theme.outline">
              Ver Soluciones
            </a>
          </div>
        </div>
        <div class="hidden justify-center md:flex">
          <img
            src="/logo-full.jpeg"
            alt="Asterope Consulting LLC"
            class="aspect-square w-80 rounded-full object-cover lg:w-[26rem]"
            style="mask-image: radial-gradient(circle at center, black 52%, transparent 78%)"
          />
        </div>
      </div>
    </section>

    <section id="services" class="border-b py-16 transition-colors duration-300 md:py-20" :class="[theme.border, theme.soft]">
      <div class="mx-auto max-w-7xl px-6 md:px-8">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.3em]" :class="theme.accent">Lo Que Hacemos</p>
        <h2 class="mt-3 text-3xl font-light md:text-4xl">
          Productos por <span class="font-semibold">Línea de Servicio</span>
        </h2>
        <div class="mt-10 grid gap-px overflow-hidden rounded-lg border md:grid-cols-3" :class="[theme.border, theme.border]">
          <article v-for="service in services" :key="service.id" class="p-7 transition-colors duration-300 md:p-8" :class="theme.panel">
            <p class="font-mono text-[0.68rem] uppercase tracking-[0.18em]" :class="theme.muted">
              {{ service.id }} / {{ service.label }}
            </p>
            <h3 class="mt-5 text-xl font-semibold">{{ service.title }}</h3>
            <p class="mt-4 min-h-20 text-sm leading-7" :class="theme.muted">{{ service.description }}</p>
            <button
              type="button"
              class="mt-5 flex w-full items-center justify-between gap-3 border-t pt-4 text-left font-mono text-[0.68rem] uppercase tracking-[0.18em]"
              :class="[theme.border, theme.accent]"
              @click="openDetail({ eyebrow: `${service.id} / ${service.label}`, title: service.title, description: service.description, items: service.items })"
            >
              <span>
                Ver lista
              </span>
              <span aria-hidden="true">+</span>
            </button>
          </article>
        </div>
      </div>
    </section>

    <section id="packages" class="border-b py-16 transition-colors duration-300 md:py-20" :class="theme.border">
      <div class="mx-auto max-w-7xl px-6 md:px-8">
        <div class="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p class="font-mono text-xs font-medium uppercase tracking-[0.3em]" :class="theme.accent">Paquetes de Servicio</p>
            <h2 class="mt-3 text-3xl font-light md:text-4xl">
              Paquetes de <span class="font-semibold">Servicio</span>
            </h2>
          </div>
          <a href="#diagnostico" class="font-mono text-xs uppercase tracking-[0.18em]" :class="theme.accent">
            Solicitar diagnóstico
          </a>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="pack in packages" :key="pack.id" class="rounded-lg border p-6 transition hover:shadow-glow" :class="[theme.border, theme.card]">
            <div class="flex items-start justify-between gap-4">
              <p class="font-mono text-[0.68rem] uppercase tracking-[0.18em]" :class="theme.muted">
                {{ pack.id }} / Paquete
              </p>
              <p class="text-right font-mono text-[0.62rem] uppercase tracking-[0.14em]" :class="theme.accent">
                {{ pack.tagline }}
              </p>
            </div>
            <h3 class="mt-5 text-lg font-semibold">{{ pack.title }}</h3>
            <button
              type="button"
              class="mt-5 flex w-full items-center justify-between gap-3 border-t pt-4 text-left font-mono text-[0.68rem] uppercase tracking-[0.18em]"
              :class="[theme.border, theme.accent]"
              @click="openDetail({ eyebrow: `${pack.id} / ${pack.tagline}`, title: pack.title, items: pack.items })"
            >
              <span>
                Incluye
              </span>
              <span aria-hidden="true">+</span>
            </button>
          </article>
        </div>
      </div>
    </section>

    <section id="diagnostico" class="py-16 transition-colors duration-300 md:py-20" :class="theme.contact">
      <div class="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-8">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.24em]" :class="theme.contactAccent">Póngase En Contacto</p>
          <h2 class="mt-4 text-4xl font-light tracking-normal text-white md:text-5xl">
            ¿Listo para la <span class="font-semibold">claridad?</span>
          </h2>
          <p class="mt-6 max-w-md leading-8 text-white/60">
            Aceptamos un número limitado de proyectos de alto impacto por trimestre para garantizar precisión.
          </p>
        </div>
        <LeadForm />
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="selectedDetail"
        class="fixed inset-0 z-[80] grid place-items-center bg-black/65 px-4 py-6 backdrop-blur-sm"
        @click.self="selectedDetail = null"
      >
        <section
          class="w-full max-w-3xl overflow-hidden rounded-lg border shadow-2xl transition-colors duration-300"
          :class="[theme.card, theme.border, theme.primary]"
        >
          <div class="flex items-start justify-between gap-6 border-b p-5 md:p-6" :class="theme.border">
            <div>
              <p class="font-mono text-[0.68rem] uppercase tracking-[0.2em]" :class="theme.accent">
                {{ selectedDetail.eyebrow }}
              </p>
              <h3 class="mt-3 text-2xl font-semibold">{{ selectedDetail.title }}</h3>
              <p v-if="selectedDetail.description" class="mt-3 max-w-2xl text-sm leading-7" :class="theme.muted">
                {{ selectedDetail.description }}
              </p>
            </div>
            <button
              type="button"
              class="grid h-9 w-9 shrink-0 place-items-center rounded-md border font-mono text-lg leading-none transition hover:opacity-70"
              :class="[theme.border, theme.accent]"
              aria-label="Cerrar"
              @click="selectedDetail = null"
            >
              x
            </button>
          </div>
          <div class="max-h-[62vh] overflow-y-auto p-5 md:p-6">
            <ul class="grid gap-2 md:grid-cols-2">
              <li
                v-for="item in selectedDetail.items"
                :key="item"
                class="rounded-md border px-3 py-2 text-sm leading-6"
                :class="[theme.border, theme.muted]"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="flex justify-end border-t p-4" :class="theme.border">
            <a
              href="#diagnostico"
              class="rounded-md px-5 py-3 font-mono text-xs font-medium uppercase tracking-widest transition"
              :class="theme.button"
              @click="selectedDetail = null"
            >
              Solicitar diagnóstico
            </a>
          </div>
        </section>
      </div>
    </Teleport>
  </main>
</template>
