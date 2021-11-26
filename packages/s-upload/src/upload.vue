<template>
	<div class="upload" :class="btnView==='plus'?'start':''">
		<el-button
			v-show="fileList.length<length"
			v-if="!btnView"
			:loading="loading"
			v-bind="btnProps"
			type="primary"
			@click="clickHandle"
		>
			<template v-if="loading">upload（{{ progressRatio }}%）</template>
			<template v-else>{{ btnProps.text }}</template>
		</el-button>
		<span :class="fileList.length<length" />
		<div v-show="fileList.length<length" v-if="btnView==='plus'" class="plus" @click="clickHandle">
			<i class="el-icon-plus" />
		</div>
		<span v-if="view!=='image'" class="tips" v-html="tips"></span>
		<input
			style="display: none"
			ref="input"
			type="file"
			:accept="fileType"
			:multiple="multiple"
			@change="handleChange"
		/>
		<file-view
			v-if="fileView&&fileList.length>0"
			v-model="fileList"
			:imageStyle="imageStyle"
			:fileGetPath="fileGetPath"
			:asyncConfig="asyncConfig"
			:view="view"
			:remove="remove"
		>
		</file-view>
		<div class="tips" v-if="view==='image'" v-html="tips"></div>
	</div>
</template>

<script>
import FileView from '../../s-file-view/src/fileView'
import axios from 'axios'
import Cookies from 'js-cookie'
import get from 'lodash-es/get'
import merge from 'lodash-es/merge'
import Compressor from 'compressorjs'

