import SGroupForm from './src/index'

SGroupForm.install = function (Vue, opt) {
    Vue.directive('change', {
        bind: function (el, binding, vnode) {
            bindEvent('change', binding, vnode.componentInstance.form)
        }
    })
    Vue.directive('blur', {
        bind: function (el, binding, vnode) {
            bindEvent('blur', binding, vnode.componentInstance.form)
        }
    })
    Vue.directive('focus', {
        bind: function (el, binding, vnode) {
            bindEvent('focus', binding, vnode.componentInstance.form)
        }
    })
    if (opt && opt.UploadConfig) {
        Vue.prototype.$UploadConfig = opt.UploadConfig
    }
    Vue.component('SGroupForm', SGroupForm)
}

function bindEvent (eventName, binding, form) {
    const { value, modifiers, rawName } = binding
    if (modifiers.label) {
        form.map((item) => {
            if (item.label === rawName.split('.')[2]) {
                item[eventName] = value
            }
        })
    } else if (modifiers.number) {
        form[rawName.split('.')[2]][eventName] = value
    } else {
        form.map((item) => {
            item[eventName] = value
        })
    }
}

export default SGroupForm
