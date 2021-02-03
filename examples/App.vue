<template>
  <div id="app">
    <s-group-form-use></s-group-form-use>
    <s-table-use></s-table-use>
  </div>
</template>

<script>

import SGroupFormUse from "./components/SGroupFormUse"
import STableUse from "./components/STableUse"

export default {
  name: 'App',
  components: { STableUse, SGroupFormUse },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
