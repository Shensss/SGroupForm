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
import area from './area.json'

export default {
  name: 'SGroupFormUse',
  data() {
    return {
      type: '',
      form: [
        {
          label: '上传',
          type: 'richText',
          key: 'month',
          inputStyle: {
            height: '500px'
          }
        },
        {
          label: '上传',
          type: 'upload',
          key: 'a',
          props: {
            view: 'image'
          }
        },
        {
          props: {
            placeholder: '政策区域',
            props: {
              label: 'name',
              value: 'code',
              children: 'childs',
              checkStrictly: true,
            }
          },
          type: 'cascader',
          key: 'chooseType56Id',
          mapper: {
            label: 'name',
            value: 'code'
          },
          options: area
        },
      ],
      formData: {
        month: ''
      },
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
