<template>
  <div class="table">
    <s-group-form v-model="query" :form="queryForm"></s-group-form>
    <s-group-table
        :columns="columns"
        type="edit"
        :index="false"
        v-model="tableData">
    </s-group-table>
    <button @click="addRow">+</button>
    <button @click="change">ssss</button>
    <!--  option 操作列 -->
    <!--  props  element的表格属性 -->
    <!--  page-config 分页 -->
    <!--  index 序号 -->
    <!--  spanKey 需要跨行的字段 -->
  </div>
</template>

<script>
import SGroupTable from '../../packages/s-group-table/src/index'

export default {
  name: 'STableUse',
  components: {
    SGroupTable
  },
  data() {
    return {
      query: {},
      queryForm: [],
      columns: [
        {
          label: '类型名称',
          type:'input',
          key: 'name',
        },
        {
          label: '类型名称',
          key: 'type',
          type: 'select',
          options: [
            {
              label: '类型1',
              value: '类型1'
            },
            {
              label: '类型2',
              value: '类型2'
            },
            {
              label: '类型3',
              value: '类型3'
            }
          ]
        },
        {
          label: '类型名称',
          key: 'time',
          type: 'datePicker'
        },
      ],
      tableData: [],
    }
  },
  methods: {
    addRow() {
      this.tableData.push({})
    },
    change() {
      console.log(this.tableData);
    },
    changePageNumber() {
      console.log(11)
    },
    changeRow(col, row) {
      console.log(col, row);
    },
    selectChange(val) {
      console.log(val);
    }
  }
}
</script>

<style scoped>
.table {

}
</style>
