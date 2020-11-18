<template>
    <span class="text">{{value}}</span>
</template>

<script>
export default {
  name: 'sText',
  data () {
    return {}
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
}
</style>