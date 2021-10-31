<template>
  <div id="app">
    <s-group-form-use></s-group-form-use>
    <STableUse></STableUse>
  </div>
</template>

<script>
import SGroupFormUse from './components/SGroupFormUse'
import STableUse from './components/STableUse'

export default {
  name: 'App',
  components: { SGroupFormUse, STableUse },
  data () {
    return {
      tableCol: [],
      data: []
    }
  },
  methods: {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  td {
    border: 1px solid #000;
  }
}
</style>
