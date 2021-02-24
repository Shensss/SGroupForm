<template>
  <el-form-item :class="(props.labelPosition==='top'||props.labelWidth==='100%')?'full-content':''"
                :prop="config._code"
                :rules="config.rule"
                :label-width="config.labelWidth"
                :size="config.size">
    <template slot="label"
              v-if="config.label"
              class="label">
      <b class="required" v-if="config.label&&type!=='readonly'&&required">*</b>{{ config.label }}
      <template v-if="props.suffix">:</template>
      <span v-if="config.slotConfig&&config.slotConfig.labelAdd"
            v-html="config.slotConfig.labelAdd"></span>
      <slot v-else
            :name="'labelAdd-'+config._code"
            :option="config"></slot>
    </template>
    <template v-if="config.type==='slot'">
      <slot :name="'content-'+config._code"
            :option="config"></slot>
    </template>
    <template v-else>
      <div v-if="config.slotConfig&&config.slotConfig.inputInsert"
           v-html="config.slotConfig.inputInsert"></div>
      <slot v-else :name="'inputInsert-'+config._code"></slot>
      <single-tag v-if="singleTag.indexOf(config.type)>=0"
                  :mapper="mapper"
                  :value="value"
                  @changeValue="changeModel"
                  :input-style="config.inputStyle"
                  :config="config"
                  @change="change"
                  @blur="blur"
                  @focus="focus">
      </single-tag>
      <group-tag v-if="groupTag.indexOf(config.type)>=0"
                 :mapper="mapper"
                 :input-style="config.inputStyle"
                 :value="value"
                 @changeValue="changeModel"
                 :config="config"
                 @change="change"
                 @blur="blur"
                 @focus="focus">
      </group-tag>
      <options-tag v-if="optionsTag.indexOf(config.type)>=0"
                   :mapper="mapper"
                   :value="value"
                   @changeValue="changeModel"
                   :config="config"
                   :input-style="config.inputStyle"
                   @change="change"
                   @blur="blur"
                   @focus="focus">
      </options-tag>
      <self-tag v-if="selfTag.indexOf(config.type)>=0"
                :mapper="mapper"
                :input-style="config.inputStyle"
                :value="value"
                :config="config"
                @changeValue="changeModel"
                @change="change"
                @blur="blur"
                @focus="focus">
        <template :name="'content-'+config._code" :option="config" :data="data" slot-scope="data">
          <slot :name="'content-'+config._code" :option="config" :data="data"></slot>
        </template>
      </self-tag>
    </template>
    <span v-if="config.slotConfig&&config.slotConfig.inputAdd"
          v-html="config.slotConfig.inputAdd"></span>
    <slot v-else :name="'inputAdd-'+config._code"></slot>
  </el-form-item>
</template>

<script>
import SingleTag from "./styled/singleTag"
import GroupTag from "./styled/groupTag"
import OptionsTag from "./styled/optionsTag"
import SelfTag from "./styled/selfTag"
import difference from 'lodash-es/difference'
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  name: 'items',
  components: { SelfTag, OptionsTag, GroupTag, SingleTag },
  data() {
    return {
      singleTag: ['input', 'switch', 'slider', 'timePicker', 'datePicker', 'rate', 'colorPicker', 'inputNumber', 'cascader'],
      groupTag: ['radioButton', 'radio', 'checkbox'],
      optionsTag: ['select'],
      selfTag: ['text', 'button', 'fileView', 'upload', 'number', 'code', 'richText', 'dict', 'treeDict', 'checkTag', 'time', 'selectRange']
    }
  },
  props: {
    formData: Object,
    type: String,
    value: String | Number,
    config: Object,
    mergeStyle: Object,
    props: Object
  },
  computed: {
    required() {
      let required = false
      this.config.rule && this.config.rule.map(item => {
        if (item.required) {
          required = true
        }
      })
      return required
    },
    mapper() {
      const allMapper = cloneDeep(this.props.mapper) || {
        label: 'label',
        value: 'value',
        children: 'children'
      }
      const selfMapper = this.config.mapper || {}
      return Object.assign({}, allMapper, selfMapper)
    }
  },
  methods: {
    changeModel(val) {
      if (this.config.props && !this.config.props.multiple && Array.isArray(val)) {
        const current = difference(val, this.value)
        if (this.config.join) {
          this.$emit('setValue', this.config._code, this.config.key, current)
        } else {
          this.$emit('setValue', this.config._code, this.config.key, current)
        }
      } else {
        if (this.config.join) {
          this.$emit('setValue', this.config._code, this.config.key, val.join(this.config.join))
        } else {
          this.$emit('setValue', this.config._code, this.config.key, val)
        }
      }
    },
    change(value) {
      if (this.config.change) {
        this.config.change(this.config, value, this.formData)
      }
    },
    focus() {
      if (this.config.focus) {
        this.config.focus(this.config, this.value, this.formData)
      }
    },
    blur() {
      if (this.config.blur) {
        this.config.blur(this.config, this.value, this.formData)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.full-content {
  flex-wrap: wrap !important;
}
</style>
