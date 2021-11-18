<template>
	<div class="quill-editor">
		<slot name="toolbar"></slot>
		<div ref="editor"></div>
	</div>
</template>

<script>
import _Quill from 'quill'
import defaultOptions from './options'
import ImageResize from 'quill-image-resize-module'
import VideoBlot from './VideoBlot'
import QuillBetterTable from 'quill-better-table'
import 'quill-better-table/dist/quill-better-table.css'

VideoBlot.blotName = 'simpleVideo'
VideoBlot.tagName = 'video'
_Quill.register({
	'modules/better-table': QuillBetterTable
}, true)
_Quill.register(VideoBlot)
_Quill.register('modules/imageResize', ImageResize)
_Quill.register('modules/videoResize', ImageResize)
if (typeof Object.assign !== 'function') {
	Object.defineProperty(Object, 'assign', {
		value (target, varArgs) {
			if (target == null) {
				throw new TypeError('Cannot convert undefined or null to object')
			}
			const to = Object(target)
			for (let index = 1; index < arguments.length; index++) {
				const nextSource = arguments[index]
				if (nextSource != null) {
					for (const nextKey in nextSource) {
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey]
						}
					}
				}
			}
			return to
		},
		writable: true,
		configurable: true
	})
}

// export
export default {
	name: 'quill-editor',
	data () {
		return {
			Options: {},
			Content: '',
			defaultOptions
		}
	},
	props: {
		content: String,
		value: String,
		disabled: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			required: false,
			default: () => ({})
		},
		globalOptions: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	mounted () {
		this.initialize()
	},
	beforeDestroy () {
		this.quill = null
		delete this.quill
	},
	methods: {
		// Init Quill instance
		initialize () {
			if (this.$el) {
				// Options
				this.Options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options)

				// Instance
				this.quill = new _Quill(this.$refs.editor, this.Options)

				this.quill.enable(false)

				// Set editor content
				if (this.value || this.content) {
					let delta = this.quill.clipboard.convert({
						html: this.value || this.content
					})
					this.quill.setContents(delta)
				}

				// Disabled editor
				if (!this.disabled) {
					this.quill.enable(true)
				}

				// Mark model as touched if editor lost focus
				this.quill.on('selection-change', range => {
					if (!range) {
						this.$emit('blur', this.quill)
					} else {
						this.$emit('focus', this.quill)
					}
				})

				// Update model if text changes
				this.quill.on('text-change', (delta, oldDelta, source) => {
					let html = this.$refs.editor.children[0].innerHTML
					const quill = this.quill
					const text = this.quill.getText()
					if (html === '<p><br></p>') html = ''
					this.Content = html
					this.$emit('input', this.Content)
					this.$emit('change', { html, text, quill })
				})

				// Emit ready event
				this.$emit('ready', this.quill)
			}
		}
	},
	watch: {
		// Watch content change
		content (newVal, oldVal) {
			if (this.quill) {
				if (newVal && newVal !== this.Content) {
					this.Content = newVal
					let delta = this.quill.clipboard.convert({
						html: newVal
					})
					this.quill.setContents(delta)
				} else if (!newVal) {
					this.quill.setText('')
				}
			}
		},
		// Watch content change
		value (newVal, oldVal) {
			if (this.quill) {
				if (newVal && newVal !== this.Content) {
					this.Content = newVal
					let delta = this.quill.clipboard.convert({
						html: newVal
					})
					this.quill.setContents(delta)
				} else if (!newVal) {
					this.quill.setText('')
				}
			}
		},
		// Watch disabled change
		disabled (newVal, oldVal) {
			if (this.quill) {
				this.quill.enable(!newVal)
			}
		}
	}
}
</script>
