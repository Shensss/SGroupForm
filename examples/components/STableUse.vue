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
                      treeProps:{children: 'children', hasChildren: 'hasChildren'}
                   }"
                   :columns="columns"
                   :table-data="tableData"
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
          key: 'aaa',
          type: 'fileView',
          props: {
            view: 'image',
            asyncConfig: {
              getType: 'string',
              domain: ''
            }
          }
        }
      ],
      tableData: [
        {
          aaa: 'http://121.40.133.115/digov/data/img/2021/05/图片 4_1620454100190.png',
          children: [
            {
              aaa: 'http://121.40.133.115/digov/data/img/2021/05/图片 4_1620454100190.png',
            }
          ]
        }
      ]
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
    }
  }
}
</script>

<style scoped>
.table {

}
</style>
