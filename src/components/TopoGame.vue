<script setup lang="ts">
import { computed } from 'vue'
import TopoCell from '@/components/TopoCell.vue'

import { useConfigurationStore } from '@/stores/configuration'
import { useGameStore } from '@/stores/game'

const configurationStore = useConfigurationStore()
const gameStore = useGameStore()

const buttonText = computed(() => (gameStore.isGameStarted ? 'Stop Game' : 'Start Game'))
const score = computed(() => gameStore.score)
const isGameStarted = computed(() => gameStore.isGameStarted)

const startGame = () => {
  gameStore.setGameStarted(true)
  gameStore.setScore(0)
  gameStore.startTopo(configurationStore.quantity, configurationStore.time)
}

const stopGame = () => {
  gameStore.stopGame()
}

const handleGame = () => {
  if (isGameStarted.value) {
    stopGame()
  } else {
    startGame()
  }
}

const closeTopo = () => {
  gameStore.newTopo()
}
</script>

<template>
  <section class="game">
    <h2 class="score">Score: {{ score }}</h2>
    <article class="board">
      <TopoCell
        v-for="cell in 9"
        :key="cell"
        :cell="cell"
        :active="gameStore.isTopoActive(cell)"
        @close="closeTopo"
      />
    </article>
    <button type="button" class="button" @click="handleGame">{{ buttonText }}</button>
  </section>
</template>

<style scoped>
.game {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.score {
  text-align: center;
  font-size: 2rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  padding: 0.5rem 0;
  border-top: 1px solid var(--primary-color);
  border-bottom: 1px solid var(--primary-color);
}
.button {
  margin-top: 1rem;
}
</style>
