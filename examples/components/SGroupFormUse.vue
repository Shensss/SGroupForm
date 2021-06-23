<template>
  <div>
    <s-group-form
        v-change.key.radio="changeRadio"
        v-change.label.范围选择="changeRange"
        :type="type"
        ref="form"
        v-model="formData"
        :form="form"
        :item-style="itemStyle"
        :props="props">
      <template slot="inputAdd-select">
        <div>提示：Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores doloremque eveniet nulla praesentium quas quod reiciendis suscipit, unde? Alias doloribus eius ex facere id illo laudantium nulla perferendis repellat sunt?</div>
      </template>
      <template slot="content-slot" slot-scope="data">
        <input type="text" v-model="formData.diy">
      </template>
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
          group: '111',
          label: '富文本',
          key: 'select',
          type: 'cascader',
          props: {},
          inputStyle: {
            width: '100px'
          },
          options: [
            {
              label: 'a',
              value: 1,
              children: [
                {
                  label: 'a1',
                  value: 2
                }
              ]
            }
          ],
          rule: [
            {
              required: true,
              message: '必填的哦',
              trigger: 'blur'
            }
          ]
        }
      ],
      marginBottom: 10,
      formData: {},
      itemStyle: {
        width: '500px',
        marginBottom: '20px'
      },
      props: {
        labelWidth: '120px',
        labelPosition: 'left'
      }
    }
  },
  methods: {
    changeRange(val) {
    },
    changeRadio() {

    },
    changeMarginBottom() {
      this.itemStyle.marginBottom = this.marginBottom + 'px'
    },
    onchange() {
      this.type = 'readonly'
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
