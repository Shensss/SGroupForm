<template>
  <div :is="'el-'+config.type"
       :style="config.inputStyle"
       @input="change"
       @focus="focus"
       @blur="blur"
       :options="config.options"
       v-bind="config.props"
       v-model="model"></div>
</template>

<script>
import types from "../mixins/types"

export default {
  name: "singleTag",
  mixins: [types]
}
</script>
