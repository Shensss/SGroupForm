<template>
  <img :src="domain+useUrl" @error="error=true" @click="$emit('preview')"/>
</template>

<script>
import axios from 'axios'
import get from 'lodash-es/get'

export default {
  name: 'SImage',
  props: {
    value: [Object, String],
    domain: {
      type: String,
      default: ''
    },
    fileGetPath: String,
    mode: {
      type: String,
      default: 'image'
    },
    urlKey: {
      type: String,
      default: 'url'
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    errorImage: String
  },
  data() {
    return {
      error: false,
      name: '',
      useUrl: ''
    }
  },
  methods: {
    getImage(value) {
      return new Promise(resolve => {
        const data = value || this.value
        if (this.error) {
          resolve({
            url: this.errorImage,
            name: '暂无图片'
          })
        } else {
          if (typeof data === 'object' && data) {
            if (this.value.type === 'base64') {
              this.getBase64(resolve, data)
            } else {
              resolve({
                url: data[this.urlKey],
                name: data[this.nameKey]
              })
            }
          } else if (this.value.indexOf('{') >= 0) {
            const parseData = JSON.parse(data)[0]
            if (parseData.type === 'base64') {
              this.getBase64(resolve, parseData)
            } else {
              resolve({
                url: parseData[this.urlKey],
                name: parseData[this.nameKey]
              })
            }
          } else if (data) {
            resolve({url: data, name: ''})
          } else {
            resolve({url: '', name: ''})
          }
        }
      })
    },
    getBase64(resolve, value) {
      axios.get(this.fileGetPath + '/' + value.url).then(res => {
        const {data} = res
        resolve({
          url: get(data, 'data.base64'),
          name: get(data, this.nameKey)
        })
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.getImage().then(res => {
          this.useUrl = res.url
          this.name = res.name
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sImage {
}
</style>
