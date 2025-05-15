import ITarefa from '@/interfaces/ITarefa';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import { ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA } from './tipo-mutacoes';

interface Estado {
  tarefas: ITarefa[]
}

export const keyTarefa: InjectionKey<Store<Estado>> = Symbol();

export const storeTarefa = createStore<Estado>({
  state: {
    tarefas: []
  },
  mutations: {
    [ADICIONA_TAREFA] (state, minhaTarefa: ITarefa) {
      const tarefa = {
        id: minhaTarefa.id,
        duracaoEmSegundos: minhaTarefa.duracaoEmSegundos,
        descricao: minhaTarefa.descricao,
        projeto: minhaTarefa.projeto
      } as ITarefa;
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA] (state, minhaTarefa: ITarefa) {
      const index = state.tarefas.findIndex(tarefa => tarefa.id === minhaTarefa.id);
      state.tarefas[index] = minhaTarefa;
    },
    [EXCLUIR_TAREFA] (state, id: string) {
      state.tarefas = state.tarefas.filter(tarefa => tarefa.id !== id);
    }
  }
})

export function useStoreTarefa(): Store<Estado> {
  return useStore(keyTarefa);
}