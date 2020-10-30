


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
option={
    UploadConfig: {             // 全局上传配置，也可以在item中传入
      path: '',                 // 接口地址
      data: [                   // 上传参数
        {                       // 上传参数1 文件
          key: 'fileArray',     // file对应的key
          value: 'file'         // file关键字对应上传的文件
        }
      ],
      domain: '',               // 接口返回文件路径url回显的前缀
      url: 'data.result.url',   // 接口返回文件路径url回显的取值
      name: 'data.result.name'  // 接口返回文件名称name回显的取值
    }
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
              show: 'formData.a===1',       // 控制显示隐藏，formData为内部关键字，可以传入函数
              label: '',                    // 名称
              labelAdd: 'aaa',              // label后面插入 支持传入html
              inputInsert: 'aaa',           // 输入框跟label之间插入 支持传入html
              inputAdd: 'aaa',              // 输入框后面插入 支持传入html
              key: 'a',                     // 字段 支持通过对象的path绑定值比如a、a.b、a[0] 
              type: 'input',                // 控件类型 支持列表列表在下方
              props: {},                    // 控件对应的属性
              options:[                     // 部分控件需要传入，见表格
                {
                    label:'',
                    value:''
                }
              ],
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
<tr>
    <td rowspan="4">code</td>
    <td>wrap:Boolean, // true/false 能否换行</td>
    <td rowspan="4">无</td>
</tr>
<tr>
    <td>readOnly:Boolean   // true/false 是否只读</td>
</tr>
<tr>
    <td>tabSize:Number   // 缩进距离，默认2</td>
</tr>
<tr>
    <td>fontSize:Number   // 字体大小，默认14</td>
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
props接收一个对象,可以不传，以下为默认值
```
props:{
    labelPostion:'left',  // left/right label文本的对齐方式
    labelWidth:'80px'     // label的宽度 当label宽度跟item宽度一样时可以呈现上下展示功能
    mapper:{              // options的映射字段
        label:'label',
        value:'value',
        children:'children' 
    },
    size:'medium'        //  medium / small / mini form内部组件的大小
}

```
事件指令v-change、v-blur、v-focus,以下以change为例
```
<s-group-form ref="form"
              :form="form"
              v-model="formData"
              :item-style="itemStyle"
              :props="props"
              v-change="change">
</s-group-form>
...
methods:{
    change(config,value){
        // config 当前触发事件的对应项配置
        // value 当前项的值
    }
}
...

```
事件指令修饰符 .number、.label 可以给指定的项绑定事件，number标识数组序号，label对应配置的label值即可
```
<s-group-form ref="form"
              :form="form"
              v-model="formData"
              :item-style="itemStyle"
              :props="props"
              v-change.number.0="change"
              v-change.label.姓名="change">
</s-group-form>
...
methods:{
    change(config,value){
        // config 当前触发事件的对应项配置
        // value 当前项的值
    }
}
...
```
slot使用说明 以下key为form对应的key
----
#####content-key
    需要配置type为slot
#####labelAdd-key
    也可在item项中传对应字段，item中的优先级高于slot
#####inputAdd-key
    也可在item项中传对应字段，item中的优先级高于slot
#####inputInsert-key
    也可在item项中传对应字段，item中的优先级高于slot


Api使用说明
---
#####getItem
    使用：this.$refs.form.getItem(key)
    功能：通过参数key可以获取指定项，用于修改或者查看
#####addItem
    使用：this.$refs.form.addItem(config,number)
    功能：动态增加item项，config传入参数跟初始化的form当中的规则相同,number，为序号可以不传，为往最后插入
#####removeItem
    使用：this.$refs.form.removeItem(key)
    功能：通过参数key匹配指定项删除
#####getIndex
    使用：this.$refs.form.getIndex(key)
    功能：通过参数key可以获取指定项的序号    