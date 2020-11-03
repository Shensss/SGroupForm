<template>
    <div class="checkTag">
        <template v-for="item in list">
            <el-tag v-if="item.check"
                    :key="item[mapper.value]"
                    :size="size"
                    :disable-transitions="true"
                    @close="remove(item)"
                    :closable="!readonly">
                {{item[mapper.label]}}
            </el-tag>
            <span  @click="pick(item)" v-else-if="!readonly" class="el-tag noColor"
                  :key="item[mapper.value]">
                {{item[mapper.label]}}
            </span>
        </template>
    </div>
</template>

<script>
import utils from '../../../utils'

export default {
  name: 'checkTag',
  inject: ['config', 'mapper'],
  data () {
    return {
      list: []
    }
  },
  props: {
    value: {
      type: Array,
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
    }
  },
  watch: {
    value: {
      deep: true,
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
      console.log(111)
      this.list = utils.lodash.cloneDeep(this.config.options)
      this.list.map(item => {
        if (this.value.indexOf(item[this.mapper.value]) >= 0) {
          item.check = true
        }
      })
    },
    pick (item) {
      this.$set(item, 'check', true)
      this.$emit('change', this.check)
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