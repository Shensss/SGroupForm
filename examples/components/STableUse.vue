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
                   @changePageNumber="changePageNumber"
                   @changeRow="changeRow"
                   :columns="columns"
                   :index="false"
                   v-model="tableData"
                   :option="options">
      <template #name="{row,config}">
      </template>
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
      options: {
        width: '220px',
        btns: [
          {
            name: '编辑',
            code: 'edit',
            icon: 'el-icon-view',
            props: {
              type: 'default',
              size: 'mini'
            },
          },
          {
            name: '删除',
            code: 'delete',
            icon: 'el-icon-delete',
            props: {
              type: 'default',
              size: 'mini'
            },
          }
        ]
      },
      columns: [
        {
          label: '编号',
          key: 'id'
        },
        {
          label: '类型名称',
          key: 'name',
          type: 'slot'
        },
        {
          label: '状态',
          key: 'hidden',
          type: 'switch',
          props: {
            // activeColor: '#13ce66',
            // inactiveColor: '#ff4949',
            activeValue: 0,
            inactiveValue: 1
          }
        },
        {
          label: '更新时间',
          key: 'created',
          width: '165px',
          align: 'center',
          type: 'time',
          props: {
            format: 'yyyy-MM-dd HH:mm:ss'
          }
        }
      ],
      tableData: [
        {
          id: 111,
          index: 2,
          name: '王小虎',
          name1: '王小虎',
          time: '2020-12-12',
          sex: 1,
          children: [
            {
              id: 12133,
              index: 2,
              time: '2020-12-12',
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
          time: '2020-12-12',
          name1: '王小虎',
          sex: 1,
          children: [
            {
              id: 33,
              index: 2,
              time: '2020-12-12',
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
