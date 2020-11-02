<template>
    <div class="upload">
        <el-button @click="clickHandle">
            <i class="el-icon-upload"></i>
            点击上传
        </el-button>
        <input ref="input" type="file" :accept="fileType" @change="handleChange"/>
        <file-view v-if="fileView" :view="view" :remove="remove" v-model="fileList"></file-view>
    </div>
</template>

<script>
import FileView from '../SFile/fileView'
import axios from 'axios'
import utils from '../../../utils'

export default {
  name: 'sUpload',
  components: { FileView },
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
        '.docx':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    }
  },
  props: {
    // 值
    value: {
      type: String,
      default: ''
    },
    // 配置
    accept: {
      type: String,
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
    }
  },
  computed: {
    fileType () {
      let fileTypeArr = []
      if (this.accept) {
        this.accept.split(',').map(item => {
          if (this.fileTypeToAccept[item]) {
            fileTypeArr.push(this.fileTypeToAccept[item])
          }
        })
      } else {
        fileTypeArr = []
      }
      return fileTypeArr.join(',')
    },
    config () {
      return utils.lodash.merge(this.$UploadConfig, this.asyncConfig)
    }
  },
  methods: {
    clickHandle () {
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
      this.config.data.map(item => {
        if (item.value === 'file') {
          formData.append(item.key, file)
        }
      })
      axios.post(this.config.path, formData).then(res => {
        const { data } = res
        this.fileList.push({
          name: utils.lodash.get(data, this.config.name),
          url: this.config.domain + utils.lodash.get(data, this.config.url)
        })
        this.$refs.input.value = ''
        this.$emit('change')
      })
    },
    buildFileList () {
      let viewList = []
      if (typeof this.value === 'string') {
        if (this.value.indexOf('[{') < 0) {
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
        viewList = this.value
      }
      this.fileList = viewList
    }
  },
  mounted () {
    if (this.value) {
      this.buildFileList()
    }
  },
  watch: {
    fileList (val) {
      const str = []
      if (this.config.getType === 'JSON') {
        this.$emit('input', JSON.stringify(val))
        this.$emit('change', JSON.stringify(val))
      } else {
        val.map(item => {
          str.push(item.url + '&&' + item.name)
        })
        this.$emit('input', str.join(','))
        this.$emit('change', str.join(','))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
    input {
        display: none;
    }
}
</style>
