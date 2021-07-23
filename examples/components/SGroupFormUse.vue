<template>
  <div>
    <s-group-form
      :type="type"
      v-model="formData"
      :form="form"
      :item-style="itemStyle"
      :props="props"
    ></s-group-form>
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
  data () {
    return {
      type: '',
      form: [
        {
          label: '选择',
          key: 'check',
          type: 'checkbox',
          options: [
            {
              label: 1,
              value: 1
            }
          ]
        }
      ],
      formData: {

      },
      itemStyle: {
        width: '500px',
        marginBottom: '20px'
      },
      props: {
        labelWidth: '120px',
        labelPosition: 'left',
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
      console.log(this.formData);
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
