<template>
  <div class="notificacoes">
    <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes"
      :key="notificacao.id">
      <div class="message-header">
        {{ notificacao.titulo }}
      </div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStoreNotificacao } from '@/store/notificacoes-store';

export default defineComponent({
  name: 'Notificacoes',
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.ATENCAO]: 'is-warning',
        [TipoNotificacao.FALHA]: 'is-danger',
      }
    }
  },
  setup() {
    const storeNotificacao = useStoreNotificacao();
    return {
      notificacoes: computed(() => storeNotificacao.state.notificacoes),
      storeNotificacao
    }
  }
})
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>