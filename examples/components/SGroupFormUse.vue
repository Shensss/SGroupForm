<template>
  <div>
    <s-group-form
        v-change.key.radio="changeRadio"
        v-change.label.范围选择="changeRange"
        :type="type"
        ref="form"
        v-model="formData"
        :form="form"
        :item-style="itemStyle"
        :props="props">
      <template slot="inputInsert-select">
        <p>提示：xxxx</p>
      </template>
      <template slot="inputAdd-select">
        <p>提示：xxxx</p>
      </template>
      <template slot="content-slot" slot-scope="data">
        <input type="text" v-model="formData.diy">
      </template>
    </s-group-form>
    <input type="text" @change="changeMarginBottom" v-model="marginBottom">
    <el-button @click="onchange">change</el-button>
    <el-button @click="submit">submit</el-button>
    <el-button @click="formData={}">clear</el-button>
    <el-button @click="add">add</el-button>
    <el-button @click="remove">remove</el-button>
  </div>
</template>

<script>
import area from './area.json'

export default {
  name: 'SGroupFormUse',
  data() {
    return {
      type: '',
      form: [
        {
          label: '范围选择',
          type: 'selectRange',
          key: ['month.min', 'month.max'],
          style: {
            width: '200px',
            marginBottom: '20px'
          },
          inputStyle: {
            width: '100px'
          },
          options: [
            {
              label: '咋',
              value: '[0,1000]',
            },
            {
              label: 'asa',
              value: '[100,1000]',
            }
          ]
        },
        {
          type: 'input',
          key: 'input',
          style: {
            width: '200px',
            marginBottom: '20px'
          },
          inputStyle: {
            width: '100%'
          },
          rule: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        {
          type: 'select',
          key: 'select',
          style: {
            width: 'calc(100% - 430px)'
          },
          inputStyle: {
            width: '100%'
          },
          options: [
            {
              label: '第一个',
              value: 1
            },
            {
              label: '第二个',
              value: 2
            }
          ]
        },
        {
          label: '单选',
          type: 'radio',
          key: 'radio',
          options: [
            {
              label: '第一个',
              value: 1
            },
            {
              label: '第二个',
              value: 2
            }
          ],
        },
        {
          show: (value) => {
            return value.radio === 1
          },
          label: '多选',
          type: 'checkbox',
          key: 'checkbox1',
          options: [
            {
              label: '第一个',
              value: 1
            },
            {
              label: '第二个',
              value: 2
            }
          ]
        },
        {
          label: '时间',
          type: 'datePicker',
          key: ['startTime', 'endTime'],
          props: {
            type: 'daterange',
            format: 'yyyy,MM,dd'
          }
        },
        {
          label: '上传',
          type: 'upload',
          key: 'upload',
          props: {
            accept: '.png,.jpg',
            length: 2,
            btnView: 'plus',
            view: 'image',
            remove: false
          }
        },
        {
          label: '富文本',
          type: 'richText',
          inputStyle: {
            height: "500px"
          }
        },
        {
          label: '自定义',
          key: 'diy',
          type: 'slot',
          slotName: 'slot',
          rule: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        }
      ],
      marginBottom: 10,
      formData: {
        month: {
          min: 0,
          max: 1000
        },
        input: 'xxxxx',
        startTime: '',
        endTime: '',
        radio: 1,
        checkbox1: '',
        checkbox2: '',
        upload: '[{"name":"aaa.png"}]'
      },
      itemStyle: {
        width: '100%',
        marginBottom: '20px'
      },
      props: {
        labelWidth: '120px',
        labelPosition: 'left'
      }
    }
  },
  methods: {
    changeRange(val) {
    },
    changeRadio() {
      if (this.formData.radio === 2) {
        this.$refs.form.getItem('input')[0].rule[0].required = false
        this.$refs.form.getItem('select')[0].options = [
          {
            label: '改版',
            value: 111
          }
        ]
      } else if (this.formData.radio === 1) {
        this.$refs.form.getItem('input')[0].rule[0].required = true
      }
    },
    changeMarginBottom() {
      this.itemStyle.marginBottom = this.marginBottom + 'px'
    },
    onchange() {
      this.type = 'readonly'
    },
    submit() {
      this.$refs.form.validate(vali => {
        console.log(vali, this.formData)
      })
    },
    remove() {
      const index = this.$refs.form.getIndex('abc')
      this.form.splice(index, 1)
    },
    add() {
      this.formData.month = 12121
      console.log(this.formData);
    }
  },
  mounted() {
  }
}
</script>
<style>
.red {
  width: 100%;
  background-color: red;
  height: 100px;
}
</style>
