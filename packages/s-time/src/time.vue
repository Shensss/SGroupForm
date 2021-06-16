<template>
  <span class="time">
    {{ showTime }}
  </span>
</template>

<script>
import {dateFormat} from '../../utils'

export default {
  name: 'sTime',
  data() {
    return {}
  },
  props: {
    value: {
      type: [String, Number, Date, Array],
      default: ''
    },
    format: String,
    rangeSeparator: {
      type: String,
      default: '至'
    }
  },
  computed: {
    showTime() {
      if (Array.isArray(this.value) && this.value.length > 0) {
        const start = dateFormat(this.format || 'yyyy-MM-dd HH:mm:ss', this.value[0] || '')
        const end = dateFormat(this.format || 'yyyy-MM-dd HH:mm:ss', this.value[1] || '')
        return start + (this.rangeSeparator) + end
      } else if (!Array.isArray(this.value)) {
        return dateFormat(this.format || 'yyyy-MM-dd HH:mm:ss', this.value)
      } else {
        return ''
      }
    }
  }
}
</script>
<style>
.time {

}
</style>
