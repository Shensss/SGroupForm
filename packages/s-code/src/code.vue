<template>
  <div class="ace-container">
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/snippets/html'
import 'ace-builds/src-noconflict/snippets/css'
import 'ace-builds/src-noconflict/snippets/scss'
import 'ace-builds/src-noconflict/snippets/json'
import 'ace-builds/src-noconflict/snippets/java'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'

export default {
  name: 'sCode',
  data () {
    return {
      editor: null,
      toggle: false,
      themePath: 'ace/theme/',
      modePath: 'ace/mode/'
    }
  },
  props: {
    value: [Array, String],
    theme: {
      type: String,
      default: 'monokai'
    },
    inputStyle: Object,
    wrap: {
      type: Boolean,
      default: true
    },
    mode: String,
    readOnly: {
      type: Boolean,
      default: false
    },
    tabSize: {
      type: Number,
      default: 2
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  methods: {
    init () {
      this.editor = ace.edit(this.$refs.ace, {
        minLines: 10,
        fontSize: this.fontSize,
        value: this.value,
        theme: this.themePath + this.theme,
        mode: this.modePath + this.mode,
        wrap: this.wrap,
        tabSize: this.tabSize,
        readOnly: this.readOnly
      })
      // 激活自动提示
      this.editor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true
      })
      if (this.value) {
        this.editor.setValue(this.value)
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getValue())
        this.$emit('change', this.editor.getValue())
      })
      this.editor.on('blur', () => {
        this.$emit('blur')
      })
      this.editor.on('focus', () => {
        this.$emit('focus')
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang='scss' scoped>
.ace-container {
  position: relative;
  padding-left: 1px;
  height: 300px;

  .ace-editor {
    height: 100%;
    width: calc(100% - 1px);
    border: 1px solid #c3c6ce;
  }
}
</style>
