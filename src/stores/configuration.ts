import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigurationStore = defineStore('configuration', () => {
  const name = ref('')
  const difficulty = ref(0)
  const quantity = ref(1)

  const DIFFICULTY_OPTIONS = [
    { value: 0, text: 'Easy', time: 1000, score: 10 },
    { value: 1, text: 'Medium', time: 750, score: 20 },
    { value: 2, text: 'Hard', time: 500, score: 30 }
  ]

  const difficultyValue = computed(() => {
    return DIFFICULTY_OPTIONS[difficulty.value]
  })

  const time = computed(() => {
    return difficultyValue.value.time
  })

  const increment = computed(() => {
    return difficultyValue.value.score
  })

  const setName = (value: string) => {
    name.value = value
  }
  const setDifficulty = (value: number) => {
    difficulty.value = value
  }
  const setQuantity = (value: number) => {
    quantity.value = value
  }

  return {
    name,
    setName,
    difficulty,
    quantity,
    setDifficulty,
    setQuantity,
    increment,
    time,
    DIFFICULTY_OPTIONS
  }
})
