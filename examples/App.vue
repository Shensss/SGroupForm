<template>
  <div id="app">
    <s-group-form-use></s-group-form-use>
    <s-layout></s-layout>
  </div>
</template>

<script>

import SGroupFormUse from "./components/SGroupFormUse"
import STableUse from "./components/STableUse"
import SLayout from "./components/SLayout"

export default {
  name: 'App',
  components: { SLayout, STableUse, SGroupFormUse },
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
