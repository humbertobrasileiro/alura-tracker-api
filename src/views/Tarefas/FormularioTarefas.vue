<template>
  <div class="box">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para iniciar uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>
      <div class="column is-3 field">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o Projeto</option>
            <option v-for="projeto in projetos" :key="projeto.id" :value="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoFinalizarTarefa="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStoreTarefa } from '@/store/tarefa-store';
import { useStoreProjeto } from '@/store/projeto-store';
import { ALTERA_TAREFA, ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import Temporizador from '@/components/Temporizador.vue';
import IProjeto from '@/interfaces/IProjeto';
import ITarefa from '@/interfaces/ITarefa';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
  name: 'FormularioTarefas',
  components: {
    Temporizador
  },
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      descricao: '' as string,
      idProjeto: '' as string,
      mensagem: '' as string
    }
  },
  mounted() {
    if (this.id) {
      const tarefa = (this as any).storeTarefa.state.tarefas.find((t: ITarefa) => t.id == this.id)
      this.descricao = tarefa?.descricao || '';
      this.idProjeto = tarefa.projeto.id;
    }
  },
  methods: {
    salvarTarefa(tempoEmSegundos: number): void {
      if (this.id) {
        (this as any).storeTarefa.commit(ALTERA_TAREFA, {
          id: this.id,
          duracaoEmSegundos: tempoEmSegundos,
          descricao: this.descricao,
          projeto: (this as any).projetos.find((proj: IProjeto) => proj.id == this.idProjeto)
        });
        this.mensagem = 'Tarefa alterada com sucesso';
      } else {
        (this as any).storeTarefa.commit(ADICIONA_TAREFA, {
          id: new Date().toISOString(),
          duracaoEmSegundos: tempoEmSegundos,
          descricao: this.descricao,
          projeto: (this as any).projetos.find((proj: IProjeto) => proj.id == this.idProjeto)
        });
        this.mensagem = 'Tarefa incluída com sucesso';
      }

      this.descricao = '';

      (this as any).notificar(TipoNotificacao.SUCESSO, this.mensagem, 'Prontinho :) sua tarefa já está disponível.');

      this.$router.push('/tarefas');
    }
  },
  setup() {
    const storeTarefa = useStoreTarefa();
    const storeProjeto = useStoreProjeto();
    const { notificar } = useNotificador()
    return {
      storeTarefa,
      storeProjeto,
      projetos: computed(() => storeProjeto.state.projetos),
      notificar
    }
  }
})
</script>

<style scoped>
.box {
  background-color: var(--bg-primario);
  color: var(--texto-primario)
}
</style>
