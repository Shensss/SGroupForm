<template>
  <div class="item-cell">
    <single-tag v-if="item.type&&singleTag.indexOf(item.type)>=0"
                :mapper="mergeMapper(item)"
                @change="$emit('change',item,scope.row)"
                v-model="model"
                :config="item">
    </single-tag>
    <group-tag v-if="item.type&&groupTag.indexOf(item.type)>=0"
               :mapper="mergeMapper(item)"
               @change="$emit('change',item,scope.row)"
               v-model="model"
               :config="item">
    </group-tag>
    <options-tag v-if="item.type&&optionsTag.indexOf(item.type)>=0"
                 :mapper="mergeMapper(item)"
                 @change="$emit('change',item,scope.row)"
                 v-model="scope.row[item.key]"
                 :config="item">
    </options-tag>
    <self-tag v-if="item.type&&selfTag.indexOf(item.type)>=0"
              :mapper="mergeMapper(item)"
              @change="$emit('change',item,scope.row)"
              v-model="model"
              :config="item">
      <template :name="'content-'+item._code" :option="item" :data="data" slot-scope="data">
        <slot :name="'content-'+item._code" :option="item" :data="data"></slot>
      </template>
    </self-tag>
  </div>
</template>

<script>
import config from '../../config'
import SingleTag from '../../s-group-form/src/types/singleTag'
import GroupTag from '../../s-group-form/src/types/groupTag'
import OptionsTag from '../../s-group-form/src/types/optionsTag'
import SelfTag from '../../s-group-form/src/types/selfTag'

export default {
  name: 'item-cell',
  data() {
    return {
      ...config
    }
  },
  components: {SelfTag, OptionsTag, GroupTag, SingleTag},
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
        this.$emit('input', val)
      }
    }
  },
  props: {
    value: [Object, Array, String, Number, Boolean, Array],
    mergeMapper: Function,
    item: Object
  }
}
</script>

<style scoped lang="scss">
.item-cell {
}
</style>
