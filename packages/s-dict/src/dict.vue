<template>
  <span class="dict" :style="currentStyle">{{ showValue }}</span>
</template>

<script>
import find from 'lodash-es/find'

export default {
  name: 'sDict',
  data() {
    return {
      showValue: '',
      currentStyle: {}
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    separator: {
      type: String,
      default: ','
    },
    mapper: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.buildShowValue()
      }
    },
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.buildShowValue()
      }
    }
  },
  methods: {
    buildShowValue() {
      if (this.value || this.value === 0 || this.value === '0' || this.value === '' || Array.isArray(this.value) && this.value.length > 0) {
        if (Array.isArray(this.value)) {
          const arr = []
          if (/\[.*\]/.test(this.options[0])) {
            this.normalDict(JSON.stringify(this.value), this.options)
          } else {
            this.value.map(val => {
              const is = find(this.options, (item) => item[this.mapper.value] === val)
              if (is) {
                arr.push(is[this.mapper.label])
                if (is && is.style) {
                  this.currentStyle = is.style
                }
              }
            })
            this.showValue = arr.join(this.separator)
          }
        } else {
          this.normalDict(this.value, this.options)
        }
      }
    },
    normalDict(value, options) {
      const is = find(options, (item) => item[this.mapper.value] === value)
      if (is && is.style) {
        this.currentStyle = is.style
      }
      this.showValue = is ? is[this.mapper.label] : value
    }
  }
}
</script>
<style>
.dict {

}
</style>
