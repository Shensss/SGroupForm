<template>
  <span class="time">
    {{ showTime }}
  </span>
</template>

<script>
import utils from '../../../utils'

export default {
  name: 'sTime',
  inject: ['config', 'mapper'],
  data () {
    return {}
  },
  props: {
    value: {
      type: [String, Number, Date, Array],
      default: ''
    }
  },
  computed: {
    showTime () {
      if (Array.isArray(this.value)&&this.value.length>0) {
        const start = utils.custom.dateFormat(this.config.props.format, this.value[0] || '')
        const end = utils.custom.dateFormat(this.config.props.format, this.value[1] || '')
        return start + (this.config.props.rangeSeparator || '至') + end
      } else if(!Array.isArray(this.value)){
        return utils.custom.dateFormat(this.config.props.format, this.value)
      }else{
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
}
</style>
