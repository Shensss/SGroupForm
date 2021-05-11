import SGroupLayout from './s-group-layout/index'
import SGroupForm from './s-group-form/index'
import SGroupTable from './s-group-table/index'
import SUpload from './s-upload/index'
import SFileView from './s-file-view/index'
import SRichText from './s-rich-text/index'
import SDict from './s-dict/index'
import STreeDict from './s-tree-dict/index'
import SText from './s-text/index'
import SCheckTag from './s-check-tag/index'
import SCode from './s-code/index'
import STime from './s-time/index'
import SImage from './s-image/index'
import SSelectRange from './s-select-range'
import {version} from '../package.json'

const components = [SGroupLayout, SGroupForm, STime, SSelectRange, SCode, SImage, SUpload, SFileView, SRichText, SDict, STreeDict, SText, SGroupTable, SCheckTag]
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
    STime,
    SFileView,
    SRichText,
    SGroupForm,
    SDict,
    STreeDict,
    SText,
    SGroupTable,
    SCheckTag,
    SSelectRange,
    SCode,
    SImage
}
