安装

```
npm install s-group-form
```

全局引入

```
import SGroupForm from 's-group-form'·
```

在main.js中

```
Vue.use(SGroupForm,option)
```

option可不传,或者传以下参数(全局设置上传时使用)

```
option={
    UploadConfig: {
      getType:'JSON',
      path: '',
      data: [ 
        { 
          key: 'fileArray',
          value: 'file'
        }
      ],
      domain: '',
      listPath: 'data.resultList',
      urlKey: 'fileUrl',
      nameKey: 'originalFilename'
    }
}
```

<DemoTable title="UploadConfig参数说明" :tableBody="tableBody" :tableHead="tableHead"/>

<script>
  export default {
    data() {
      return {
        tableHead: `参数 | 说明 | 类型 | 可选值 | 默认值`,
        tableBody: [
          `getType | 获取参数格式 | String | JSON / string | —`,
          `path    | 接口地址 | String | medium / small / mini | —`,
          `data    | 上传参数 | array | value:'file'为formData转换过后的文件 | —`,
          `domain  | 文件需要拼接的前缀地址 | String | - | —`,
          `listPath| 接口结构path | String | - | —`,
          `urlKey  | 获取接口返回的文件url地址字段  | String |- | —`,
          `nameKey | 获取接口返回的文件名称字段 | String | - | —`,
        ],
      }
    },

  }
</script>
