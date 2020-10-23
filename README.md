


安装
```
npm install s-group-form
```
使用
```
import sGroupForm from 's-group-form'·
```
支持全局注册组件
在main.js中
```
Vue.use(sGroupForm,option)
```
option可不传,或者传以下参数
```
import PubSub from 'pubsub-js' // 需要安装
option={
  Pubsub: Pubsub// 使用pubsub时需要传入
}
```
组件中使用
```
<s-group-form :form="form"
              v-model="formData"
              :item-style="itemStyle"
              :props="props">
</s-group-form>
```
接收form/formDta/item-style/props 4个属性
form接收一个数组
```
form:[
        {
              show: 'formData.a===1'        // 控制显示隐藏，formData为内部关键字，可以传入函数
              label: '',                    // 名称
              key: 'a',                     // 字段 支持通过对象的path绑定值比如a、a.b、a[0] 
              type: 'input',                // 控件类型 支持列表列表在下方
              props: {},                    // 控件对应的属性
              options:[                     // 部分控件需要传入，见表格
                {
                    label:'',
                    value:''
                }
              ]
              style:{},                     // form-item项的样式 覆盖itemStyle
              inputStyle: {},               // form-item项内部区域的样式
              rule: [                       // 表单验证规则
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
              ]
        }
    ]
```
<table>
<tr>
    <td>type类型</td>
    <td>props属性</td>
    <td>额外参数</td>
</tr>
<tr>
    <td>input</td>
    <td rowspan="12">同element</td>
    <td>无</td>
</tr>
<tr>
    <td>switch</td>
    <td>无</td>
</tr>
<tr>
    <td>slider</td>
    <td>无</td>
</tr>
<tr>
    <td>timePicker</td>
    <td>无</td>
</tr>
<tr>
    <td>datePicker</td>
    <td>无</td>
</tr>
<tr>
    <td>rate</td>
    <td>无</td>
</tr>
<tr>
    <td>colorPicker</td>
    <td>无</td>
</tr>
<tr>
    <td>inputNumber</td>
    <td>无</td>
</tr>
<tr>
    <td>cascader</td>
    <td>无</td>
</tr>
<tr>
    <td>select</td>
    <td>需要传options</td>
</tr>
<tr>
    <td>cascader</td>
    <td>需要传options</td>
</tr>
<tr>
    <td>checkbox</td>
    <td>需要传options</td>
</tr>
<tr>
    <td rowspan="4">fileView</td>
    <td>accept:String, // '.png,.jpg,.xls,.pdf'等逗号拼接</td>
    <td rowspan="4">无</td>
</tr>
<tr>
    <td> remove:Boolean, // true/false 能否移除</td>
</tr>
<tr>
    <td>view:String   // 'file'/'image' 预览模式</td>
</tr>
<tr>
    <td> size:Number   // 文件大小，单位M 默认50M</td>
</tr>
<tr>
    <td rowspan="2">upload</td>
    <td>remove:Boolean, // true/false 能否移除</td>
    <td rowspan="2">无</td>
</tr>
<tr>
    <td>view:String   // 'file'/'image' 预览模式</td>
</tr>
</table>

-----
formDta接收一个对象，可以给对应的key赋值
```
formData:{
    a:1         // 值会自动对应初始化表单的值
}

```
itemStyle接收一个对象，form-item公用的内联样式
```
itemStyle:{
    marginRight:'10px',
    width:'20%'
}

```
props接收一个对象,element中 el-form的可用属性均可
```
props:{
    labelPostion:'top',
    labelWidth:'10px'
}

```