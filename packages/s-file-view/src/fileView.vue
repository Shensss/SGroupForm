<template>
  <div class="fileView">
    <ul v-if="view==='file'"
        class="fileList">
      <li v-for="(item,index) in viewList"
          v-show="item.name"
          :key="'file'+index">
        <p @click="previewHandle(item)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.name|typeFilter"/>
          </svg>
          {{ item.name }}
        </p>
        <span>
          <svg class="icon" aria-hidden="true" @click="download(item)">
             <use xlink:href="#icon-download"/>
          </svg>
          <svg v-if="remove" class="icon" aria-hidden="true" @click="removeFile(item)">
            <use xlink:href="#icon-remove"/>
          </svg>
        </span>
      </li>
    </ul>
    <viewer v-if="view==='image'"
            ref="viewer"
            :images="images">
      <ul class="imageList"
          :class="{remove:remove}">
        <li v-for="(item,index) in viewList"
            :key="'file'+index"
            :style="imageStyle">
          <template v-if="item.name && item.name.substr(item.name.lastIndexOf('.')).slice('.')==='.mp4'">
            <video :src="mergeConfig.domain+item.url"
                   @click="viewVideo(mergeConfig.domain+item.url)"/>
          </template>
          <template v-else>
            <s-image :fileGetPath="fileGetPath" :domain="mergeConfig.domain" :value="item" @preview="preview"></s-image>
            <svg class="icon" aria-hidden="true" @click="removeFile(item)">
              <use xlink:href="#icon-remove"/>
            </svg>
          </template>
        </li>
      </ul>
    </viewer>
    <div v-if="view==='slot'" class="fileViewSlot">
      <slot :data="viewList"/>
    </div>
    <div v-if="model" class="model">
      <i class="el-icon el-icon-close" @click="model=false"/>
      <video controls :src="mergeConfig.domain+current"/>
    </div>
  </div>
</template>
<script>
import merge from 'lodash-es/merge'
import { removeObjWithArr } from '../../utils'
import SImage from '../../s-image/src/sImage'

export default {
  name: 'SFileView',
  filters: {
    typeFilter (name) {
      const type = name && name.substr(name.lastIndexOf('.')).slice('.')
      switch (type) {
        case '.pdf':
          return '#icon-ppt1'
        case '.doc':
        case '.docx':
          return '#icon-word'
        case '.ppt':
        case '.pptx':
          return '#icon-ppt'
        case '.xls':
        case '.xlsx':
          return '#icon-excel'
        case '.txt':
          return '#icon-txt'
        case '.png':
        case '.jpg':
        case '.jpeg':
        case '.gif':
          return '#icon-Image_File'
        case '.zip':
        case '.rar':
          return '#icon-yasuobao'
        case '.mp4':
          return '#icon-icon-test'
      }
    }
  },
  props: {
    value: {
      type: [Array, String],
      default () {
        return []
      }
    },
    remove: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: 'file'
    },
    imageStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    fileGetPath: {
      type: String,
      default: ''
    },
    asyncConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      current: '',
      model: false,
      viewList: []
    }
  },
  components: {
    SImage
  },
  computed: {
    images () {
      return this.viewList
    },
    mergeConfig () {
      return merge(this.$UploadConfig, this.asyncConfig)
    }
  },
  watch: {
    value () {
      this.buildViewList()
    }
  },
  created () {
    this.buildViewList()
    if (!sessionStorage.getItem('icon')) {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = '//at.alicdn.com/t/font_427398_7ehmbnq6i8.js'
      document.body.appendChild(s)
      sessionStorage.setItem('icon', true)
    }
  },
  methods: {
    preview () {
      this.$refs.viewer.rebuildViewer()
      this.$refs.viewer.$viewer.show()
    },
    viewVideo (url) {
      this.current = url
      this.model = true
    },
    removeFile (item) {
      removeObjWithArr(this.viewList, item)
      this.$emit('input', this.viewList)
    },
    download (item) {
      const a = document.createElement('a')
      a.setAttribute('download', '')
      a.setAttribute('href', this.mergeConfig.domain + item.url)
      a.click()
    },
    previewHandle (item) {
      const type = item.name.substr(item.name.lastIndexOf('.'))
      switch (type) {
        case '.pdf':
        case '.xls':
        case '.xlsx':
        default:
          window.open(this.mergeConfig.domain + item.url)
      }
    },
    buildViewList () {
      let viewList = []
      if (this.value && typeof this.value === 'string') {
        if (this.value.indexOf('[{') < 0) {
          if (this.value.indexOf('base64') < 0) {
            this.value.split(',').map(item => {
              viewList.push({
                name: item.split('&&')[1],
                url: item.split('&&')[0]
              })
            })
          } else {
            viewList.push({
              name: this.value.split('&&')[1],
              url: this.value.split('&&')[0]
            })
          }
        } else {
          viewList = JSON.parse(this.value).map(item => {
            return {
              ...item,
              name: item[this.mergeConfig.nameKey] || item.name,
              url: item[this.mergeConfig.urlKey] || item.url
            }
          })
        }
      } else {
        viewList = this.value && this.value.map(item => {
          return {
            ...item,
            name: item[this.mergeConfig.nameKey] || item.name,
            url: item[this.mergeConfig.urlKey] || item.url
          }
        })
      }
      this.viewList = viewList
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.model {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.45);

  .el-icon {
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    max-width: 60%;
    max-height: 60%;
    background-color: #000;
    transform: translate(-50%, -50%);
  }
}

.fileView {
  width: 100%;

  .fileList {
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px;
      margin-bottom: 5px;
      line-height: 30px;
      border: 1px dashed #ddd;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        color: #5ea9f8;
        background-color: #eee;
      }

      p {
        display: flex;
        margin-top: 0;
        margin-bottom: 0;
        cursor: pointer;
        justify-content: flex-start;
        align-items: center;

        .icon {
          width: 24px;
          height: 24px;
          margin-right: 5px;
        }
      }

      span {
        i {
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
  }

  .imageList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    .icon {
      display: none;
    }

    &.remove {

      li:hover {
        .icon {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 2;
          font-size: 24px;
          color: #fff;
          transform: translate(-50%, -50%);
        }

        &:after {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          content: '';
        }
      }
    }

    li {
      position: relative;
      display: flex;
      width: 98px;
      height: 98px;
      margin-right: 8px;
      margin-bottom: 8px;
      overflow: hidden;
      border: 1px dashed #f2f2f2;
      justify-content: center;
      align-content: center;

      img {
        width: 100%;
        height: 100%;
      }

      video {
        width: 100%;
        height: 100%;
      }

      i {
        display: none;
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
