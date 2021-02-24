<template>
  <div class="sl-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "item",
  props: {
    x: [Number, String],
    y: [Number, String],
    w: [Number, String],
    h: [Number, String]
  }
}
</script>

<style scoped>

</style>
