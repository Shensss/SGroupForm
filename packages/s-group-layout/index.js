import layout from './src/styled/layout.js'
import item from './src/styled/item'

layout.install = function (Vue) {
    Vue.component('layout', layout)
    Vue.component('item', item)
}

export default layout
