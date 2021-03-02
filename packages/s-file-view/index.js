import SFileView from './src/fileView'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

SFileView.install = function (Vue) {
    Vue.component('SFileView', SFileView)
    Vue.use(Viewer)
}

export default SFileView
