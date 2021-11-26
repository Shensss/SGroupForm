<template>
	<div>
		<s-group-form
			ref="form"
			v-model="formData"
			:form="form"
			:props="{
        }"
		>
			<template #content-aa>
				<input v-model="formData.aa" type="text">
			</template>
		</s-group-form>
		<el-button @click="onchange">change</el-button>
		<el-button @click="submit">submit</el-button>
		<el-button @click="formData={}">clear</el-button>
	</div>
</template>

<script>

export default {
	name: 'SGroupFormUse',
	data () {
		return {
			form: [
				{
					label: 'aaa：',
					key: 'aa1',
					type: 'upload',
					props: {
						clearable: true,
					},
					rule: [
						{
							required: true,
							trigger: 'change'
						}
					]
				},
				{
					label: 'aaa：',
					key: 'aa',
					type: 'richText',
					props: {
						size: 0
					},
					rule: [
						{
							required: true,
							trigger: 'change'
						}
					]
				}
			],
			formData: {
				aa: '<p>123131</p>'
			}
		}
	},
	methods: {
		onchange () {
			this.formData.aa = ''
		},
		submit () {
			console.log(this.formData)
		},
		remove () {
			const index = this.$refs.form.getIndex('abc')
			this.form.splice(index, 1)
		},
		add () {
		}
	},
	mounted () {
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
