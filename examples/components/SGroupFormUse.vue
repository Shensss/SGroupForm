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
      type: true,
      form: [
        {
          label: '下拉菜单',
          type: 'cascader',
          key: 'select',
          props: {
            width: '200px',
            height: '200px',
            fileGetPath: '/node-szzt/file'
          },
          options: []
        }
      ],
      formData: {
        select: [1, 2]
      },
      itemStyle: {
        width: '25%',
        marginBottom: '10px'
      },
      props: {
        labelWidth: '120px',
        mapper: {
          label: 'Class',
          value: 'code'
        }
      }
    }
  },
  methods: {
    onchange () {
      this.type = true
    },
    submit () {
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
    this.$refs.form.setOptions('select', [
      {
        Class: '张三',
        code: 1,
        children: [
          {
            Class: '张三2',
            code: 2
          }
        ]
      }
    ])
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
