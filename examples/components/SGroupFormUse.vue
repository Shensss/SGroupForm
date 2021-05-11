<template>
  <div>
    <s-group-form
        ref="form"
        v-model="formData"
        :form="form"
        :item-style="itemStyle"
        :props="props">
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
          label: '上传',
          type: 'selectRange',
          key: ['month.min','month.max'],
          style: {
            width: '25%',
            marginBottom: '20px'
          },
          inputStyle: {
            height: '500px',
            width: '100%'
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
      ],
      marginBottom: 10,
      formData: {},
      itemStyle: {
        width: '25%',
        marginBottom: '10px'
      },
      props: {
        labelWidth: '120px'
      }
    }
  },
  methods: {
    changeMarginBottom() {
      this.itemStyle.marginBottom = this.marginBottom + 'px'
    },
    onchange() {
      this.type = !this.type
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
