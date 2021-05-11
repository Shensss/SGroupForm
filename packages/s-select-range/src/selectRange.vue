<template>
    <el-select v-model="model" @change="change" :size="size" :clearable="clearable" :placeholder="placeholder"
               :disabled="disabled">
        <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item[mapper.label]"
                :value="item[mapper.value]">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'SSelectRange',
  data () {
    return {}
  },
  props: {
    size: String,
    clearable: Boolean,
    placeholder: String,
    disabled: Boolean,
    value: Array,
    options: Array,
    mapper: {
      type: Object,
      default () {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    }
  },
  computed: {
    model: {
      get () {
        if (this.value && (this.value[1] || this.value[0])) {
          return JSON.stringify(this.value)
        } else {
          return ''
        }
      },
      set (val) {
        if (val) {
          this.$emit('input', JSON.parse(val))
        } else {
          this.$emit('input', '')
        }
      }
    }
  },
  methods: {
    change (val) {
      this.$emit('change', this.config, val)
    }
  },
  mounted(){
    console.log(this.mapper);
  }
}
</script>

<style lang="scss" scoped>
.selectRange {

}
</style>
