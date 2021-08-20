<template>
  <div>
    <s-group-form
        v-model="formData"
        :form="form"
        :props="{
        mapper:{
          label:'name',
          value:'id'
        }
        }"
    ></s-group-form>
    <el-button @click="onchange">change</el-button>
    <el-button @click="submit">submit</el-button>
    <el-button @click="formData={}">clear</el-button>
  </div>
</template>

<script>

export default {
  name: 'SGroupFormUse',
  data () {
    return {
      form: [
        {
          label: '投放终端：',
          key: 'aa',
          type: 'upload',
          props: {
            btnProps: {
              type: 'text',
              icon: '',
              text: '上传'
            }
          },
          style: {
            width: '160px'
          },
          rule: [
            {
              required: true,
              message: '请选择'
            }
          ]
        },
        {
          show: (formData) => {
            return formData.aa && formData.aa.indexOf('pc') !== -1
          },
          key: 'pcUrl',
          type: 'input',
          props: {
            clearable: true,
            placeholder: '请输入web应用地址'
          },
          style: {
            width: 'calc(100%-200px)'
          },
          rule: [
            {
              required: true,
              message: '请输入web应用地址'
            }
          ]
        },
        {
          show: (formData) => {
            return !formData.aa || formData.aa.indexOf('pc') === -1
          },
          key: 'pcUrl',
          type: 'input',
          props: {
            clearable: true,
            disabled: true,
            placeholder: '请输入web应用地址'
          },
          style: {
            width: 'calc(100%-200px)'
          },
          rule: [
            {
              required: true,
              message: '请输入web应用地址'
            }
          ]
        }
      ],
      formData: {
        aa: []
      }
    }
  },
  methods: {
    onchange () {
      console.log(this.formData)
    },
    submit () {
      this.$refs.form.validate(vali => {
        console.log(vali, this.formData)
      })
    },
    remove () {
      const index = this.$refs.form.getIndex('abc')
      this.form.splice(index, 1)
    },
    add () {
      this.formData.month = 12121
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
