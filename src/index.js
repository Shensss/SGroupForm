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

/* istanbul ignore next */
sGroupForm.install = function (Vue, opt = {}) {
  Vue.component('sGroupForm', sGroupForm)
  if (opt.PubSub) {
    Vue.prototype.$PubSub = opt.PubSub
  }
  if (opt.UploadConfig) {
    Vue.prototype.$UploadConfig = opt.UploadConfig
  }
  Vue.directive('item-change', {
    bind: function (el, binding, vnode) {
      const {
        value,
        modifiers
      } = binding
      const form = vnode.context.form
      form.map(item => {
        if (item.label === Object.keys(modifiers)[0]) {
          item.change = value
        }
      })
    }
  })
  Vue.directive('item-blur', {
    bind: function (el, binding, vnode) {
      const {
        value,
        modifiers
      } = binding
      const form = vnode.context.form
      form.map(item => {
        if (item.label === Object.keys(modifiers)[0]) {
          item.blur = value
        }
      })
    }
  })
  Vue.directive('item-focus', {
    bind: function (el, binding, vnode) {
      const {
        value,
        modifiers
      } = binding
      const form = vnode.context.form
      form.map(item => {
        if (item.label === Object.keys(modifiers)[0]) {
          item.focus = value
        }
      })
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