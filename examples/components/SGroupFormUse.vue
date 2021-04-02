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
  data() {
    return {
      type: '',
      form: [
        {
          label: '上传',
          type: 'cascader',
          key: 'month',
          props: {
            props: {
              multiple: true
            }
          },
          options: [
            {
              label: '中',
              value: 1,
              children: [
                {
                  label: '中1',
                  value: 11,
                },
                {
                  label: '中2',
                  value: 12,
                }
              ]
            },
            {
              label: 'da',
              value: 2,
              children: [
                {
                  label: 'da1',
                  value: 21,
                  children: [
                    {
                      label: 'da11',
                      value: 111
                    }
                  ]
                }
              ]
            },
            {
              label: 'xx',
              value: 3,
              children: [
                {
                  label: 'xx1',
                  value: 31,
                }
              ]
            }
          ]
        }
      ],
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
    onchange() {
      this.type = !this.type
    },
    submit() {
      this.$refs.form.validate(vali => {
        console.log(vali)
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
