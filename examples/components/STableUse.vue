<template>
  <div class="table">
    <s-group-table type="edit"
                   :page-config="{
                      page:1,
                      pageSize:10,
                      layout: 'total, sizes, prev, pager, next, jumper',
                      total:100,
                      background:true
                   }"
                   :props="{
                      rowKey:'id',
                      defaultExpandAll:true,
                      treeProps:{children: 'children', hasChildren: 'hasChildren'}
                   }"
                   @changePageNumber="changePageNumber"
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
            show: (row) => {
              return row.aa
            },
            name: '添加一行',
            handler: this.addRow
          }
        ]
      },
      columns: [
        {
          label: '项目名称',
          key: 'aa',
          type: 'input'
        },
        {
          label: '父级',
          type: 'columns',
          columns: [
            {
              label: '11',
              type: 'input',
              key: 'aa1',
            },
            {
              label: '22',
              type: 'input',
              key: 'aa2',
            }
          ]
        },
        {
          label: '时间',
          separator: '-',
          key: ['date', 'dat2'],
          props: {},
          type: 'time'
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
        aa1: 123,
        date: '2016-05-02',
        dat2: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        dat2: '2016-05-02',
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
  mounted() {
    console.log(1)
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
    }
  }
}
</script>

<style scoped>
.table {

}
</style>
