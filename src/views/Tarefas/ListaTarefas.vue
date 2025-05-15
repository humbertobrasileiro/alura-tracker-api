<template>
  <section class="lista">
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
    </Box>
    <router-link to="/tarefas/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Nova Tarefa</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Projeto</th>
          <th>Duração</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarefa in tarefas" :key="tarefa.id">
          <td>{{ tarefa.id }}</td>
          <td>{{ tarefa.descricao }}</td>
          <td>{{ tarefa.projeto?.nome || 'Sem projeto' }}</td>
          <td>{{ tarefa.duracaoEmSegundos }}</td>
          <td>
            <router-link :to="`/tarefas/${tarefa.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStoreTarefa } from '@/store/tarefa-store';
import { EXCLUIR_TAREFA } from '@/store/tipo-mutacoes';
import Box from '@/components/Box.vue';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
  name: 'ListaTarefas',
  components: {
    Box
  },
  setup() {
    const storeTarefa = useStoreTarefa();
    const { notificar } = useNotificador()

    const excluir = (id: string) => {
      storeTarefa.commit(EXCLUIR_TAREFA, id);
      notificar(TipoNotificacao.SUCESSO, 'Tarefa excluída com sucesso', 'Prontinho :) siga em frente com suas tarefas.');
    };

    return {
      tarefas: computed(() => storeTarefa.state.tarefas),
      semTarefas: computed(() => storeTarefa.state.tarefas.length === 0),
      excluir
    }
  }
});
</script>

<style scoped>
.lista {
  display: flex;
  flex-direction: column;
}
</style>
