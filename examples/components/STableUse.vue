<template>
  <div class="table">
    <s-group-table type="edit"
                   :page-config="{
                      page:1,
                      pageSize:10,
                      total:100,
                      background:true
                   }"
                   :props="{
                      rowKey:'id',
                      defaultExpandAll:true,
                      treeProps:{children: 'children', hasChildren: 'hasChildren'}
                   }"
                   @change="changeRow"
                   :columns="columns"
                   :spanKey="['name','address']"
                   v-model="tableData"
                   :option="option">
    </s-group-table>
    <el-button @click="change">输出结果</el-button>
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
      option: {
        width: '100px',
        btns: [
          {
            name: '添加一行',
            handler: this.addRow
          }
        ]
      },
      columns: [
        {
          label: '项目名称',
          key: 'aa',
          type: 'dict',
          options: [{
            value: 2,
            label: '1212'
          }]
        },
        {
          label: '项目名称',
          key: 'name',
          type: 'input'
        },
        {
          label: '项目名称',
          key: 'address',
        }
      ],
      tableData: [{
        aa: 2,
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        id: 4,
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
    }
  },
  methods: {
    addRow() {
      this.tableData.push({})
    },
    change() {
      this.columns[0].options = [{
        value: 2,
        label: '1222212'
      }]
    },
    changeRow(col, row) {
      console.log(col, row);
    }
  }
}
</script>

<style scoped>
.table {

}
</style>
