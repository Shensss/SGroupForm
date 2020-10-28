<template>
    <el-form class="s-form" :inline="true" v-bind="props" :model="formData">
        <el-collapse v-if="Object.keys(groups).length>0" accordion>
            <el-collapse-item v-for="name in Object.keys(groups)" :key="name" :title="name">
                <template v-for="(item) in groups[name]">
                    <items v-if="showFunction(item.show)"
                           :key="item._code"
                           :config="item"
                           :value="formData[item._code]"
                           :item-style="itemStyle"
                           @setValue="setValue"></items>
                </template>
            </el-collapse-item>
        </el-collapse>
        <template v-for="(item) in unGroups">
            <items v-if="showFunction(item.show)"
                   :key="item._code"
                   :config="item"
                   :value="formData[item._code]"
                   :item-style="itemStyle"
                   @setValue="setValue"></items>
        </template>
    </el-form>
</template>

<script>
import utils from '../../utils'
import Items from './items'

export default {
  name: 'sGroupForm',
  components: { Items },
  data () {
    return {
      groups: {},
      unGroups: []
    }
  },
  computed: {
    formData () {
      const formData = {}
      this.form.map(item => {
        if (!item._code) {
          item._code = utils.custom.randomCode(12)
        }
        let itemInitValue = ''
        if (Array.isArray(item.key)) {
          const valArray = []
          item.key.map(k => {
            valArray.push(utils.lodash.get(this.value, k))
          })
          itemInitValue = valArray
        } else {
          itemInitValue = utils.lodash.get(this.value, item.key)
        }
        if (itemInitValue) {
          formData[item._code] = itemInitValue
        }
      })
      return formData
    }
  },
  props: {
    form: Array,
    value: Object,
    itemStyle: Object,
    props: Object
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initGroup()
    },
    initGroup () {
      const groups = utils.lodash.groupBy(this.form, 'group')
      this.groups = utils.lodash.pick(groups, Object.keys(groups).filter(key => key !== 'undefined'))
      this.unGroups = utils.lodash.pick(groups, Object.keys(groups).filter(key => key === 'undefined')).undefined
    },
    setValue (key, value) {
      const newValue = utils.lodash.cloneDeep(this.value)
      if (Array.isArray(value) && Array.isArray(key)) {
        key.map((k, index) => {
          utils.lodash.set(newValue, k, value[index])
        })
      } else {
        utils.lodash.set(newValue, key, value)
      }
      this.$emit('input', newValue)
    },
    showFunction (show) {
      if (show === undefined) {
        return true
      } else if (typeof show === 'function') {
        return show(this.value)
      } else if (typeof show === 'string') {
        try {
          const str = '((formData)=>' + show + ')(this.value)'
          return eval(str)
        } catch (e) {
          return false
        }
      }
    },
    change (config, val) {
      this.$emit('change', config, val)
    },
    getItem (target) {
      const result = []
      Object.keys(this.groups).map(key => {
        this.groups[key].map(item => {
          if (item.key === target || item.label === target) {
            result.push(item)
          }
        })
      })
      if (this.unGroups) {
        this.unGroups.map(item => {
          if (item.key === target || item.label === target) {
            result.push(item)
          }
        })
      }
      return result
    },
    setItem () {
      console.log(this.groups)
      console.log(this.unGroups)
    }
  }
}
</script>

<style lang="scss" scoped>
.s-form {
    &.el-form--inline {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .el-form-item {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            /deep/ .el-form-item__content {
                flex-grow: 1;
            }
        }
    }

    /deep/ .el-collapse {
        width: 100%;
    }

    /deep/ .el-form-item--mini {
        .el-form-item__label {
            height: 28px;

            .label {
                height: 28px;
            }
        }
    }

    /deep/ .el-form-item--small {
        .el-form-item__label {
            height: 32px;

            .label {
                height: 32px;
            }
        }
    }

    /deep/ .el-form--label-top .el-form-item__label {
        display: block;
    }

    /deep/ .is-required {
        .required {
            display: inline-block !important;
        }
    }

    /deep/ .el-form-item__label {
        height: 40px;

        &:before {
            display: none;
        }

        .required {
            display: none;
            color: #F56C6C;
            margin-right: 4px;
        }

        .label {
            min-width: 2px;
            display: inline-block;
            height: 40px;
        }
    }
}
</style>
