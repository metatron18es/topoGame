import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TopoConfigurator from '@/components/layout/TopoConfigurator.vue'
import { useConfigurationStore } from '@/stores/configuration'
import { useGameStore } from '@/stores/game'
import { setActivePinia, createPinia } from 'pinia'

describe('TopoConfigurator Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useConfigurationStore().setQuantity(2)
    useConfigurationStore().setDifficulty(1)
  })

  it('opens the configurator', async () => {
    const wrapper = mount(TopoConfigurator)

    const button = wrapper.find('.configurator-button')
    await button.trigger('click')

    expect(useGameStore().isGameStarted).toBe(false)
    const wrapperCast = wrapper.vm as unknown as {
      isOpen: boolean
    }

    expect(wrapperCast.isOpen).toBe(true)
  })

  it('updates quantity when input changes', async () => {
    const wrapper = mount(TopoConfigurator)

    const quantityInput = wrapper.find('.range-input[name="quantity"]')
    await quantityInput.setValue(3)

    expect(useConfigurationStore().quantity).toBe(3)
  })

  it('updates difficulty when select changes', async () => {
    const wrapper = mount(TopoConfigurator)

    const difficultySelect = wrapper.find('.range-input[name="difficulty"]')
    await difficultySelect.setValue(0)

    expect(useConfigurationStore().difficulty).toBe(0)
  })

  it('closes the configurator when close button is clicked', async () => {
    const wrapper = mount(TopoConfigurator)

    const button = wrapper.find('.configurator-button')
    await button.trigger('click')

    const closeButton = wrapper.find('.close-button')
    await closeButton.trigger('click')

    const wrapperCast = wrapper.vm as unknown as {
      isOpen: boolean
    }

    expect(wrapperCast.isOpen).toBe(false)
  })
})
