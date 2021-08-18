<template>
  <div class="checkTag">
    <span v-if="showAllPick&&flag" class="el-tag noColor" @click="pickAll">全选</span>
    <span v-if="showAllPick&&!flag" class="el-tag noColor" @click="pickNone">全不选</span>
    <template v-for="item in list">
      <el-tag v-if="item.check"
              :key="item[mapper.value]"
              :size="size"
              :disable-transitions="true"
              @close="remove(item)"
              :closable="!readonly">
        {{ item[mapper.label] }}
      </el-tag>
      <span @click="pick(item)" v-else-if="!readonly" class="el-tag noColor"
            :key="item[mapper.value]">
                {{ item[mapper.label] }}
            </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'checkTag',
  data () {
    return {
      list: [],
      flag: true
    }
  },
  props: {
    value: {
      type: [Array, String],
      default () {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    options: Array,
    showAllPick: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
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
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler () {
        this.init()
      }
    }
  },
  computed: {
    check () {
      return this.list.filter((item) => {
        return item.check
      })
    }
  },
  methods: {
    init () {
      this.list = this.options
      this.list.map(item => {
        if (this.value.indexOf(item[this.mapper.value]) >= 0) {
          this.$set(item, 'check', true)
        }
      })
    },
    pickAll () {
      this.list.map(item => {
        this.$set(item, 'check', true)
      })
      this.flag = !this.flag
      this.$emit('change', this.check)
      this.setValue()
    },
    pickNone () {
      this.list.map(item => {
        this.$set(item, 'check', false)
      })
      this.flag = !this.flag
      this.$emit('change', this.check)
      this.setValue()
    },
    pick (item) {
      if (this.multiple) {
        this.$set(item, 'check', true)
        this.$emit('change', this.check)
      } else {
        this.check.map(item => {
          item.check = false
        })
        this.$set(item, 'check', true)
        this.$emit('change', this.check)
      }
      this.setValue()
    },
    remove (item) {
      this.$set(item, 'check', false)
      this.$emit('change', this.check)
      this.setValue()
    },
    setValue () {
      const value = []
      this.check.map(item => {
        value.push(item[this.mapper.value])
      })
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkTag {
  .el-tag {
    margin-right: 8px;
    cursor: pointer;

    &.noColor {
      background-color: transparent;
      border-color: transparent;
      color: #333;
    }
  }
}
</style>
