<template>
  <div :is="'s-'+config.type"
       @input="change"
       @focus="focus"
       @blur="blur"
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
export default {
  name: 'selfTag',
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
