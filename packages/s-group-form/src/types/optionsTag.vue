<template>
  <div :is="'el-'+config.type"
       @change="change"
       @focus="focus"
       @blur="blur"
       v-bind="config.props"
       :style="config.inputStyle"
       v-model="model">
    <el-option v-bind="config.props"
               :key="index"
               v-for="(item,index) in config.options"
               :label="item[mapper.label]"
               :value="item[mapper.value]">
    </el-option>
  </div>
</template>

<script>
import types from "../mixins/types"

export default {
  name: "optionsTag",
  mixins: [types]
}
</script>
