<template>
  <span class="time">
    {{ showTime }}
  </span>
</template>

<script>
import { dateFormat } from '../../utils'

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
      if (Array.isArray(this.value) && this.value.length > 0) {
        const start = dateFormat(this.config.props.format, this.value[0] || '')
        const end = dateFormat(this.config.props.format, this.value[1] || '')
        return start + (this.config.props.rangeSeparator || '至') + end
      } else if (!Array.isArray(this.value)) {
        return dateFormat(this.config.props.format, this.value)
      } else {
        return ''
      }
    }
  }
}
</script>
