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
                      treeProps:{
                        children:'children',
                      }
                    }"
                   @changePageNumber="changePageNumber"
                   :columns="columns"
                   :index="false"
                   v-model="tableData"
                   :option="option">
    </s-group-table>
<button @click="change"></button>
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
          separator: '-',
          key: ['name', 'index']
        },
        {
          label: '姓名1',
          key: 'name1'
        },
        {
          label: '性别',
          key: 'sex',
          width: 111,
          type: 'input',
          props: {
            mapper: {
              label: 'a',
              value: 'b'
            }
          }, // options默认是label value
          options: [
            {
              a: '男',
              b: 1
            },
            {
              a: '女',
              b: 0
            }
          ]
        }
      ],
      tableData: [
        {
          id: 111,
          index: 2,
          name: '王小虎',
          name1: '王小虎',
          sex: 1,
          children: [
            {
              id: 12133,
              index: 2,
              name: '王小虎',
              name1: '王小虎',
              sex: 1,
            }
          ]
        },
        {
          id: 11211,
          index: 2,
          name: '王小虎',
          name1: '王小虎',
          sex: 1,
          children: [
            {
              id: 33,
              index: 2,
              name: '王小虎',
              name1: '王小虎',
              sex: 1,
            }
          ]
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
