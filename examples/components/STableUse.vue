<template>
  <div class="table">
    <s-group-table :columns="columns" :table-data="tableData" :option="option"></s-group-table>
    <el-button @click="result">输出结果</el-button>
  </div>
</template>

<script>
export default {
  name: "STableUse",
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
          label: '姓名',
          key: 'a',
          type: 'upload',
          props: {
            view: 'image',
            remove: true
          }
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        }
      ],
      tableData: [
        {
          a: '123',
          b: '456'
        },
        {
          a: '123',
          b: '456'
        },
        {
          a: '123',
          b: '456'
        },
        {},
        {}
      ]
    }
  },
  methods: {
    addRow() {
      this.tableData.push({})
    },
    result() {
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
.table {

}
</style>
