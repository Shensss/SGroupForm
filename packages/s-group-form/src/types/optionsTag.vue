<template>
  <div
    :is="'el-'+config.type"
    @change="change"
    @focus="focus"
    @blur="blur"
    v-bind="config.props"
    v-model="model"
  >
    <el-option
      :key="index"
      v-for="(item,index) in config.options"
      v-bind="item"
      :label="item[mapper.label]"
      :value="item[mapper.value]"
    ></el-option>
  </div>
</template>

<script>
export default {
  name: 'optionsTag',
  props: {
    value: String | Number,
    config: Object,
    mapper: Object,
    inputStyle: Object
  },
  computed: {
    model: {
      set (val) {
        this.$emit('changeValue', val)
        this.$emit('input', val)
      },
      get () {
        return this.value
      }
    }
  },
  methods: {
    change (value) {
      if (this.config.change) {
        this.$emit('change', value)
      }
    },
    focus () {
      if (this.config.focus) {
        this.$emit('focus', this.value)
      }
    },
    blur () {
      if (this.config.blur) {
        this.$emit('blur', this.value)
      }
    }
  }
}
</script>
