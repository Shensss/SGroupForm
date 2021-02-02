<template>
  <div class="row" @dblclick="changeHeight2" @click="changeHeight2" :style="'grid-area:'+height"></div>
</template>

<script>
export default {
  name: "row",
  inject: ['changeHeight'],
  data() {
    return {
      height: ''
    }
  },
  methods: {
    changeHeight2() {
      this.changeHeight(this.$el, 5)
    }
  }
}
</script>

<style scoped>
.row {
  background-color: red;
}
</style>
