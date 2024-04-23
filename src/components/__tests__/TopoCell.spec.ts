import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useGameStore } from '@/stores/game'
import TopoCell from '@/components/TopoCell.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('TopoCell Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers();
  });

  it('emits "close" event when topo is clicked and timer is active', async () => {
    const wrapper = mount(TopoCell, {
      props: {
        active: true,
        cell: 1
      }
    })

    const wrapperCast = wrapper.vm as unknown as {
      timerId: { value: number }
    }
    wrapperCast.timerId = { value: 123 }

    await wrapper.find('.cell').trigger('click')
    await nextTick()

    expect(useGameStore().score).toBe(10)
  })

  it('does not emit "close" event when topo is clicked and timer is not active', async () => {
    const wrapper = mount(TopoCell, {
      props: {
        active: false,
        cell: 1
      }
    })
  
    const wrapperCast = wrapper.vm as unknown as {
      timerId: { value: number } | null
    }
    wrapperCast.timerId = null
  
    await wrapper.find('.cell').trigger('click')
    await nextTick()
  
    expect(useGameStore().score).toBe(0) // Verificar que el score no cambie al hacer clic en el topo
  })

  it('emits "close" event when timer ends', async () => {
    const wrapper = mount(TopoCell, {
      props: {
        active: false,
        cell: 1
      }
    })
    
    wrapper.setProps({ active: true })
    await nextTick()
  
    const wrapperCast = wrapper.vm as unknown as {
      timerId: { value: number }
    }
    wrapperCast.timerId = { value: 123 } 
  
    vi.advanceTimersByTime(1000)
  
    await nextTick()
  
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits "close" event when active change to false', async () => {
    const wrapper = mount(TopoCell, {
      props: {
        active: true,
        cell: 1
      }
    })
    
    useGameStore().setGameStarted(true)
  
    const wrapperCast = wrapper.vm as unknown as {
      timerId: { value: number }
    }
    wrapperCast.timerId = { value: 123 } 

    wrapper.setProps({ active: false })
    await nextTick()
  
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
