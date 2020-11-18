<template>
    <div class="fileView">
        <ul v-if="view==='file'" class="fileList">
            <li v-show="item.name" :key="'file'+index" v-for="(item,index) in viewList">
                <p @click="previewHandle(item)">
                    <img v-if="item.name" class="icon" :src="item.name|typeFilter|imgLoad"/>
                    {{item.name}}
                </p>
                <i v-if="remove" class="el-icon-delete" @click="removeFile(item)"></i>
            </li>
        </ul>
        <viewer v-if="view==='image'" :images="images">
            <ul class="imageList" :class="{remove:remove}">
                <li :key="'file'+index" v-for="(item,index) in viewList">
                    <img v-if="item.url" :src="item.url" :title="item.name">
                    <i v-if="remove" class="el-icon-delete" @click="removeFile(item)"></i>
                </li>
            </ul>
        </viewer>
    </div>
</template>

<script>
import utils from '../../../utils'

export default {
  name: 'sFileView',
  data () {
    return {
      viewList: []
    }
  },
  props: {
    // 可以是对象数组，或拼接字符串
    // Array:[{ name:'',url:'' }]
    // String: url1+'&&'+name1+','+...
    value: [Array, String],
    remove: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: 'file'
    },
    path: {
      type: String,
      default: ''
    }
  },
  filters: {
    typeFilter (name) {
      const type = name && name.substr(name.lastIndexOf('.')).slice('.')
      switch (type) {
        case '.pdf':
          return 'pdf.png'
        case '.doc':
        case '.docx':
          return 'word.png'
        case '.ppt':
        case '.pptx':
          return 'ppt.png'
        case '.xls':
        case '.xlsx':
          return 'excel.png'
        case '.txt':
          return 'txt.png'
        case '.png':
        case '.jpg':
        case '.jpeg':
        case '.gif':
          return 'image.png'
      }
    },
    imgLoad (target) {
      if (typeof target === 'string') {
        return `static/images/${target}`
      } else if (typeof target === 'object' && target !== null) {
        Object.keys(target).map(key => {
          if (key === 'img') {
            target.backgroundImage = `url('static/images/${target.img}')`
          }
          target.backgroundSize = target.backgroundSize || '100% 100%'
        })
        return target
      } else {
        return {}
      }
    }
  },
  computed: {
    images () {
      const images = []
      if (this.view === 'image') {
        this.viewList.map(item => {
          images.push(item.url)
        })
      }
      return images
    }
  },
  watch: {
    value () {
      this.buildViewList()
    }
  },
  created () {
    this.buildViewList()
  },
  methods: {
    removeFile (item) {
      utils.custom.removeObjWithArr(this.viewList, item)
      this.$emit('input', this.viewList)
    },
    previewHandle (item) {
      const type = item.name.substr(item.name.lastIndexOf('.'))
      switch (type) {
        case '.pdf':
        case '.xls':
        case '.xlsx':
        default:
          window.open(item.url)
      }
    },
    buildViewList () {
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
      this.viewList = viewList
    }
  }
}
</script>

<style lang="scss" scoped>
.fileView {
    width: 100%;

    .fileList {
        margin: 0;
        padding: 0;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 30px;
            padding: 6px;
            border: 1px dashed #f2f2f2;
            margin-bottom: 5px;

            &:last-child {
                margin-bottom: 0;
            }

            &:hover {
                background-color: #eee;
                color: #5ea9f8;
            }

            p {
                margin-bottom: 0;
                cursor: pointer;
                margin-top: 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .icon {
                    width: 24px;
                    height: 24px;
                    margin-right: 5px;
                }
            }
        }
    }

    .imageList {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;

        &.remove {
            li:hover {
                i {
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #fff;
                    z-index: 2;
                    font-size: 24px;
                }

                &:after {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    lefT: 0;
                    width: 98px;
                    height: 98px;
                    z-index: 1;
                    background-color: rgba(0, 0, 0, 0.4);
                }
            }
        }

        li {
            width: 98px;
            height: 98px;
            border: 1px dashed #f2f2f2;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-content: center;
            position: relative;
            margin-right: 8px;
            margin-bottom: 8px;

            img {
                width: 98px;
                height: 98px;
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
