<template>
  <s-group-form
      v-model="formData"
      :form="form"
      :item-style="itemStyle"
      :props="props">
    <template slot="content-aaa">
      <div class="red"></div>
    </template>
  </s-group-form>
</template>

<script>
export default {
  name: 'SGroupFormUse',
  data() {
    return {
      form: [
        {
          label: '下拉菜单',
          type: 'dict',
          key: 'select',
          options: [
            {
              label: "aaa",
              value: 0
            }
          ]
        },
        {
          label: '下拉菜单',
          type: 'slot',
          key: 'aaa',
          style: {
            width: '100%'
          }
        }
      ],
      formData: {
        name: 'aaa.png&&aa.png',
        select: 0
      },
      itemStyle: {
        width: '25%',
        marginBottom: '10px',
      },
      props: {
        labelWidth: '120px',
        // labelPosition: 'right',
        // size: 'small'
      }
    }
  },
  methods: {
    onchange() {
      console.log(this.formData)
    }
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
