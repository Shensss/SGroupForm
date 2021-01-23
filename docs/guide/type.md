由于组件基于element,type中同element类型组件需要自行引入，防止多次打包造成项目提交增加
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
    <td rowspan="3">upload</td>
    <td>remove:Boolean, // true/false 能否移除</td>
    <td rowspan="3">无</td>
</tr>
<tr>
    <td>asyncConfig:Object   // 异步配置</td>
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
<tr>
    <td rowspan="4">richText</td>
    <td>height:Number, // 300 编辑器高度</td>
    <td rowspan="4">无</td>
</tr>
<tr>
    <td>plugins:Object   // 插件</td>
</tr>
<tr>
    <td>toolbar:Object   // 工具条</td>
</tr>
<tr>
    <td>asyncConfig:Object   // 异步配置</td>
</tr>
</table>
