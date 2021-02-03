<template>
  <span class="dict" :style="currentStyle">{{ showValue }}</span>
</template>

<script>
import find from 'lodash-es/find'
import matchesProperty from 'lodash-es/matchesProperty'

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
      if (this.value) {
        if (Array.isArray(this.value)) {
          const arr = []
          this.value.map(val => {
            const is = find(this.options, matchesProperty(this.mapper.value, val))
            if (is) {
              arr.push(is[this.mapper.label])
              if (is.style) {
                this.currentStyle = is.style
              }
            }
          })
          this.showValue = arr.join(',')
        } else {
          const is = find(this.options, matchesProperty(this.mapper.value, this.value))
          this.showValue = is ? is[this.mapper.label] : this.value
        }
      }
    }
  }
}
</script>
<style>
.dict {

}
</style>
