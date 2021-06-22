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
                   :index="false"
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
          label: '序号',
          width: 60,
          key: 'index'
        },
        {
          label: '姓名',
          width: 80,
          type: 'columns',
          columns: [
            {
              label: '序号1',
              width: 60,
              key: 'index',
              type: 'columns',
              columns: [
                {
                  label: '序号1-1',
                  width: 60,
                  key: 'index'
                },
                {
                  label: '序号1-2',
                  width: 60,
                  key: 'index',
                  type: 'input'
                }
              ]
            },
            {
              label: '序号2',
              width: 60,
              key: 'index',
              type: 'input'
            }
          ]
        },
        {
          label: '性别',
          key: 'gender',
          width: 45,
          type: 'dict',
          options: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        }
      ],
      tableData: [
        {
          index: 2,
          name: '王小虎',
          sex: 1
        }
      ],
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
