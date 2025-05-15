import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from './tipo-mutacoes';
import IProjeto from '@/interfaces/IProjeto';

interface Estado {
  projetos: IProjeto[]
}

export const keyProjeto: InjectionKey<Store<Estado>> = Symbol();

export const storeProjeto = createStore<Estado>({
  state: {
    projetos: []  
  },
  mutations: {
    [ADICIONA_PROJETO] (state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO] (state, projeto: IProjeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO] (state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id !== id);
    }
  }
})

export function useStoreProjeto(): Store<Estado> {
  return useStore(keyProjeto);
}