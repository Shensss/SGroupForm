<template>
  <el-table-column :key="Math.random()" v-bind="item">
    <template v-if="item.type!=='columns'||!item.type" slot-scope="scope">
      <div :style="item.style" v-if="Array.isArray(item.key)">
        <span class="item-cell" :key="'s'+si" v-for="(val,si) in item.key">
          <slot
              v-if="item.type&&item.type==='slot'"
              :name="item.key"
              :row="scope.row"
              :config="item"
          ></slot>
          <item-cell
              v-if="item.type&&item.type!=='slot'"
              :merge-mapper="mergeMapper"
              :item="item"
              :scope="scope"
              :value="scope.row[val]"
              @change="value=>valueChange(value,scope.row,item.key)"
          ></item-cell>
          <template v-if="item.separator&&si!==item.key.length-1">{{ item.separator }}</template>
        </span>
      </div>
      <slot
          v-if="item.type&&item.type==='slot'"
          :name="item.key"
          :row="scope.row"
          :config="item"
      ></slot>
      <item-cell
          v-if="item.type&&item.type!=='slot'"
          :merge-mapper="mergeMapper"
          :item="item"
          :scope="scope"
          v-model="scope.row[item.key]"
          @change="value=>valueChange(value,scope.row,item.key)"
      ></item-cell>
    </template>
    <template v-if="item.type==='columns'">
      <columns
          :tableProps="tableProps"
          :key="ssi"
          v-for="(sitem,ssi) in item.columns"
          :item="sitem"
          :mergeMapper="mergeMapper"
          v-model="tableData"
      ></columns>
    </template>
  </el-table-column>
</template>

<script>
import ItemCell from "./item-cell";
import get from 'lodash-es/get'
import cloneDeep from 'lodash-es/cloneDeep'
import {treeToTransForm, transformToTree} from "../../utils";

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
    tableProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    get,
    valueChange(value, row, valueKey) {
      const tableData = cloneDeep(this.tableData)
      const key = this.tableProps.rowKey || Object.keys(row)[0]
      const platData = treeToTransForm(tableData, this.tableProps.treeProps)
      const item = platData.find(item => item[key] === row[key])
      this.$set(item, valueKey, value)
      this.$emit('changeRow', item)
      this.tableData = transformToTree(platData, this.tableProps.treeProps)
    }
  }
}
</script>

<style scoped lang="scss">
.columns {
}
</style>
