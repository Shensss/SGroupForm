<template>
	<div>
		<quill-editor
			ref="myQuillEditor"
			v-model="content"
			:options="editorOption"
			:style="inputStyle"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@ready="onEditorReady"
		></quill-editor>
		<input
			ref="input"
			class="button"
			type="file"
			:accept="fileType"
			@change="handleChange"
		>
	</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from './zh_cn'
import quillEditor from './editor'
import axios from 'axios'
import Cookies from 'js-cookie'
import get from 'lodash-es/get'
import merge from 'lodash-es/merge'

export default {
	name: 'rich-text',
	props: {
		value: String,
		asyncConfig: {
			type: Object,
			default () {
				return {
					data: []
				}
			}
		},
		inputStyle: Object,
		placeholder: String,
		readonly: Boolean
	},
	components: {
		quillEditor
	},
	data () {
		return {
			option: {},
			file: '',
			accept: '',
			imageAccept: '.png,.jpg,.jpeg,.gif',
			videoAccept: '.mp4',
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
			},
			uploadType: 'image'
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
		editor () {
			return this.$refs.myQuillEditor.quill
		},
		mergeConfig () {
			return merge(this.$UploadConfig || {}, this.asyncConfig)
		},
		editorOption () {
			return merge(this.option, {
				placeholder: this.placeholder
			})
		},
		content: {
			get () {
				return this.value
			},
			set (val) {
				this.$emit('input', val)
			}
		}
	},
	mounted () {
		this.content = this.value
		this.initUploadImage()
	},
	methods: {
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
			const file = this.$refs.input.files[0]
			const access = this.checkType(file.name)
			if (!access) {
				this.$refs.input.value = ''
				return
			}

			if (file.size > this.size * 1024 * 1024) {
				this.$refs.input.value = ''
				return this.$message.error(`文件${file.name}过大!`)
			}
			const formData = new FormData()
			this.mergeConfig.data.map(item => {
				if (item.value === 'file') {
					formData.append(item.key, file)
				}
			})
			axios.post(this.mergeConfig.path, formData, {
				headers: Object.assign({
					Authorization: Cookies.get('sessionId')
				}, this.mergeConfig.headers || {})
			}).then(res => {
				const { data } = res
				let item = {}
				if (!this.mergeConfig.listPath) {
					item = data
				} else {
					item = get(data, this.mergeConfig.listPath)
				}
				item.name = item[this.mergeConfig.nameKey]
				item.url = item[this.mergeConfig.urlKey]
				let Range = this.editor.getSelection()
				if (this.uploadType === 'image') {
					this.editor.insertEmbed(Range != null ? Range.index : 0, this.uploadType, (this.mergeConfig.domain || '') + item.url)
				} else {
					this.editor.insertEmbed(Range != null ? Range.index : 0, 'simpleVideo', {
						url: this.mergeConfig.domain || '' + item.url,
						controls: 'controls',
						width: '1150px',
						height: '500px'
					})
				}
				this.$refs.input.value = ''
			})
		},
		initUploadImage () {
			this.editor.getModule('toolbar').addHandler('image', this.imgHandler)
			this.editor.getModule('toolbar').addHandler('video', this.videoHandler)
		},
		imgHandler () {
			this.accept = this.imageAccept
			this.uploadType = 'image'
			this.$refs.input.click()
		},
		videoHandler () {
			this.accept = this.videoAccept
			this.uploadType = 'video'
			this.$refs.input.click()
		},
		// 失去焦点事件
		onEditorBlur () {
			this.$emit('blur')
		},
		// 获得焦点事件
		onEditorFocus (quill) {
			if (this.readonly) {
				quill.enable(false)
			} else {
				quill.enable(true)
				this.$emit('focus')
			}
		},
		// 准备富文本编辑器
		onEditorReady () {
			addQuillTitle()
		},
		// 内容改变事件
		onEditorChange ({ quill, html, text }) {
			this.$emit('change', html)
		}
	}
}
</script>

<style lang="scss">
.ql-snow .ql-picker {
  line-height: 1;
}

.ql-snow *:focus {
  outline: none;
}

.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label, .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  border: 1px solid #ccc;
  outline: none !important;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  padding-right: 0;
  border-right: 0;
  content: "保存";
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.quill-editor {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;

  .ql-container {
    flex-grow: 1;
    max-height: calc(100% - 98px);

    img {
      max-width: 95%;
    }
  }
}

.button {
  display: none;
}
</style>
