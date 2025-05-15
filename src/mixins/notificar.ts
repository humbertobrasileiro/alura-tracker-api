import { TipoNotificacao } from '@/interfaces/INotificacao';
import { storeNotificacao } from '@/store/notificacoes-store';
import { NOTIFICAR } from '@/store/tipo-mutacoes';

export const NotificacaoMixin = {
  methods: {
    notificar(tipo: TipoNotificacao, titulo: string, texto: string) : void {
      storeNotificacao.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
      });
    }
  },
}