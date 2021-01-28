import SGroupLayout from './s-group-layout/index'
import SGroupForm from './s-group-form/index'
import SUpload from './s-upload/index'
import SFileView from './s-file-view/index'
import SRichText from './s-rich-text/index'
import SDict from './s-dict/index'
import STreeDict from './s-tree-dict/index'
import SText from './s-text/index'
import { version } from '../package.json'

const components = [SGroupLayout, SGroupForm, SUpload, SFileView, SRichText, SDict, STreeDict, SText]
const install = function (Vue, opt) {
    // 判断是否安装
    if (install.installed) {
        return
    }
    components.forEach((component) => {
        if (opt && component.name === 'SGroupForm') {
            Vue.use(component, opt)
        } else {
            Vue.use(component)
        }
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version,
    install,
    SGroupLayout,
    SUpload,
    SFileView,
    SRichText,
    SGroupForm,
    SDict,
    STreeDict,
    SText
}