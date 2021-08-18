<template>
  <div
      :is="'el-'+config.type.replace('Button','')+'-group'"
      @change="change"
      @focus="focus"
      @blur="blur"
      v-model="model"
      v-bind="config.props"
  >
    <div
        :is="'el-'+config.type"
        :key="index"
        v-bind="item"
        v-for="(item,index) in config.options"
        :label="item[mapper.value]"
    >{{ item[mapper.label] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'groupTag',
  props: {
    value: [Number, String, Array, Boolean],
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
