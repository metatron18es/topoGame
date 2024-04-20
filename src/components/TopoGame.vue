<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TopoCell from './TopoCell.vue'

const score = ref<number>(0);
const interval = ref<number>(1000);
const activeTopo = ref<number>(-1);
const lastTopo = ref<number>(-1);
const lastTopoClicked = ref<number>(-1);

const isTopoActive = (cell: number) => {
  return cell === activeTopo.value
}

const topoClicked = (cell: number) => {
  if (isTopoActive(cell)) {
    if (cell !== lastTopoClicked.value) {
      score.value++;
      lastTopoClicked.value = cell;
    }
  }
}

function randomNumber(): number {
  return Math.floor(Math.random() * 9) + 1;
}

onMounted(() => {
  setInterval(() => {
    let newTopo = randomNumber();
    while (newTopo === lastTopo.value) {
      newTopo = randomNumber();
    }
    activeTopo.value = newTopo;
    lastTopo.value = newTopo;
  }, interval.value);
});

</script>

<template>
  <section class="game">
    <h2 class="score">Score: {{ score }}</h2>
    <article class="board">
      <TopoCell v-for="cell in 9" :key="cell" :class="{active: isTopoActive(cell)}" @click="topoClicked(cell)"/>
    </article>
  </section>
</template>

<style scoped>
  .score {
    text-align: center;
    font-size: 2rem;
  }
  .board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 2rem;
  }
</style>