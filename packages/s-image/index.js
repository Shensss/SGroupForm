import SImage from './src/sImage'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

SImage.install = function (Vue) {
    Vue.component('SImage', SImage)
    Vue.use(Viewer)
}

export default SImage
