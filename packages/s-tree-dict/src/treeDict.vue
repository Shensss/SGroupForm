<template>
  <div class="text">{{ label.join(',') }}</div>
</template>

<script>
import find from 'lodash-es/find'
import matchesProperty from 'lodash-es/matchesProperty'

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
  methods: {
    getLabel (option) {
      if (option && this.value[this.index]) {
        option.map(() => {
          if (this.value[this.index] !== undefined) {
            const is = find(option, matchesProperty(this.mapper.value, this.value[this.index]))
            if (is) {
              this.label.push(is[this.mapper.label])
              this.index++
              this.getLabel(is[this.mapper.children])
            }
          }
        })
      }
    }
  },
  created () {
    this.getLabel(this.options, this.index)
  }
}
</script>

<style lang="scss" scoped>
.text {
}
</style>
