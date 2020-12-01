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
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Cascader,
  InputNumber,
  Tag,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import sGroupForm from './components/SForm/index.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import tinymce from 'tinymce'
import VueTinymce from '@tinymce/tinymce-vue'

//样式
import 'tinymce/skins/content/default/content.min.css'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'

//主题
import 'tinymce/themes/silver'

//插件
import 'tinymce/plugins/link' //链接插件
import 'tinymce/plugins/image' //图片插件
import 'tinymce/plugins/media' //媒体插件
import 'tinymce/plugins/table' //表格插件
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/quickbars' //快速栏插件
import 'tinymce/plugins/fullscreen' //全屏插件

/**
 * 注：
 * 5.3.x版本需要额外引进图标，没有所有按钮就会显示not found
 */
import 'tinymce/icons/default/icons'

//本地化
import SUpload from './components/items/SUpload/upload'
import SFileView from './components/items/SFile/fileView'
import SCode from './components/items/SAce/ace'
import SRichText from './components/items/SRichText/richText'
import SText from './components/items/SText/text'
import SDict from './components/items/SDict/dict'
import STreeDict from './components/items/SDict/treeDict'
import SCheckTag from './components/items/SCheckTag/checkTag'
import STime from './components/items/STime/time'
import SNumber from './components/items/SNumber/number'

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

/* istanbul ignore next */
sGroupForm.install = function (Vue, opt = {}) {
  Vue.component('sGroupForm', sGroupForm)
  Vue.directive('change', {
    bind: function (el, binding, vnode) {
      bindEvent('change', binding, vnode.componentInstance.form)
    },
  })
  Vue.directive('blur', {
    bind: function (el, binding, vnode) {
      bindEvent('blur', binding, vnode.componentInstance.form)
    },
  })
  Vue.directive('focus', {
    bind: function (el, binding, vnode) {
      bindEvent('focus', binding, vnode.componentInstance.form)
    },
  })
  // element组件
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
  Vue.component(RadioButton.name, RadioButton)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Cascader.name, Cascader)
  Vue.component(InputNumber.name, InputNumber)
  Vue.component(Tag.name, Tag)
  // 自封装组件
  Vue.use(Viewer)
  Vue.component('SUpload', SUpload)
  if (opt.UploadConfig) {
    Vue.prototype.$UploadConfig = opt.UploadConfig
  }
  Vue.component('SFileView', SFileView)
  Vue.component('SCode', SCode)
  Vue.component('SRichText', SRichText)
  Vue.component('SText', SText)
  Vue.component('SDict', SDict)
  Vue.component('STreeDict', STreeDict)
  Vue.component('SCheckTag', SCheckTag)
  Vue.component('STime', STime)
  Vue.component('SNumber', SNumber)

  Vue.component('VueTinymce', VueTinymce)
  Vue.prototype.$tinymce = tinymce
}

export default sGroupForm
