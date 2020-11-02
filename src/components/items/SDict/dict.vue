<template>
    <div class="text">{{showValue}}</div>
</template>

<script>
import utils from '../../../utils'

export default {
  name: 'sDict',
  inject: ['config', 'mapper'],
  data () {
    return {}
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
  computed: {
    showValue () {
      if (Array.isArray(this.value)) {
        const arr = []
        this.value.map(val => {
          let is = utils.lodash.find(this.config.options, utils.lodash.matchesProperty(this.mapper.value, val))
          if(is){
            arr.push(is[this.mapper.label])
          }
        })
        return arr.join(',')
      } else {
        const is = utils.lodash.find(this.config.options, utils.lodash.matchesProperty(this.mapper.value, this.value))
        return is[this.mapper.label]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
}
</style>