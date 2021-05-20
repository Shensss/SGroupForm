<template>
  <div class="table">
    <s-group-table type="edit"
                   :columns="columns"
                   :table-data="tableData"
                   :option="option">
    </s-group-table>
    <el-button @click="result">输出结果</el-button>
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
          key: 'projectName',
          width: 100,
          fixed: 'left',
          type: 'text'
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
          props: {
            placeholder: '请输入名称'
          },
          options: [
            {
              label: '张三',
              value: '123'
            }
          ]
        },
        {
          label: '性别',
          key: 'b',
          type: 'input',
          width: '200',
          isQuery: true,
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
          projectName: '爱啥啥空间打开大家阿斯利康大家埃里克就看见撒旦绿卡建档立卡时间的拉升阶段垃圾的卢卡斯的链接',
          a: '123',
          b: '456'
        },
        {
          projectName: 123123,
          a: '123',
          b: '456'
        },
        {
          projectName: 123123,
          a: '123',
          b: '456'
        }
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
