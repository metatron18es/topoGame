import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useConfigurationStore } from '@/stores/configuration'

describe('useConfigurationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should set the name correctly', () => {
    const configurationStore = useConfigurationStore()
    const name = 'John Doe'

    configurationStore.setName(name)

    expect(configurationStore.name).toBe(name)
  })

  it('should set the difficulty correctly', () => {
    const configurationStore = useConfigurationStore()
    const difficulty = 1

    configurationStore.setDifficulty(difficulty)

    expect(configurationStore.difficulty).toBe(difficulty)
  })

  it('should set the quantity correctly', () => {
    const configurationStore = useConfigurationStore()
    const quantity = 10

    configurationStore.setQuantity(quantity)

    expect(configurationStore.quantity).toBe(quantity)
  })

  it('should return the correct time value based on difficulty', () => {
    const configurationStore = useConfigurationStore()
    const difficulty = 1
    const expectedTime = 750

    configurationStore.setDifficulty(difficulty)

    expect(configurationStore.time).toBe(expectedTime)
  })

  it('should return the correct increment value based on difficulty', () => {
    const configurationStore = useConfigurationStore()
    const difficulty = 1
    const expectedIncrement = 20

    configurationStore.setDifficulty(difficulty)

    expect(configurationStore.increment).toBe(expectedIncrement)
  })
})
