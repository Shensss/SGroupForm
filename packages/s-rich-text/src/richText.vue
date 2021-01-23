<template>
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    :style="inputStyle"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady"
  ></quill-editor>
</template>

<script>
import merge from 'lodash-es/merge'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from './zh_cn'
import quillEditor from './editor'

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
      option: {
        module: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        },
        theme: 'snow',
        placeholder: '请输入正文'
      }
    }
  },
  computed: {
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
    initUploadImage () {
      this.editor.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    imgHandler () {
      let url = ''
      let Range = this.editor.getSelection()
      this.editor.insertEmbed(Range != null ? Range.index : 0, 'image', url)
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

<style lang='scss'>
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

  .ql-container {
    flex-grow: 1;
  }
}
</style>
