<template>
    <el-form-item :prop="config._code" :rules="config.rule" :style="style">
        <span slot="label" class="label"><b class="required" v-if="config.label">*</b>{{config.label}}</span>
        <div v-if="singleTag.indexOf(config.type)>=0" :is="'el-'+config.type"
             :style="config.inputStyle"
             @change="change"
             @focus="focus"
             @blur="blur"
             :options="config.options"
             v-bind="config.props"
             v-model="model"></div>
        <div v-if="groupTag.indexOf(config.type)>=0" :is="'el-'+config.type+'-group'"
             @change="change"
             @focus="focus"
             @blur="blur"
             :style="config.inputStyle"
             v-model="model">
            <div :is="'el-'+config.type"
                 v-bind="config.props"
                 :key="index"
                 v-for="(item,index) in config.options"
                 :label="item.value">
                {{item.label}}
            </div>
        </div>
        <div v-if="optionsTag.indexOf(config.type)>=0" :is="'el-'+config.type"
             :style="config.inputStyle"
             v-model="model">
            <el-option v-bind="config.props"
                       :key="index"
                       v-for="(item,index) in config.options"
                       :label="item.label"
                       :value="item.value">
            </el-option>
        </div>
        <div v-if="selfTag.indexOf(config.type)>=0" :is="'s-'+config.type"
             :style="config.inputStyle"
             v-bind="config.props"
             v-model="model">
        </div>
    </el-form-item>
</template>

<script>
import formItem from '../../mixins/form.item'
import SUpload from '../SUpload/upload'
import SFileView from '../SFile/fileView'

export default {
  name: 'items',
  components: { SFileView, SUpload },
  data () {
    return {
      singleTag: ['input', 'switch', 'slider', 'timePicker', 'datePicker', 'rate', 'colorPicker', 'inputNumber', 'cascader'],
      groupTag: ['radio', 'checkbox'],
      optionsTag: ['select'],
      selfTag: ['text', 'button', 'fileView', 'upload', 'number']
    }
  },
  mixins: [formItem]
}
</script>