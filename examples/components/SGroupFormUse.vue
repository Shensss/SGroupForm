<template>
  <div>
    <s-group-form
      ref="form"
      v-model="formData"
      :form="form"
      :props="{
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
          label: 'aaa：',
          key: 'aa',
          type: 'upload',
        }
      ],
      formData: {}
    }
  },
  methods: {
    onchange () {
      this.formData.aa = []
    },
    submit () {
      this.$refs.form.validateField('upload')
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
    this.$refs.form.validateField('aa')
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
