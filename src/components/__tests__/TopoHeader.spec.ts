import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TopoHeader from '@/components/layout/TopoHeader.vue';
import TopoConfigurator from '@/components/layout/TopoConfigurator.vue';
import { useConfigurationStore } from '@/stores/configuration';
import { setActivePinia, createPinia } from 'pinia';

describe('TopoHeader Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });

  it('renders the title', async () => {
    useConfigurationStore().name = 'John Doe';
    const wrapper = mount(TopoHeader);

    expect(wrapper.find('.title').text()).toBe('Topo Game');
  });

  it('renders the player name', async () => {
    useConfigurationStore().name = 'John Doe';
    const wrapper = mount(TopoHeader);

    expect(wrapper.find('.player-name').text()).toBe('John Doe');
  });

  it('renders the TopoConfigurator component', async () => {
    const wrapper = mount(TopoHeader);

    expect(wrapper.findComponent(TopoConfigurator).exists()).toBe(true);
  });
});