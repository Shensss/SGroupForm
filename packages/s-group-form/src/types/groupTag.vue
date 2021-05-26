<template>
  <div :is="'el-'+config.type.replace('Button','')+'-group'"
       @change="change"
       @focus="focus"
       @blur="blur"
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
export default {
  name: 'groupTag',
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
