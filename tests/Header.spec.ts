import { mount } from '@vue/test-utils'
import Header from '../src/views/Axios.vue'

describe('Axios.vue', () => {
  it('renders', () => {
    const wrapper = mount(Header)
    expect(wrapper.html())
  })
})
