import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import roteador from './roteador'
import { keyProjeto, storeProjeto } from './store/projeto-store'
import { keyTarefa, storeTarefa } from './store/tarefa-store'
import { keyNotificacao, storeNotificacao } from './store/notificacoes-store'

createApp(App)
  .use(roteador)
  .use(storeProjeto, keyProjeto)
  .use(storeTarefa, keyTarefa)
  .use(storeNotificacao, keyNotificacao)
  .mount('#app')
