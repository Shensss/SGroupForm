<template>
  <el-input class="number"
            :size="size"
            v-model="myValue"
            :readonly="readonly"
            :placeholder="placeholder"
            :disabled="disabled"
            v-number-input.float="float"
            @change="$emit('change')"></el-input>
</template>

<script>
import './index'
export default {
  name: 'sNumber',
  data () {
    return {
      myValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: String,
    float: Number,
    disabled: Boolean,
    size: String,
    readonly: Boolean
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        this.myValue = newValue
      }
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.number {
}
</style>
