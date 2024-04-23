<script setup lang="ts">
import { computed } from 'vue'
import { useConfigurationStore } from '@/stores/configuration'
import TopoConfigurator from '@/components/layout/TopoConfigurator.vue'

const name = computed(() => {
  return useConfigurationStore().name
})
</script>

<template>
  <header class="header">
    <h1 class="title">Topo Game</h1>
    <h2 class="player-name">{{ name }}</h2>
    <TopoConfigurator />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0.5rem;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  line-height: 0.7;
}

.title {
  width: 100%;
  font-size: 3.5rem;
  text-align: center;
}

.player-name {
  font-size: 2.2rem;
}
.configurator-button {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--secondary-color);
  background: url('@/assets/img/gear.svg') no-repeat center;
  background-color: var(--secondary-color);
  font-family: var(--font-inter);
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    font-weight 0.3s;
}
</style>
