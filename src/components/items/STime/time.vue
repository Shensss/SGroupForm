<template>
  <span class="time">{{showTime}}</span>
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
      type: [String, Number, Date],
      default: ''
    }
  },
  computed: {
    showTime () {
      return utils.custom.dateFormat(this.config.props.format, this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
}
</style>
