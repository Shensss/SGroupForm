<template>
  <layout :cols="5" :rows="5" class="bottom">
    <div>1</div>
    <div>2</div>
    <div>13</div>
    <div>13</div>
    <div>14</div>
  </layout>
</template>

<script>
export default {
  name: "bottom"
}
</script>

<style scoped>
.bottom {
  height: 600px;
  width: 600px;
  background-color: black;
  color: #fff;
}
</style>
