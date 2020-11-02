<template>
    <div class="text">{{value}}</div>
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