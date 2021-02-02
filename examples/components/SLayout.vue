<template>
  <layout class="box" :col="5" :row="5" :option="option">
    <row></row>
    <bottom></bottom>
  </layout>
</template>

<script>
import Row from "./row"
import Bottom from "./bottom"

export default {
  name: "SLayout",
  components: { Bottom, Row },
  data() {
    return {
      option: ['1/6/2/1']
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  height: 800px;
}
</style>
