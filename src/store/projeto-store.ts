import { DEFINIR_PROJETOS } from './../../.history/src/store/tipo-mutacoes_20250515100006';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from './tipo-mutacoes';
import IProjeto from '@/interfaces/IProjeto';
import { CADASTRAR_PROJETO, DELETAR_PROJETO, EDITAR_PROJETO, OBTER_PROJETOS } from './tipo-acoes';
import http from '@/http';

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
    [DEFINIR_PROJETOS] (state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [EXCLUIR_PROJETO] (state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id !== id);
    }
  },
  actions: {
    [OBTER_PROJETOS] ({ commit }) {
      http.get('projetos')
        .then(resposta => commit(DEFINIR_PROJETOS, resposta.data));
    },
    [CADASTRAR_PROJETO] (contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        nome: nomeDoProjeto
      })
    },
    [EDITAR_PROJETO] (contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [DELETAR_PROJETO] ({ commit }, id: string) {
      return http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    }
  }
})

export function useStoreProjeto(): Store<Estado> {
  return useStore(keyProjeto);
}