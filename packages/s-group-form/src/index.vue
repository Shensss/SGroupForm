<template>
  <el-form ref="instance"
           class="s-form"
           :class="'form-'+type"
           :inline="true"
           v-bind="propsAll"
           :model="formData">
    <div class="group" :key="name" v-for="name in Object.keys(groups)">
      <p class="group-title">{{ name }}</p>
      <template v-for="(item) in groups[name]">
        <items v-if="showFunction(item.show)"
               :key="item._code"
               :config="item"
               :type="type"
               :form-data="formData"
               :props="propsAll"
               :value="formData[item._code]"
               :mergeStyle="mergeStyle(item.style)"
               @setValue="setValue">
          <template :slot="'labelAdd-'+item._code"
                    slot-scope="{option}">
            <slot v-if="item.slotName"
                  :name="'labelAdd-'+item.slotName"
                  :option="option"></slot>
            <slot v-else
                  :name="'labelAdd-'+item.key"
                  :option="option"></slot>
          </template>
          <template :slot="'inputInsert-'+item._code"
                    slot-scope="{option}">
            <slot v-if="item.slotName"
                  :name="'inputInsert-'+item.slotName"
                  :option="option"></slot>
            <slot v-else
                  :name="'inputInsert-'+item.key"
                  :option="option"></slot>
          </template>
          <template :slot="'inputAdd-'+item._code"
                    slot-scope="{option}">
            <slot v-if="item.slotName"
                  :name="'inputAdd-'+item.slotName"
                  :option="option"></slot>
            <slot v-else
                  :name="'inputAdd-'+item.key"
                  :option="option"></slot>
          </template>
          <template :slot="'content-'+item._code"
                    slot-scope="{option}">
            <slot v-if="item.slotName"
                  :name="'content-'+item.slotName"
                  :option="option"></slot>
            <slot v-else :name="'content-'+item.key" :option="option"></slot>
          </template>
        </items>
      </template>
    </div>
    <template v-for="(item) in unGroups">
      <items v-if="showFunction(item.show)"
             :key="item._code"
             :config="item"
             :type="type"
             :form-data="formData"
             :props="propsAll"
             :value="formData[item._code]"
             :mergeStyle="mergeStyle(item.style)"
             @setValue="setValue">
        <template :slot="'labelAdd-'+item._code"
                  slot-scope="{option}">
          <slot v-if="item.slotName"
                :name="'labelAdd-'+item.slotName"
                :option="option"></slot>
          <slot v-else
                :name="'labelAdd-'+item.key"
                :option="option"></slot>
        </template>
        <template :slot="'inputInsert-'+item._code"
                  slot-scope="{option}">
          <slot v-if="item.slotName"
                :name="'inputInsert-'+item.slotName"
                :option="option"></slot>
          <slot v-else
                :name="'inputInsert-'+item.key"
                :option="option"></slot>
        </template>
        <template :slot="'inputAdd-'+item._code"
                  slot-scope="{option}">
          <slot v-if="item.slotName"
                :name="'inputAdd-'+item.slotName"
                :option="option"></slot>
          <slot v-else
                :name="'inputAdd-'+item.key"
                :option="option"></slot>
        </template>
        <template :slot="'content-'+item._code" slot-scope="{option,data}">
          <slot v-if="item.slotName" :name="'content-'+item.slotName" :option="option"></slot>
          <slot v-else :name="'content-'+item.key" :option="option" :data="data"></slot>
        </template>
      </items>
    </template>
  </el-form>
</template>

<script>
import { randomCode } from '../../utils'
import Items from './styled/items'
import get from 'lodash-es/get'
import set from 'lodash-es/set'
import remove from 'lodash-es/remove'
import merge from 'lodash-es/merge'
import cloneDeep from 'lodash-es/cloneDeep'
import pick from 'lodash-es/pick'
import groupBy from 'lodash-es/groupBy'

