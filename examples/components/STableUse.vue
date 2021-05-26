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
                   :spanCol="[1,2]"
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
          key: 'name',
          type: 'input'
        },
        {
          label: '项目名称',
          key: 'address',
        }
      ],
      tableData: [{
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
      this.tableData = [
        {
          aaa: 'http://121.40.133.115/digov/data/img/2021/05/物源云协_1620616243884.png',
        }
      ]
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
