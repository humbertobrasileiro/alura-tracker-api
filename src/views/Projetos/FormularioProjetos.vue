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
import IProjeto from '@/interfaces/IProjeto';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { CADASTRAR_PROJETO, EDITAR_PROJETO } from '@/store/tipo-acoes.ts';
import useNotificador from '@/hooks/notificador';

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
      storeProjeto: useStoreProjeto()
    }
  },
  methods: {
    salvar(): void {
      if (this.id) {
        this.storeProjeto.dispatch(EDITAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        }).then(() => this.lidarComSucesso('Projeto foi editado com sucesso'));
      } else {
        this.storeProjeto.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso('Projeto foi adicionado com sucesso'));
      }
    },
    lidarComSucesso(mensagem: string): void {
      this.nomeDoProjeto = '';
      const { notificar } = useNotificador();
      notificar(TipoNotificacao.SUCESSO, mensagem, 'Prontinho :) seu projeto já está disponível.');
      this.$router.push('/projetos')
    }
  }
})
</script>
