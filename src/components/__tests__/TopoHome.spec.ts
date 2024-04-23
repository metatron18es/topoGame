import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useConfigurationStore } from '@/stores/configuration'
import TopoHome from '@/components/TopoHome.vue'
import { createPinia, setActivePinia } from 'pinia'
import router from '@/router/router'
import { useRouter } from 'vue-router'

vi.mock('vue-router')

describe('Home Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.clearAllMocks()
    vi.mocked(useRouter).mockReturnValue({
      ...router,
      push: vi.fn()
    })
  })
  it('starts the game with valid name', async () => {
    const wrapper = mount(TopoHome)

    // Set a valid name
    await wrapper.find('input').setValue('John Doe')

    // Submit the form
    await wrapper.find('form').trigger('submit')

    // Ensure the name is set in the store
    expect(useConfigurationStore().name).toBe('John Doe')

    // Ensure router.push is called with correct arguments
    expect(useRouter().push).toHaveBeenCalledWith({ name: 'game' })
  })

  it('displays error message with empty name', async () => {
    const wrapper = mount(TopoHome)

    // Submit the form without entering a name
    await wrapper.find('form').trigger('submit')

    // Ensure error message is displayed
    expect(wrapper.html()).toContain('Please enter your name')

    // Ensure name is not set in the store
    expect(useConfigurationStore().name).toBe('')
  })
})
