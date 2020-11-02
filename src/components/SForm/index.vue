<template>
    <el-form class="s-form" :class="'form-'+type" :inline="true" v-bind="propsAll" :model="formData">
        <el-collapse v-if="Object.keys(groups).length>0" accordion>
            <el-collapse-item v-for="name in Object.keys(groups)" :key="name" :title="name">
                <template v-for="(item) in groups[name]">
                    <items v-if="showFunction(item.show)"
                           :key="item._code"
                           :config="item"
                           :props="propsAll"
                           :value="formData[item._code]"
                           :item-style="itemStyle"
                           @setValue="setValue">
                        <template :slot="'labelAdd-'+item._code" slot-scope="{option}">
                            <slot :name="'labelAdd-'+item.key" :option="option"></slot>
                        </template>
                        <template :slot="'inputInsert-'+item._code" slot-scope="{option}">
                            <slot :name="'inputInsert-'+item.key" :option="option"></slot>
                        </template>
                        <template :slot="'inputAdd-'+item._code" slot-scope="{option}">
                            <slot :name="'inputAdd-'+item.key" :option="option"></slot>
                        </template>
                        <template :slot="'content-'+item._code" slot-scope="{option}">
                            <slot :name="'content-'+item.key" :option="option"></slot>
                        </template>
                    </items>
                </template>
            </el-collapse-item>
        </el-collapse>
        <template v-for="(item) in unGroups">
            <items v-if="showFunction(item.show)"
                   :key="item._code"
                   :config="item"
                   :props="propsAll"
                   :value="formData[item._code]"
                   :item-style="itemStyle"
                   @setValue="setValue">
                <template :slot="'labelAdd-'+item._code" slot-scope="{option}">
                    <slot :name="'labelAdd-'+item.key" :option="option"></slot>
                </template>
                <template :slot="'inputInsert-'+item._code" slot-scope="{option}">
                    <slot :name="'inputInsert-'+item.key" :option="option"></slot>
                </template>
                <template :slot="'inputAdd-'+item._code" slot-scope="{option}">
                    <slot :name="'inputAdd-'+item.key" :option="option"></slot>
                </template>
                <template :slot="'content-'+item._code" slot-scope="{option}">
                    <slot :name="'content-'+item.key" :option="option"></slot>
                </template>
            </items>
        </template>
    </el-form>
</template>

<script>
import utils from '../../utils'
import Items from './items'

export default {
  name: 'sGroupForm',
  components: { Items },
  provide () {
    return {
      dict: this.dict
    }
  },
  data () {
    return {
      groups: {},
      unGroups: [],
      stageForm: [],
      dict: {}
    }
  },
  computed: {
    formData () {
      const formData = {}
      this.stageForm.map(item => {
        if (!item._code) {
          item._code = utils.custom.randomCode(12)
        }
        if (this.type === 'readonly') {
          let readType = item.type
          switch (item.type) {
            case 'input':
              readType = 'text'
              break
            case 'radio':
            case 'select':
            case 'checkbox':
            case 'switch':
              readType = 'dict'
              break
            case 'cascader':
              readType = 'treeDict'
              break
            case 'upload':
              readType = 'fileView'
              item.props = Object.assign({}, item.props)
              item.props.remove = false
              break
            case 'code':
              item.props = Object.assign({}, item.props)
              item.props.readonly = true
              break
            case 'richText':
              item.props = Object.assign({}, item.props)
              item.props.readonly = true
              break
            case 'slider':
              item.props = Object.assign({}, item.props)
              item.props.disabled = true
              break
            case 'inputNumber':
            case 'number':
              readType = 'number'
              break
            case 'colorPicker':
              item.props = Object.assign({}, item.props)
              item.props.disabled = true
              break
          }
          item.type = readType
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
        if (item.type === 'checkbox' && !utils.lodash.get(this.value, item.key)) {
          formData[item._code] = []
        }
      })
      return formData
    },
    propsAll () {
      return utils.lodash.merge({
        labelWidth: '80px',
        labelPosition: 'left',
        mapper: {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }, this.props)
    }
  },
  props: {
    form: Array,
    value: Object,
    itemStyle: Object,
    type: String,
    props: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.stageForm = utils.lodash.cloneDeep(this.form)
      this.initGroup()
    },
    initGroup () {
      const groups = utils.lodash.groupBy(this.stageForm, 'group')
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
    addItem (item, number) {
      const form = utils.lodash.cloneDeep(this.stageForm)
      if (number || number === 0) {
        form.splice(number, 0, item)
      } else {
        form.push(item)
      }
      this.stageForm = form
      this.initGroup()
    },
    removeItem (target) {
      utils.lodash.remove(this.stageForm, (item) => {
        return target === item.key
      })
      this.initGroup()
    },
    getIndex (key) {
      let index = null
      this.stageForm.map((item, i) => {
        if (item.key === key) {
          index = i
        }
      })
      return index
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
    }
  }
}
</script>

<style lang="scss" scoped>
.s-form {
    &.form-readonly {

    }

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
