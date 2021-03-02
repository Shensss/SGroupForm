<template>
  <div class="text">{{ label.join(separator) }}</div>
</template>

<script>
import find from 'lodash-es/find'

export default {
  name: 'sTreeDict',
  data () {
    return {
      label: [],
      index: 0
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    separator: {
      type: String,
      default: ','
    },
    mapper: {
      type: Object,
      default () {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    }
  },
  watch: {
    value () {
      this.getLabel(this.options)
    },
    options () {
      this.getLabel(this.options)
    }
  },
  methods: {
    getLabel (option) {
      if (option) {
        if (this.value[this.index] !== undefined || this.value[this.index] === 0) {
          const is = find(option, (item) => item[this.mapper.value] === this.value[this.index])
          if (is) {
            this.label.push(is[this.mapper.label])
            this.index++
            this.getLabel(is[this.mapper.children])
          }
        }
      }
    }
  },
  created () {
    this.getLabel(this.options)
  }
}
</script>

<style lang="scss" scoped>
.text {
}
</style>
