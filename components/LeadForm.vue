<script setup lang="ts">
import { computed } from 'vue'

const config = useRuntimeConfig()
const intakeFormUrl = computed(() => config.public.intakeFormUrl)

const processSteps = [
  ['01', 'Consulta inicial', 'Conversación sin costo para conocer su negocio.'],
  ['02', 'Diagnóstico y plan de trabajo', 'Evaluación a fondo y hoja de ruta a la medida.'],
  ['03', 'Ejecución', 'Implementación con acompañamiento y resultados medibles.']
]
</script>

<template>
  <div class="rounded-lg border border-white/10 bg-white/5 p-7 shadow-glow backdrop-blur md:p-10">
    <p class="font-mono text-xs font-medium uppercase tracking-[0.24em] text-cyan">
      Microsoft Forms Intake
    </p>
    <h3 class="mt-4 text-2xl font-light tracking-normal text-white md:text-3xl">
      Comencemos su <span class="font-semibold">consulta</span>
    </h3>
    <p class="mt-5 leading-7 text-white/60">
      Complete el formulario oficial de Asterope y nuestro equipo revisará su contexto antes de programar la conversación inicial.
    </p>

    <a
      :href="intakeFormUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-7 inline-flex items-center gap-2 rounded-md bg-cyan px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-void transition hover:bg-signal"
    >
      Solicitar consulta
      <span aria-hidden="true">→</span>
    </a>

    <div class="mt-9 w-full">
      <p class="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
        Nuestro proceso
      </p>
      <ol class="space-y-5">
        <li v-for="[step, title, description] in processSteps" :key="step" class="flex gap-4">
          <div class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cyan font-mono text-[0.68rem] font-semibold text-void">
            {{ step }}
          </div>
          <div>
            <p class="font-medium tracking-normal text-white">{{ title }}</p>
            <p class="mt-1 text-sm leading-6 text-white/55">{{ description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
