<template>
    <div class="tinymce-editor">
        <vue-tinymce
                v-model="myValue"
                :setting="init"/>
    </div>
</template>
<script>
import utils from '../../../utils'
import axios from 'axios'
import './zh_CN.js'

export default {
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table textcolor wordcount contextmenu'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    },
    height: {
      type: Number,
      default: 300
    },
    readonly: {
      type: Boolean,
      default: false
    },
    asyncConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      //初始化配置
      init: {
        language: 'zh_CN',
        height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        readonly: this.readonly,
        images_upload_handler: (blobInfo, resolve, reject) => {
          const formData = new FormData()
          const file = blobInfo.blob()
          this.config.data.map(item => {
            if (item.value === 'file') {
              formData.append(item.key, file)
            }
          })
          axios.post(this.config.path, formData).then(res => {
            const { data, errMsg } = res
            if (errMsg) return reject(errMsg)
            resolve(this.config.domain + utils.lodash.get(data, this.config.url))
          })
        }
      },
      myValue: this.value
    }
  },
  computed: {
    config () {
      return utils.lodash.merge(this.$UploadConfig, this.asyncConfig)
    }
  },
  methods: {
    onClick (e) {
      this.$emit('focus', e)
    }
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>