import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TopoMain from '@/components/layout/TopoMain.vue';

describe('TopoMain Component', () => {
  it('renders a slot', async () => {
    const wrapper = mount(TopoMain, {
      slots: {
        default: 'Hello, World!'
      }
    });

    expect(wrapper.text()).toContain('Hello, World!');
  });
});