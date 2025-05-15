import { InjectionKey } from 'vue';
import { createStore, Store, useStore } from 'vuex';
import { NOTIFICAR } from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';

interface Estado {
  notificacoes: INotificacao[]
}

export const keyNotificacao: InjectionKey<Store<Estado>> = Symbol();

export const storeNotificacao = createStore<Estado>({
  state: {
    notificacoes: []    
  },
  mutations: {
    [NOTIFICAR] (state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
      }, 3000);

    }
  }
})

export function useStoreNotificacao(): Store<Estado> {
  return useStore(keyNotificacao);
}
