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
      <template slot="inputInsert-select">
        <p>提示：xxxx</p>
      </template>
      <template slot="inputAdd-select">
        <p>提示：xxxx</p>
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
          label: '富文本',
          key:'aaa',
          type: 'richText',
          inputStyle: {
            height: "500px"
          }
        }
      ],
      marginBottom: 10,
      formData: {
        month: {
          min: 0,
          max: 1000
        },
        input: 'xxxxx',
        startTime: '',
        endTime: '',
        radio: 1,
        checkbox1: '',
        checkbox2: '',
        upload: '[{"name":"aaa.png"}]'
      },
      itemStyle: {
        width: '100%',
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
