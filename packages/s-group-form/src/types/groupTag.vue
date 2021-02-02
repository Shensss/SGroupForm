<template>
  <div :is="'el-'+config.type.replace('Button','')+'-group'"
       @change="change"
       @focus="focus"
       @blur="blur"
       :style="config.inputStyle"
       v-model="model">
    <div :is="'el-'+config.type"
         v-bind="config.props"
         :key="index"
         v-for="(item,index) in config.options"
         :label="item[mapper.value]">
      {{ item[mapper.label] }}
    </div>
  </div>
</template>

<script>
import types from '../mixins/types'

export default {
  name: "groupTag",
  mixins: [types]
}
</script>
