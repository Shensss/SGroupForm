<template>
  <el-form-item :class="(props.labelPosition==='top'||props.labelWidth==='100%')?'full-content':''"
                :prop="config._code"
                :rules="config.rule"
                :style="style">
    <template slot="label"
              class="label">
      <b class="required"
         v-if="config.label">*</b>{{config.label}}
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
      <slot v-else
            :name="'inputInsert-'+config._code"></slot>
      <div v-if="singleTag.indexOf(config.type)>=0"
           :is="'el-'+config.type"
           :style="config.inputStyle"
           @change="change"
           @focus="focus"
           @blur="blur"
           :options="config.options"
           v-bind="config.props"
           v-model="model"></div>
      <div v-if="groupTag.indexOf(config.type)>=0"
           :is="'el-'+config.type.replace('Button','')+'-group'"
           @change="change"
           @focus="focus"
           @blur="blur"
           :style="config.inputStyle"
           v-model="model">
        <div :is="'el-'+config.type"
             v-bind="config.props"
             :key="index"
             v-for="(item,index) in config.options"
             :label="item[mapper.value]">
          {{item[mapper.label]}}
        </div>
      </div>
      <div v-if="optionsTag.indexOf(config.type)>=0"
           :is="'el-'+config.type"
           @change="change"
           @focus="focus"
           @blur="blur"
           v-bind="config.props"
           :style="config.inputStyle"
           v-model="model">
        <el-option v-bind="config.props"
                   :key="index"
                   v-for="(item,index) in config.options"
                   :label="item[mapper.label]"
                   :value="item[mapper.value]">
        </el-option>
      </div>
      <div v-if="selfTag.indexOf(config.type)>=0"
           :is="'s-'+config.type"
           @change="change"
           @focus="focus"
           @blur="blur"
           :style="config.inputStyle"
           v-bind="config.props"
           v-model="model">
      </div>
    </template>
    <span v-if="config.slotConfig&&config.slotConfig.inputAdd"
          v-html="config.slotConfig.inputAdd"></span>
    <slot v-else
          :name="'inputAdd-'+config._code"></slot>
  </el-form-item>
</template>

<script>
import formItem from '../../mixins/form.item'

export default {
  name: 'items',
  data () {
    return {
      singleTag: ['input', 'switch', 'slider', 'timePicker', 'datePicker', 'rate', 'colorPicker', 'inputNumber', 'cascader'],
      groupTag: ['radioButton', 'radio', 'checkbox'],
      optionsTag: ['select'],
      selfTag: ['text', 'button', 'fileView', 'upload', 'number', 'code', 'richText', 'dict', 'treeDict', 'checkTag', 'time']
    }
  },
  mixins: [formItem]
}
</script>
<style lang="scss" scoped>
.full-content {
  flex-wrap: wrap !important;

  /deep/ .el-form-item__content {
    width: 100%;
  }
}
</style>