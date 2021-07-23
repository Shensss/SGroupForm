<template>
  <span class="text">
    <template v-if="Array.isArray(value)">{{value.join(separator)}}</template>
    <template v-else>{{ value }}</template>
  </span>
</template>

<script>
export default {
  name: 'sText',
  data () {
    return {}
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    separator: {
      type: String,
      default: '-'
    },
  }
}
</script>
<style>
.text {
}
</style>
