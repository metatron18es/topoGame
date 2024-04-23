import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import TopoGame from '@/components/TopoGame.vue'
import TopoCell from '@/components/TopoCell.vue'

import { useGameStore } from '@/stores/game'
import { createPinia, setActivePinia } from 'pinia'

describe('TopoGame', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders the component', () => {
    const wrapper = shallowMount(TopoGame)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the score', () => {
    const wrapper = shallowMount(TopoGame)
    expect(wrapper.find('.score').exists()).toBe(true)
  })

  it('renders the board', () => {
    const wrapper = shallowMount(TopoGame)
    expect(wrapper.findComponent(TopoCell).exists()).toBe(true)
  })

  it('renders the button', () => {
    const wrapper = shallowMount(TopoGame)
    expect(wrapper.find('.button').exists()).toBe(true)
  })

  it('starts the game when the button is clicked', async () => {
    const wrapper = shallowMount(TopoGame)
    const gameStore = useGameStore()
    await wrapper.find('.button').trigger('click')
    expect(gameStore.isGameStarted).toBe(true)
    expect(wrapper.find('.score').text()).toBe('Score: 0')
  })

  it('stops the game when the button is clicked twice', async () => {
    const wrapper = shallowMount(TopoGame)
    const gameStore = useGameStore()
    await wrapper.find('.button').trigger('click')
    await wrapper.find('.button').trigger('click')
    expect(gameStore.isGameStarted).toBe(false)
  })
})
