<DemoTable title="props参数说明" :tableBody="tableBody" :tableHead="tableHead"/>

<script>
  export default {
    data() {
      return {
        tableHead: `参数 | 说明 | 类型 | 可选值 | 默认值`,
        tableBody: [
          `labelWidth | label的宽度 | String | css宽度均可 | -`,
          `labelPosition    | label文字位置 | String | top / left / right | -`,
          `...    | 大部分element  form组件属性 | - | -`,
        ],
      }
    }
  }
</script>
