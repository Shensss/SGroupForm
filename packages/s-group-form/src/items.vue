<template>
  <el-form-item :class="(props.labelPosition==='top'||props.labelWidth==='100%')?'full-content':''"
                :prop="config._code"
                :rules="config.rule"
                :label-width="config.labelWidth"
                :size="config.size"
                :style="style">
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
                  v-model="model"
                  :config="config"
                  @change="change"
                  @blur="blur"
                  @focus="focus">
      </single-tag>
      <group-tag v-if="groupTag.indexOf(config.type)>=0"
                 :mapper="mapper"
                 v-model="model"
                 :config="config"
                 @change="change"
                 @blur="blur"
                 @focus="focus">

      </group-tag>
      <options-tag v-if="optionsTag.indexOf(config.type)>=0"
                   :mapper="mapper"
                   v-model="model"
                   :config="config"
                   @change="change"
                   @blur="blur"
                   @focus="focus">

      </options-tag>
      <self-tag v-if="selfTag.indexOf(config.type)>=0"
                :mapper="mapper"
                v-model="model"
                :config="config"
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
import formItem from './mixins/form.item'
import SingleTag from "./types/singleTag"
import GroupTag from "./types/groupTag"
import OptionsTag from "./types/optionsTag"
import SelfTag from "./types/selfTag"

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
  mixins: [formItem]
}
</script>
<style lang="scss" scoped>
.full-content {
  flex-wrap: wrap !important;
}
</style>
<style>
.full-content .el-form-item__content {
  width: 100%;
}
</style>
