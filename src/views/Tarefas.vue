<template>
  <div class="tarefas">
    <h1 class="title">Tarefas</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tarefas'
});
</script>

<style scoped>
.tarefas {
  padding: 1.25rem;
}
</style>