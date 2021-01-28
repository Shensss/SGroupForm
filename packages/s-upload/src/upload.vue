<template>
  <div class="upload"
       :class="btnView==='plus'?'start':''">
    <el-button v-show="fileList.length<length"
               v-if="!btnView"
               @click="clickHandle">
      <i class="el-icon-upload"/>
      点击上传
    </el-button>
    <span :class="fileList.length<length"/>
    <div v-show="fileList.length<length"
         v-if="btnView==='plus'"
         class="plus"
         @click="clickHandle">
      <i class="el-icon-plus"/>
    </div>
    <span v-html="tips"></span>
    <input ref="input"
           type="file"
           :accept="fileType"
           @change="handleChange">
    <file-view v-if="fileView&&fileList.length>0"
               v-model="fileList"
               :imageStyle="imageStyle"
               :asyncConfig="asyncConfig"
               :view="view"
               :remove="remove">
    </file-view>
  </div>
</template>

<script>
import FileView from '../../s-file-view/src/fileView'
import axios from 'axios'
import Cookies from 'js-cookie'
import get from 'lodash-es/get'
import merge from 'lodash-es/merge'

export default {
  name: 'SUpload',
  components: { FileView },
  props: {
    // 值
    value: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 99
    },
    btnView: {
      type: String,
      default: ''
    },
    // 配置
    accept: {
      type: [String, Array],
      default: ''
    },
    fileView: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 50
    },
    tips: String,
    remove: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: 'file'
    },
    asyncConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    imageStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      fileList: [],
      file: '',
      fileTypeToAccept: {
        '.pdf': 'application/pdf',
        '.gif': 'image/gif',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.txt': 'text/plain',
        '.zip': 'application/zip',
        '.csv': 'text/csv',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.pptx':
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.mp4': 'audio/mp4, video/mp4'
      }
    }
  },
  computed: {
    fileType () {
      let fileTypeArr = []
      if (this.accept && typeof this.accept === 'string') {
        this.accept.split(',').map(item => {
          if (this.fileTypeToAccept[item]) {
            fileTypeArr.push(this.fileTypeToAccept[item])
          }
        })
      } else if (Array.isArray(this.accept)) {
        this.accept.map(item => {
          if (this.fileTypeToAccept[item]) {
            fileTypeArr.push(this.fileTypeToAccept[item])
          }
        })
      } else {
        fileTypeArr = []
      }
      return fileTypeArr.join(',')
    },
    mergeConfig () {
      return merge(this.$UploadConfig, this.asyncConfig)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.buildFileList()
      }
    },
    fileList (val) {
      if (val.length > 0) {
        const str = []
        if (this.mergeConfig.getType === 'JSON') {
          this.$emit('input', JSON.stringify(val))
          this.$emit('change', JSON.stringify(val))
        } else {
          val.map(item => {
            str.push(item.url + '&&' + item.name)
          })
          this.$emit('input', str.join(','))
          this.$emit('change', str.join(','))
        }
      } else {
        this.$emit('input', '')
        this.$emit('change', '')
      }
    }
  },
  methods: {clickHandle () {
      this.$refs.input.click()
    },
    checkType (fileName) {
      if (!this.accept) return true
      const index = fileName.lastIndexOf('.')
      const extension = fileName.substring(index).toLowerCase()
      const allowedType = this.accept.split(',')
      if (allowedType.indexOf(extension) >= 0) {
        return true
      } else {
        this.$message.error('不支持' + extension + '格式')
        return false
      }
    },
    handleChange () {
      const file = this.$refs.input.files[0]
      const access = this.checkType(file.name)
      if (!access) {
        this.$refs.input.value = ''
        return
      }

      if (file.size > this.size * 1024 * 1024) {
        this.$refs.input.value = ''
        return this.$message.error(`文件${file.name}过大!`)
      }
      const formData = new FormData()
      this.mergeConfig.data.map(item => {
        if (item.value === 'file') {
          formData.append(item.key, file)
        }
      })
      axios.post(this.mergeConfig.path, formData, {
        headers: Object.assign({
          Authorization: Cookies.get('sessionId')
        }, this.mergeConfig.headers || {})
      }).then(res => {
        const { data } = res
        const item = get(data, this.mergeConfig.listPath)
        item.name = item[this.mergeConfig.nameKey]
        item.url = item[this.mergeConfig.urlKey]
        this.fileList.push(item)
        this.$refs.input.value = ''
        this.$emit('change')
      })
    },
    buildFileList () {
      let viewList = []
      if (this.value && typeof this.value === 'string') {
        if (this.value.indexOf('[{') < 0 && this.value.length > 0) {
          this.value.split(',').map(item => {
            viewList.push({
              name: item.split('&&')[1],
              url: item.split('&&')[0]
            })
          })
        } else {
          viewList = JSON.parse(this.value)
        }
      } else {
        viewList = this.value || []
      }
      this.fileList = viewList
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  &.start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .el-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .plus {
    display: flex;
    width: 98px;
    height: 98px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px dashed #ddd;
  }

  input {
    display: none;
  }
}
</style>
