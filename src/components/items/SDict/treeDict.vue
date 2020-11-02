<template>
    <div class="text">{{label.join(',')}}</div>
</template>

<script>
import utils from '../../../utils'

export default {
  name: 'sTreeDict',
  inject: ['config', 'mapper'],
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
    config: {
      type: Object
    }
  },
  methods: {
    getLabel (option) {
      if (option && this.value[this.index]) {
        option.map(() => {
          if (this.value[this.index] !== undefined) {
            const is = utils.lodash.find(option, utils.lodash.matchesProperty(this.mapper.value, this.value[this.index]))
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
    this.getLabel(this.config.options, this.index)
  }
}
</script>

<style lang="scss" scoped>
.text {
}
</style>