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
    <el-button @click="submit">change</el-button>
    <el-button @click="formData={}">clear</el-button>
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
          type: 'fileView',
          key: 'select',
          props: {
            remove: true
          },
          mapper: {
            label: 'Class'
          },
          options: [
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
          ]
        },
        {
          label: '下拉菜单',
          type: 'select',
          key: 'select',
          options: [
            {
              aaa: '11',
              value: 1
            },
            {
              aaa: '22',
              value: 2
            },
            {
              aaa: '33',
              value: 3
            }
          ]
        },
        {
          label: '下拉菜单2',
          type: 'code',
          key: 'aaa',
          props: {
            mode: 'javascript'
          },
          style: {
            width: '100%'
          }
        }
      ],
      formData: {
        name: 'aaa.png&&aa.png',
        select: 'asd.png&&aa.png'
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
      console.log(this.formData)
    },
    submit () {
      console.log(this.formData)
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
