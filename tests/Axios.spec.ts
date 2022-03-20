/*
import { mount } from '@vue/test-utils'
import Axios from '../src/views/Axios.vue'

test('Axios.vue', async () => {
  const wrapper = mount(Axios)
  expect(wrapper.html()).toContain('Список пользователей')
  await wrapper.find('el-button').trigger('click')
})
*/


import { mount } from '@vue/test-utils'
// @ts-ignore
import Axios from '../src/views/Axios.vue'

describe('Axios.vue', () => {
  it('renders', () => {
    const wrapper = mount(Axios)
    expect(wrapper.html()).toContain('Список пользователей')
  })
})
