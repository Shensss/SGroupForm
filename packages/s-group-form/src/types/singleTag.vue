<template>
  <div :is="'el-'+config.type"
       @input="change"
       @focus="focus"
       @blur="blur"
       :options="config.options"
       v-bind="config.props"
       v-model="model"></div>
</template>

<script>
export default {
  name: "singleTag",
  props: {
    value: String | Number,
    config: Object,
    mapper: Object,
    inputStyle: Object
  },
  computed: {
    model: {
      set(val) {
        this.$emit('changeValue', val || '')
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
