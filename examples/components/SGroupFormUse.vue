<template>
  <s-group-form
      v-model="formData"
      :form="form"
      :item-style="itemStyle"
      :props="props"
  />
</template>

<script>
export default {
  name: 'SGroupFormUse',
  data () {
    return {
      form: [
        {
          label: '快速表单',
          type: 'input',
          key: 'name'
        },
        {
          label: '下拉菜单',
          type: 'select',
          key: 'select',
          options: [
            {
              label: '北京烤鸭',
              value: '1'
            },
            {
              label: '南京板鸭',
              value: '2'
            }
          ]
        },
        {
          label: '富文本',
          type: 'richText',
          key: 'richText',
          inputStyle: {
            height: '400px'
          }
        }
      ],
      formData: {},
      itemStyle: {
        marginBottom: '10px'
      },
      props: {
        labelWidth: '120px',
        labelPosition: 'right',
        size: 'small'
      }
    }
  }
}
</script>
