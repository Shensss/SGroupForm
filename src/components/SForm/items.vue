<template>
    <el-form-item :prop="config._code" :rules="config.rule" :style="style">
        <template slot="label" class="label">
            <b class="required" v-if="config.label">*</b>{{config.label}}
            <span v-if="config.labelAdd" v-html="config.labelAdd"></span>
            <slot v-else :name="'labelAdd-'+config._code" :option="config"></slot>
        </template>
        <template v-if="config.type==='slot'">
            <slot :name="'content-'+config._code" :option="config"></slot>
        </template>
        <template v-else>
            <div v-if="config.inputInsert" v-html="config.inputInsert"></div>
            <slot v-else :name="'inputInsert-'+config._code"></slot>
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
                     :label="item[mapper.value]">
                    {{item[mapper.label]}}
                </div>
            </div>
            <div v-if="optionsTag.indexOf(config.type)>=0" :is="'el-'+config.type"
                 @change="change"
                 @focus="focus"
                 @blur="blur"
                 :style="config.inputStyle"
                 v-model="model">
                <el-option v-bind="config.props"
                           :key="index"
                           v-for="(item,index) in config.options"
                           :label="item[mapper.label]"
                           :value="item[mapper.value]">
                </el-option>
            </div>
            <div v-if="selfTag.indexOf(config.type)>=0" :is="'s-'+config.type"
                 @change="change"
                 @focus="focus"
                 @blur="blur"
                 :style="config.inputStyle"
                 v-bind="config.props"
                 v-model="model">
            </div>
        </template>
        <span v-if="config.inputAdd" v-html="config.inputAdd"></span>
        <slot v-else :name="'inputAdd-'+config._code"></slot>
    </el-form-item>
</template>

<script>
import formItem from '../../mixins/form.item'
import SUpload from '../SUpload/upload'
import SFileView from '../SFile/fileView'
import SCode from '../SAce/ace'

export default {
  name: 'items',
  components: { SCode, SFileView, SUpload },
  data () {
    return {
      singleTag: ['input', 'switch', 'slider', 'timePicker', 'datePicker', 'rate', 'colorPicker', 'inputNumber', 'cascader'],
      groupTag: ['radio', 'checkbox'],
      optionsTag: ['select'],
      selfTag: ['text', 'button', 'fileView', 'upload', 'number', 'code', 'richText']
    }
  },
  mixins: [formItem]
}
</script>