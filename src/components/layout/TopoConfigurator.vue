<script setup lang="ts">
import { useConfigurationStore } from '@/stores/configuration'
import { useGameStore } from '@/stores/game'
import { computed, ref } from 'vue'

const isOpen = ref(false)

const quantity = computed(() => {
  return useConfigurationStore().quantity
})

const updateQuantity = (event: Event) => {
  useConfigurationStore().setQuantity(parseInt((event.target as HTMLInputElement).value))
}

const difficulty = computed(() => {
  return useConfigurationStore().difficulty
})

const difficultyText = computed(() => {
  return useConfigurationStore().DIFFICULTY_OPTIONS[difficulty.value].text
})

const updateDifficulty = (event: Event) => {
  useConfigurationStore().setDifficulty(parseInt((event.target as HTMLSelectElement).value))
}

const openConfigurator = () => {
  useGameStore().stopGame()
  isOpen.value = true
}
</script>

<template>
  <button type="button" class="configurator-button" @click="openConfigurator">
    <span class="sr-only">Open Configuration</span>
    <span class="icon-gear"></span>
  </button>
  <section class="configurator" :class="{ open: isOpen }">
    <button type="button" class="close-button" @click="isOpen = !isOpen">Close</button>
    <h2 class="title">Configurator</h2>
    <ul class="option-list">
      <li class="option-item">
        <label class="range-label" for="difficulty">Difficulty</label>
        <span class="range-value">{{ difficultyText }}</span>
        <input
          class="range-input"
          name="difficulty"
          id="difficulty"
          type="range"
          min="0"
          max="2"
          :value="difficulty"
          @input="updateDifficulty"
        />
      </li>
      <li class="option-item">
        <label class="range-label" for="quantity">Quantity</label>
        <span class="range-value">{{ quantity }}</span>
        <input
          class="range-input"
          name="quantity"
          id="quantity"
          type="range"
          min="1"
          max="3"
          :value="quantity"
          @input="updateQuantity"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.configurator-button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--secondary-color);
  background-color: var(--secondary-color);
  font-family: var(--font-inter);
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    font-weight 0.3s;
}
.icon-gear {
  flex-grow: 0;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--primary-color);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-image: url(@/assets/img/gear.svg);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  mask-image: url(@/assets/img/gear.svg);
  transition: background-color 0.3s;
}

.configurator-button:hover {
  background-color: var(--primary-color);
}
.configurator-button:hover .icon-gear {
  background-color: var(--secondary-color);
}
.configurator {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background-color: var(--primary-color);
  z-index: 1;
  transition: left 0.3s;
}
.configurator.open {
  left: 0;
}
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--secondary-color);
  background-color: var(--secondary-color);
  font-family: var(--font-inter);
  color: var(--primary-color);
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    font-weight 0.3s;
}
.close-button:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-weight: bold;
}
.title {
  margin-top: 4rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--secondary-color);
  text-align: center;
  font-size: 3rem;
  line-height: 0.6;
  text-transform: uppercase;
}
.option-list {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
}
.option-item {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem 0;
  font-family: var(--font-inter);
}
.range-input {
  width: 100%;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
