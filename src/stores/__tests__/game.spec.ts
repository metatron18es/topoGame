import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useGameStore } from '@/stores/game'

describe('useGameStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should check if topo is active', () => {
    const gameStore = useGameStore()
    gameStore.activeTopo = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    expect(gameStore.isTopoActive(1)).toBe(true)
    expect(gameStore.isTopoActive(9)).toBe(true)
    expect(gameStore.isTopoActive(10)).toBe(false)
  })

  it('should set the score correctly', () => {
    const gameStore = useGameStore()
    gameStore.setScore(10)

    expect(gameStore.score).toBe(10)
    expect(gameStore.score).not.toBe(0)
  })

  it('should increment the score correctly', () => {
    const gameStore = useGameStore()
    gameStore.incrementScore(10)

    expect(gameStore.score).toBe(10)
    expect(gameStore.score).not.toBe(0)

    gameStore.incrementScore(10)

    expect(gameStore.score).toBe(20)
    expect(gameStore.score).not.toBe(10)
  })

  it('should set the game started flag correctly', () => {
    const gameStore = useGameStore()
    gameStore.setGameStarted(true)

    expect(gameStore.isGameStarted).toBe(true)
    expect(gameStore.isGameStarted).not.toBe(false)

    gameStore.setGameStarted(false)

    expect(gameStore.isGameStarted).toBe(false)
    expect(gameStore.isGameStarted).not.toBe(true)
  })

  it('should add a new topo correctly', () => {
    const gameStore = useGameStore()
    gameStore.activeTopo = [1, 2, 3]

    gameStore.newTopo()

    expect(gameStore.activeTopo).toHaveLength(3)
    expect(gameStore.activeTopo[2]).toBeGreaterThanOrEqual(0)
    expect(gameStore.activeTopo[2]).toBeLessThanOrEqual(9999)

    gameStore.newTopo(3)
    expect(gameStore.activeTopo).toHaveLength(3)
    expect(gameStore.activeTopo[2]).not.toBe(3)
    expect(gameStore.activeTopo[2]).toBeGreaterThanOrEqual(0)
    expect(gameStore.activeTopo[2]).toBeLessThanOrEqual(9999)
  })

  it('should start the topo sequence correctly', async () => {
    const gameStore = useGameStore()

    gameStore.startTopo(5, 100)

    await new Promise((resolve) => setTimeout(resolve, 500))

    expect(gameStore.activeTopo).toHaveLength(5)
    expect(gameStore.activeTopo).toEqual(
      expect.arrayContaining([
        expect.any(Number),
        expect.any(Number),
        expect.any(Number),
        expect.any(Number),
        expect.any(Number)
      ])
    )
  })

  it('should stop the game correctly', () => {
    const gameStore = useGameStore()
    gameStore.activeTopo = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    gameStore.stopGame()

    expect(gameStore.activeTopo).toHaveLength(0)
    expect(gameStore.isGameStarted).toBe(false)
  })
})
