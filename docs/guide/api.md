所有的api都需要通过vue获取表单实例调用，使用this.$ref['form名称'].api
假设form的ref实例名称为 form
```
this.$refs.form.getItem(key)
```
功能：通过参数key可以获取指定项，用于修改或者查看
```
this.$refs.form.addItem(config,number)
```
功能：动态增加item项，config传入参数跟初始化的form当中的规则相同,number，为序号可以不传，为往最后插入
```
this.$refs.form.removeItem(key)
```
通过参数key匹配指定项删除
```
this.$refs.form.getIndex(key)
```
通过参数key可以获取指定项的序号

```
this.$refs.form.validate
this.$refs.form.validateField
this.$refs.form.resetFields
this.$refs.form.clearValidate
```
表单验证相关 同element
