<template>
  <el-table-column v-bind="item" d>
    <template v-if="item.type!=='columns'||!item.type" slot-scope="scope">
      <div :style="item.style" v-if="Array.isArray(item.key)">
             <span class="item-cell" :keu="'s'+si" v-for="(val,si) in item.key">
                  <slot v-if="item.type&&item.type==='slot'" :name="item.key" :row="scope.row"
                        :config="item"></slot>
                  <item-cell v-if="item.type&&item.type!=='slot'"
                             :merge-mapper="mergeMapper"
                             :item="item"
                             :value="tableData[scope.$index][val]"
                             @change="value=>valueChange(value,scope.$index,item.key)"></item-cell>
                  <template v-if="item.separator&&si!==item.key.length-1">{{ item.separator }}</template>
             </span>
      </div>
      <slot v-if="item.type&&item.type==='slot'" :name="item.key" :row="tableData[scope.$index]"
            :config="item"></slot>
      <item-cell v-if="item.type&&item.type!=='slot'"
                 :merge-mapper="mergeMapper"
                 :item="item"
                 :value="tableData[scope.$index][item.key]"
                 @change="value=>valueChange(value,scope.$index,item.key)"></item-cell>
    </template>
    <template v-if="item.type==='columns'">
      <columns v-for="sitem in item.columns" :item="sitem" :mergeMapper="mergeMapper" v-model="tableData"></columns>
    </template>
  </el-table-column>
</template>

<script>
import ItemCell from "./item-cell";
import get from 'lodash-es/get'
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  name: 'columns',
  components: {ItemCell},
  data() {
    return {}
  },
  computed: {
    tableData: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  props: {
    item: Object,
    mergeMapper: Function,
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    get,
    valueChange(value, index, key) {
      const tableData = cloneDeep(this.tableData)
      this.$set(tableData[index], key, value)
      this.tableData = tableData
    }
  }
}
</script>

<style scoped lang="scss">
.columns {
}
</style>
