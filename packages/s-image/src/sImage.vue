<template>
  <img :src="domain+useUrl" @error="error=true" :alt="name" :title="name" @click="$emit('preview')"/>
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
  data () {
    return {
      error: false,
      name: '',
      useUrl: ''
    }
  },
  methods: {
    getImage () {
      return new Promise(resolve => {
        if (this.error) {
          resolve({
            url: this.errorImage,
            name: '暂无图片'
          })
        } else {
          if (typeof this.value === 'object' && this.value) {
            if (this.value.type === 'base64') {
              this.getBase64(resolve, this.value)
            } else {
              resolve({
                url: this.value[this.urlKey],
                name: this.value[this.nameKey]
              })
            }
          } else if (this.value.indexOf('{') >= 0) {
            const value = JSON.parse(this.value)[0]
            if (value.type === 'base64') {
              this.getBase64(resolve, value)
            } else {
              resolve({
                url: value[this.urlKey],
                name: value[this.nameKey]
              })
            }
          } else if (this.value) {
            resolve({ url: this.value, name: '' })
          }
        }
      })
    },
    getBase64 (resolve, value) {
      axios.get(this.fileGetPath + '/' + value.url).then(res => {
        const { data } = res
        resolve({
          url: get(data, 'data.base64'),
          name: get(data, this.nameKey)
        })
      })
    }
  },
  mounted () {
    this.getImage(this.urlKey).then(res => {
      this.useUrl = res.url
      this.name = res.name
    })
  }
}
</script>

<style scoped lang="scss">
.sImage {
}
</style>
