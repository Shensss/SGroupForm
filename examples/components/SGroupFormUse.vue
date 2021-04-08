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
              label: '中1',
              value: 1,
              children: [
                {
                  label: '中11',
                  value: 123,
                },
                {
                  label: '中22',
                  value: 412,
                }
              ]
            },
            {
              label: '中11',
              value: 12,
              children: [
                {
                  label: '中111',
                  value: 123,
                },
                {
                  label: '中222',
                  value: 231,
                }
              ]
            },
            {
              label: '中33',
              value: 13,
              children: [
                {
                  label: '中333',
                  value: 4444,
                },
                {
                  label: '中3333',
                  value: 666,
                }
              ]
            },
          ]
        },
        {
          label: '上传',
          type: 'upload'
        }
      ],
      formData: {
        month: [
          [
            1,
            123
          ],
          [
            1,
            412
          ],
          [
            12,
            123
          ],
          [
            12,
            231
          ],
          [
            13,
            4444
          ],
          [
            13,
            666
          ]
        ]
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