export default {
  name: 'SGroupForm',
  components: { Items },
  provide() {
    return {
      dict: this.dict
    }
  },
  data() {
    return {
      groups: {},
      unGroups: [],
      stageForm: [],
      dict: {}
    }
  },
  computed: {
    propsAll() {
      const props = cloneDeep(this.props)
      if (props.labelPosition === 'top') {
        props.labelWidth = '100%'
        props.labelPosition = 'left'
      }
      return merge({
        labelWidth: '80px',
        labelPosition: 'left'
      }, props)
    },
    formData() {
      const formData = {}
      this.stageForm.map(item => {
        if (!item._code) {
          item._code = randomCode(12)
        }
        if (this.type === 'readonly') {
          this.setRead(item)
        }
        let itemInitValue = ''
        if (Array.isArray(item.key)) {
          const valArray = []
          item.key.map(k => {
            valArray.push(get(this.value, k))
          })
          itemInitValue = valArray
        } else {
          if (item.join) {
            itemInitValue = get(this.value, item.key).split(item.join)
          } else {
            itemInitValue = get(this.value, item.key)
          }
        }

        if (itemInitValue !== '') {
          formData[item._code] = itemInitValue
        }
        if (item.type === 'checkbox' && !get(this.value, item.key)) {
          formData[item._code] = []
        }
      })
      return formData
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
  mounted() {
    if (!sessionStorage.getItem('icon')) {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = '//at.alicdn.com/t/font_427398_7ehmbnq6i8.js'
      document.body.appendChild(s)
      sessionStorage.setItem('icon', true)
    }
    this.init()
  },
  watch: {
    form() {
      this.init()
    },
    type() {
      this.init()
    }
  },
  methods: {
    mergeStyle(selfStyle) {
      const itemStyle = cloneDeep(this.itemStyle)
      if (selfStyle) {
        return merge(itemStyle, selfStyle)
      } else {
        return itemStyle
      }
    },
    init() {
      if (!this.form) return
      this.stageForm = cloneDeep(this.form)
      this.initGroup()
      this.initValue()
    },
    initGroup() {
      const groups = groupBy(this.stageForm, 'group')
      this.groups = pick(groups, Object.keys(groups).filter(key => key !== 'undefined'))
      this.unGroups = pick(groups, Object.keys(groups).filter(key => key === 'undefined')).undefined
    },
    initValue() {
      const newValue = cloneDeep(this.value)
      this.stageForm.map(item => {
        if (item.initValue) {
          const value = item.initValue
          const key = item.key
          if (Array.isArray(value) && Array.isArray(key)) {
            key.map((k, index) => {
              if (!get(newValue, k)) {
                set(newValue, k, value[index])
              }
            })
          } else if (Array.isArray(key)) {
            key.map((k) => {
              if (!get(newValue, k)) {
                set(newValue, k, value)
              }
            })
          } else {
            if (!get(newValue, key)) {
              set(newValue, key, value)
            }
          }
        }
      })
      this.$emit('input', Object.assign({}, this.value, newValue))
    },
    setRead(item) {
      let readType = item.type
      switch (item.type) {
        case 'input':
        case 'inputNumber':
        case 'number':
          readType = 'text'
          break
        case 'timePicker':
          item.props = Object.assign({
            format: item.props ? item.props.format || 'HH:mm:ss' : 'HH:mm:ss'
          }, item.props)
          readType = 'time'
          break
        case 'datePicker':
          item.props = Object.assign({
            format: item.props ? item.props.format || 'HH:mm:ss' : 'yyyy-MM-dd'
          }, item.props)
          readType = 'time'
          break
        case 'checkTag':
          item.props = Object.assign({}, item.props)
          item.props.readonly = true
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
        case 'colorPicker':
          item.props = Object.assign({}, item.props)
          item.props.disabled = true
          break
      }
      item.type = readType
    },
    setValue(code, key, value) {
      this.$set(this.formData, code, value)
      const newValue = cloneDeep(this.value)
      if (Array.isArray(value) && Array.isArray(key)) {
        key.map((k, index) => {
          set(newValue, k, value[index])
        })
      } else if (Array.isArray(key)) {
        key.map((k) => {
          set(newValue, k, value)
        })
      } else {
        set(newValue, key, value)
      }
      this.$emit('input', Object.assign({}, this.value, newValue))
    },
    showFunction(show) {
      if (show === undefined) {
        return true
      } else if (typeof show === 'function') {
        return show(this.value)
      } else if (typeof show === 'string') {
        try {
          const str = '((formData)=>' + show + ')(this.value)'
          // eslint-disable-next-line no-eval
          return eval(str)
        } catch (e) {
          return false
        }
      }
    },
    change(config, val) {
      this.$emit('change', config, val)
    },
    addItem(item, number) {
      const form = cloneDeep(this.stageForm)
      if (number || number === 0) {
        form.splice(number, 0, item)
      } else {
        form.push(item)
      }
      this.stageForm = form
      this.initGroup()
    },
    removeItem(target) {
      remove(this.stageForm, (item) => {
        return target === item.key
      })
      this.initGroup()
    },
    getIndex(key) {
      let index = null
      this.stageForm.map((item, i) => {
        if (item.key === key) {
          index = i
        }
      })
      return index
    },
    getItem(target) {
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
    validate(callback) {
      return this.$refs.instance.validate(callback)
    },
    validateField(props, callback) {
      return this.$refs.instance.validateField(props, callback)
    },
    resetFields() {
      return this.$refs.instance.resetFields()
    },
    clearValidate(props) {
      return this.$refs.instance.clearValidate(props)
    }
  }
}
</script>
<style>
.s-form .el-textarea__inner {
  font-family: 微软雅黑, Microsoft YaHei UI, serif;
}

.s-form .el-form-item .el-form-item__content {
  flex: 1;
}

.s-form .el-form-item--mini .el-form-item__label {
  height: 28px;
}

.s-form .el-form-item--mini .label {
  height: 28px;
}

.s-form .el-form-item--small .el-form-item__label {
  height: 32px;
}

.s-form .el-form-item--small .label {
  height: 32px;
}

.s-form .el-form-item__label {
  height: 40px;
}

.s-form .el-form-item__label:before {
  display: none;
}

.s-form .el-form-item__label .required {
  display: none;
  margin-right: 4px;
  color: #f56c6c;
}

.s-form .el-form-item__label .label {
  display: inline-block;
  height: 40px;
  min-width: 2px;
}

.s-form .el-form--label-top .el-form-item__label {
  display: block;
}

.s-form .is-required .required {
  display: inline-block !important;
}
</style>
<style lang="scss" scoped>
.s-form {
  .group {
    width: 100%;

    .group-title {
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid #ccc;
    }
  }

  &.el-form--inline {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .el-form-item {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
    }
  }
}
</style>
