<template>
    <span class="dict">{{showValue}}</span>
</template>

<script>
import utils from '../../../utils'

export default {
  name: 'sDict',
  inject: ['config', 'mapper'],
  data () {
    return {
      showValue: ''
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler () {
        this.buildShowValue()
      }
    },
    config: {
      deep: true,
      immediate: true,
      handler () {
        this.buildShowValue()
      }
    }
  },
  methods: {
    buildShowValue () {
      if (this.value) {
        if (Array.isArray(this.value)) {
          const arr = []
          this.value.map(val => {
            let is = utils.lodash.find(this.config.options, utils.lodash.matchesProperty(this.mapper.value, val))
            if (is) {
              arr.push(is[this.mapper.label])
            }
          })
          this.showValue = arr.join(',')
        } else {
          const is = utils.lodash.find(this.config.options, utils.lodash.matchesProperty(this.mapper.value, this.value))
          this.showValue = is ? is[this.mapper.label] : this.value
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dict {
}
</style>