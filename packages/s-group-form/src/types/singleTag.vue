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
  name: 'singleTag',
  data () {
    return {}
  },
  props: {
    value: String | Number,
    config: Object,
    mapper: Object,
    inputStyle: Object
  },
  computed: {
    model: {
      set (val) {
        if (this.config.props && this.config.props.valueFormat === 'timestamp' && !val) {
          this.$emit('changeValue', val)
        } else {
          this.$emit('changeValue', val || '')
        }
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
        this.$emit('change', this.value)
      }
    },
    blur () {
      if (this.config.blur) {
        this.$emit('change', this.value)
      }
    }
  }
}
</script>
