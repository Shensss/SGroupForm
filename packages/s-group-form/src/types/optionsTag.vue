<template>
  <div :is="'el-'+config.type"
       @change="change"
       @focus="focus"
       @blur="blur"
       v-bind="config.props"
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
export default {
  name: "optionsTag",
  props: {
    value: String | Number,
    config: Object,
    mapper: Object,
    inputStyle: Object
  },
  computed: {
    model: {
      set(val) {
        this.$emit('changeValue', val)
      },
      get() {
        return this.value
      }
    }
  },
  methods: {
    change(value) {
      if (this.config.change) {
        this.$emit('change', value)
      }
    },
    focus() {
      if (this.config.focus) {
        this.$emit('change', this.value)
      }
    },
    blur() {
      if (this.config.blur) {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>
