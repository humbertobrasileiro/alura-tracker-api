<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from './Cronometro.vue'

export default defineComponent({
  name: "Temporizador",
  emits: ['aoFinalizarTarefa'],
  components: {
    Cronometro
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometroRodando: false,
      cronometro: null as ReturnType<typeof setInterval> | null
    }
  },
  methods: {
    iniciar(): void {
      // começar a contagem
      // 1 seg = 1000 ms
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      this.$emit('aoFinalizarTarefa', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
      this.cronometroRodando = false
      if (this.cronometro) {
        clearInterval(this.cronometro);
        this.cronometro = null;
      }
    }
  }
});
</script>

<style scoped>
.button {
  margin-left: 8px;
}
</style>