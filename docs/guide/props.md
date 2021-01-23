<DemoTable title="form参数说明" :tableBody="tableBody" :tableHead="tableHead"/>

<script>
  export default {
    data() {
      return {
        tableHead: `参数 | 说明 | 类型 | 可选值 | 默认值`,
        tableBody: [
          `getType | 获取参数格式 | String | JSON / string | -`,
          `path    | 接口地址 | String | medium / small / mini | -`,
          `data    | 上传参数 | array | value:'file'为formData转换过后的文件 | -`,
          `domain  | 文件需要拼接的前缀地址 | String | - | -`,
          `listPath| 接口结构path | String | - | -`,
          `urlKey  | 获取接口返回的文件url地址字段  | String |- | -`,
          `nameKey | 获取接口返回的文件名称字段 | String | - | -`,
        ],
      }
    }
  }
</script>