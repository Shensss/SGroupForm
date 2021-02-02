<template>
  <div :is="'s-'+config.type"
       @input="change"
       @focus="focus"
       @blur="blur"
       :style="config.inputStyle"
       :options="config.options"
       :mapper="mapper"
       v-bind="config.props"
       v-model="model">
    <template slot-scope="data">
      <slot :name="'content-'+config._code" :option="config" :data="data"></slot>
    </template>
  </div>
</template>

<script>
import types from "../mixins/types"

export default {
  name: "selfTag",
  mixins: [types]
}
</script>
