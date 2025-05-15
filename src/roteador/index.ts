import Home from '@/views/Home.vue';
import Projetos from '@/views/Projetos.vue';
import FormularioProjetos from '@/views/Projetos/FormularioProjetos.vue';
import ListaProjetos from '@/views/Projetos/ListaProjetos.vue';
import Tarefas from '@/views/Tarefas.vue';
import FormularioTarefas from '@/views/Tarefas/FormularioTarefas.vue';
import ListaTarefas from '@/views/Tarefas/ListaTarefas.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tarefas',
    component: Tarefas,
    children: [
      {
        path: '',
        name: 'Tarefas',
        component: ListaTarefas
      },
      {
        path: 'novo',
        name: 'Nova tarefa',
        component: FormularioTarefas
      },
      {
        path: ':id',
        name: 'Editar tarefa',
        component: FormularioTarefas,
        props: true
      }
    ]
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: ListaProjetos
      },
      {
        path: 'novo',
        name: 'Novo projeto',
        component: FormularioProjetos
      },
      {
        path: ':id',
        name: 'Editar projeto',
        component: FormularioProjetos,
        props: true
      }
    ]
  },
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
});

export default roteador;