import {
  Button,
  Form,
  FormItem,
  Input,
  DatePicker,
  Collapse,
  CollapseItem,
  Switch,
  Slider,
  TimePicker,
  Rate,
  ColorPicker,
  Select,
  Option,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Cascader
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import sGroupForm from './components/SForm/index.vue'

function bindEvent (eventName, binding, form) {
  const { value, modifiers, rawName } = binding
  if (modifiers.label) {
    form.map(item => {
      if (item.label === rawName.split('.')[2]) {
        item[eventName] = value
      }
    })
  } else if (modifiers.number) {
    form[rawName.split('.')[2]][eventName] = value
  } else {
    form.map(item => {
      item[eventName] = value
    })
  }
}

/* istanbul ignore next */
sGroupForm.install = function (Vue, opt = {}) {
  Vue.component('sGroupForm', sGroupForm)
  if (opt.UploadConfig) {
    Vue.prototype.$UploadConfig = opt.UploadConfig
  }
  Vue.directive('change', {
    bind: function (el, binding, vnode) {
      bindEvent('change', binding, vnode.context.form)
    }
  })
  Vue.directive('blur', {
    bind: function (el, binding, vnode) {
      bindEvent('blur', binding, vnode.context.form)
    }
  })
  Vue.directive('focus', {
    bind: function (el, binding, vnode) {
      bindEvent('focus', binding, vnode.context.form)
    }
  })

  Vue.component(Switch.name, Switch)
  Vue.component(Slider.name, Slider)
  Vue.component(TimePicker.name, TimePicker)
  Vue.component(Rate.name, Rate)
  Vue.component(ColorPicker.name, ColorPicker)
  Vue.component(Form.name, Form)
  Vue.component(Collapse.name, Collapse)
  Vue.component(CollapseItem.name, CollapseItem)
  Vue.component(Input.name, Input)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(FormItem.name, FormItem)
  Vue.component(Button.name, Button)
  Vue.component(Select.name, Select)
  Vue.component(Option.name, Option)
  Vue.component(Radio.name, Radio)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Cascader.name, Cascader)
}

export default sGroupForm