export default {
	name: 'SUpload',
	components: { FileView },
	props: {
		value: {
			type: String,
			default: ''
		},
		fileGetPath: {
			type: String
		},
		length: {
			type: Number,
			default: 99
		},
		btnView: {
			type: String,
			default: ''
		},
		// 配置
		accept: {
			type: [String, Array],
			default: ''
		},
		fileView: {
			type: Boolean,
			default: true
		},
		size: {
			type: Number,
			default: 50
		},
		btnProps: {
			type: Object,
			default: () => {
				return {
					icon: 'el-icon-upload',
					text: '点击上传'
				}
			}
		},
		tips: String,
		remove: {
			type: Boolean,
			default: false
		},
		view: {
			type: String,
			default: 'file'
		},
		asyncConfig: {
			type: Object,
			default: () => {
				return {}
			}
		},
		imageStyle: {
			type: Object,
			default: () => {
				return {}
			}
		},
		quality: {
			type: [Number, String],
			default: () => {
				return 1
			}
		},
		multiple: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			fileList: [],
			file: '',
			loading: false,
			progressRatio: 0,
			fileTypeToAccept: {
				'.pdf': 'application/pdf',
				'.gif': 'image/gif',
				'.jpeg': 'image/jpeg',
				'.jpg': 'image/jpeg',
				'.png': 'image/png',
				'.txt': 'text/plain',
				'.zip': 'application/zip',
				'.csv': 'text/csv',
				'.xls': 'application/vnd.ms-excel',
				'.xlsx':
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'.pptx':
					'application/vnd.openxmlformats-officedocument.presentationml.presentation',
				'.doc': 'application/msword',
				'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'.mp4': 'audio/mp4, video/mp4'
			}
		}
	},
	computed: {
		fileType () {
			let fileTypeArr = []
			if (this.accept && typeof this.accept === 'string') {
				this.accept.split(',').map(item => {
					if (this.fileTypeToAccept[item]) {
						fileTypeArr.push(this.fileTypeToAccept[item])
					}
				})
			} else if (Array.isArray(this.accept)) {
				this.accept.map(item => {
					if (this.fileTypeToAccept[item]) {
						fileTypeArr.push(this.fileTypeToAccept[item])
					}
				})
			} else {
				fileTypeArr = []
			}
			return fileTypeArr.join(',')
		},
		mergeConfig () {
			return merge(this.$UploadConfig, this.asyncConfig)
		}
	},
	watch: {
		value: {
			immediate: true,
			handler () {
				this.buildFileList()
			}
		},
		fileList (val) {
			if (val.length > 0) {
				const str = []
				if (this.mergeConfig.getType === 'JSON') {
					this.$emit('input', JSON.stringify(val))
					this.$emit('change', JSON.stringify(val))
				} else {
					val.map(item => {
						str.push(item.url + '&&' + item.name)
					})
					this.$emit('input', str.join(','))
					this.$emit('change', str.join(','))
				}
			} else {
				this.$emit('input', '')
				this.$emit('change', '')
			}
		}
	},
	methods: {
		clickHandle () {
			this.$refs.input.click()
		},
		checkType (fileName) {
			if (!this.accept) return true
			const index = fileName.lastIndexOf('.')
			const extension = fileName.substring(index).toLowerCase()
			const allowedType = this.accept.split(',')
			if (allowedType.indexOf(extension) >= 0) {
				return true
			} else {
				this.$message.error('不支持' + extension + '格式')
				return false
			}
		},
		handleChange () {
			if (this.multiple) {
				let accessNumber = 0
				const dataArray = []
				for (let i = 0; i < this.$refs.input.files.length; i++) {
					if (this.accessFile(this.$refs.input.files[i])) {
						accessNumber++
						dataArray.push(this.$refs.input.files[i])
					}
				}
				if (accessNumber === this.$refs.input.files.length) {
					this.realUpload(dataArray)
				}
			} else {
				const file = this.$refs.input.files[0]
				this.accessFile(file)
				if (file.type.indexOf('image') >= 0 && this.quality < 1) {
					new Compressor(file, {
						quality: this.quality,
						maxWidth: 1024,
						success: (result) => {
							const newFile = new window.File([result], result.name.toLowerCase(), { type: result.type.toLowerCase() })
							this.realUpload(newFile)
						}
					})
				} else {
					this.realUpload(file)
				}
			}
		},
		accessFile (file) {
			let access = this.checkType(file.name)
			this.loading = true
			if (!access) {
				this.$refs.input.value = ''
				this.loading = false
				this.progressRatio = 0
			}
			if (file.size > this.size * 1024 * 1024) {
				this.$refs.input.value = ''
				this.loading = false
				this.progressRatio = 0
				this.$message.error(`文件${file.name}过大!`)
				access = false
			}
			return access
		},
		realUpload (file) {
			if (this.mergeConfig.fileType !== 'base64') {
				const formData = new FormData()
				this.mergeConfig.data.map(item => {
					if (item.value === 'file') {
						if (Array.isArray(file)) {
							file.map(f => {
								formData.append(item.key, f)
							})
						} else {
							formData.append(item.key, file)
						}
					}
				})
				axios.post(this.mergeConfig.path, formData, {
					headers: Object.assign({
						Authorization: Cookies.get('sessionId') || sessionStorage.sessionId
					}, this.mergeConfig.headers || {}),
					onUploadProgress: this.UploadProgress
				}).then(res => {
					const { data } = res
					let item = {}
					if (!this.mergeConfig.listPath) {
						item = data
					} else {
						item = get(data, this.mergeConfig.listPath)
					}
					this.loading = false
					if (!this.multiple) {
						item.name = this.mergeConfig.nameKey ? item[this.mergeConfig.nameKey] : file.name
						item.url = item[this.mergeConfig.urlKey]
						this.fileList.push(item)
					} else {
						item.map(sitem => {
							sitem.name = this.mergeConfig.nameKey ? sitem[this.mergeConfig.nameKey] : file.name
							sitem.url = sitem[this.mergeConfig.urlKey]
							this.fileList.push(sitem)
						})
					}
					this.$refs.input.value = ''
					this.$emit('change')
				}).catch(() => {
					this.loading = false
				})
			} else {
				this.changeToBase64(file).then(base64 => {
					const formData = {}
					this.mergeConfig.data.map(item => {
						if (item.value === 'file') {
							formData[item.key] = base64
						}
						if (item.value === 'name') {
							formData[item.key] = file.name
						}
					})
					axios.post(this.mergeConfig.path, formData, {
						headers: Object.assign({
							Authorization: Cookies.get('sessionId')
						}, this.mergeConfig.headers || {}),
						onUploadProgress: this.UploadProgress
					}).then(res => {
						const { data } = res
						let item = {}
						if (!this.mergeConfig.listPath) {
							item = data
						} else {
							item = get(data, this.mergeConfig.listPath)
						}
						this.loading = false
						const newItem = {
							name: this.mergeConfig.nameKey ? item[this.mergeConfig.nameKey] : file.name,
							type: 'base64',
							url: item[this.mergeConfig.urlKey]
						}
						this.fileList.push(newItem)
						this.$refs.input.value = ''
						this.$emit('change')
					}).catch(() => {
						this.loading = false
					})
				})
			}
		},
		UploadProgress (progressEvent) {
			this.progressRatio = parseInt(progressEvent.loaded / progressEvent.total * 100)
		},
		changeToBase64 (file) {
			var reader = new FileReader() //实例化文件读取对象
			reader.readAsDataURL(file) //将文件读取为 DataURL,也就是base64编码
			return new Promise(resolve => {
				reader.onload = function (ev) { //文件读取成功完成时触发
					resolve(ev.target.result)
				}
			})
		},
		buildFileList () {
			let viewList = []
			if (this.value && typeof this.value === 'string') {
				if (this.value.indexOf('[{') < 0 && this.value.length > 0) {
					if (this.value.indexOf('base64') < 0) {
						this.value.split(',').map(item => {
							viewList.push({
								name: item.split('&&')[1],
								url: item.split('&&')[0]
							})
						})
					} else {
						viewList.push({
							name: this.value.split('&&')[1],
							url: this.value.split('&&')[0]
						})
					}
				} else {
					viewList = JSON.parse(this.value)
				}
			} else {
				viewList = this.value || []
			}
			this.fileList = viewList
		}
	}
}
</script>

<style lang="scss" scoped>
.upload {
  &.start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .el-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .plus {
    display: flex;
    width: 98px;
    height: 98px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px dashed #ddd;
  }

  input {
    display: none;
  }

  .fileView {
    width: calc(100% - 108px);
  }

  .tips {
    color: #999;
  }
}
</style>
