<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStoreProjeto } from '@/store/projeto-store';
import { useStoreNotificacao } from '@/store/notificacoes-store';
import IProjeto from '@/interfaces/IProjeto';
import { ALTERA_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: 'FormularioProjetos',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.storeProjeto.state.projetos.find((proj: IProjeto) => proj.id == this.id)
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjeto: '' as string,
      storeProjeto: useStoreProjeto(),
      storeNotificacao: useStoreNotificacao()
    }
  },
  methods: {
    salvar(): void {
      if (this.id) {
        this.storeProjeto.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        });
      } else {
        this.storeProjeto.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = '';

      this.storeNotificacao.commit(NOTIFICAR, {
        titulo: 'Novo projeto foi salvo',
        texto: 'Prontinho :) seu projeto já está disponível.',
        tipo: TipoNotificacao.SUCESSO
      });

      this.$router.push('/projetos')
    }
  }
})
</script>
