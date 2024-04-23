import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const score = ref<number>(0)
  const activeTopo = ref<number[]>([])
  const isGameStarted = ref<boolean>(false)

  const isTopoActive = (cell: number) => {
    return activeTopo.value.includes(cell)
  }

  const setScore = (value: number) => {
    score.value = value
  }

  const incrementScore = (increment: number) => {
    score.value += increment
  }

  const setGameStarted = (value: boolean) => {
    isGameStarted.value = value
  }

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1
  }

  const newTopo = (cell: number | undefined = undefined) => {
    let newTopoNumber = generateRandomNumber()
    while (isTopoActive(newTopoNumber)) {
      newTopoNumber = generateRandomNumber()
    }
    if (cell) {
      activeTopo.value = activeTopo.value.filter((topo) => topo !== cell)
    } else {
      activeTopo.value.shift()
    }
    activeTopo.value.push(newTopoNumber)
  }

  const startTopo = (quantity: number, time: number) => {
    activeTopo.value = []
    const calculatedTime = time / quantity
    for (let i = 0; i < quantity; i++) {
      setTimeout(() => {
        let newTopoNumber = generateRandomNumber()
        while (isTopoActive(newTopoNumber)) {
          newTopoNumber = generateRandomNumber()
        }
        activeTopo.value.push(newTopoNumber)
      }, i * calculatedTime)
    }
  }

  const stopTopo = () => {
    activeTopo.value = []
  }

  const stopGame = () => {
    stopTopo()
    setGameStarted(false)
  }

  return {
    score,
    setScore,
    incrementScore,
    activeTopo,
    isTopoActive,
    isGameStarted,
    setGameStarted,
    newTopo,
    startTopo,
    stopGame
  }
})
