<template>
  <div>
    <s-group-form
        ref="form"
        v-model="formData"
        :type="type?'readonly':''"
        :form="form"
        :item-style="itemStyle"
        :props="props">
    </s-group-form>
    <el-button @click="onchange">change</el-button>
    <el-button @click="submit">submit</el-button>
    <el-button @click="formData={}">clear</el-button>
    <el-button @click="add">add</el-button>
    <el-button @click="remove">remove</el-button>
  </div>
</template>

<script>
export default {
  name: 'SGroupFormUse',
  data () {
    return {
      type: false,
      form: [
        {
          label: '申报时间',
          key: ['applyTimeRange.min', 'applyTimeRange.max'],
          type: 'datePicker',
          inputStyle: { width: '100%' },
          props: {
            valueFormat: 'timestamp',
            type: 'daterange',
            rangeSeparator: '-',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          }
        },
        {
          label: '下拉菜单',
          type: 'image',
          key: 'select',
          props: {
            view: 'image',
            fileGetPath: '/node-szzt/file'
          },
          options: []
        }
      ],
      formData: {
        select: '[{"name":"cli-icon-text.png","type":"base64","url":32}]'
      },
      itemStyle: {
        width: '25%',
        marginBottom: '10px'
      },
      props: {
        labelWidth: '120px',
        // labelPosition: 'right',
        // size: 'small',
        mapper: {
          label: 'aaa'
        }
      }
    }
  },
  methods: {
    onchange () {
      this.$refs.form.setOptions('select', [
        {
          Class: '1',
          value: 1
        },
        {
          Class: '2',
          value: 2
        },
        {
          Class: '3',
          value: 3
        }
      ])
    },
    submit () {
      console.log(this.formData)
      this.$refs.form.validate(vali => {
        console.log(vali)
      })
    },
    remove () {
      const index = this.$refs.form.getIndex('abc')
      this.form.splice(index, 1)
    },
    add () {
      this.form = this.form.concat([{
        key: 'abc',
        type: 'input'
      }])
    }
  },
  mounted () {
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
