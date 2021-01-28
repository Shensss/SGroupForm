import { cloneDeep, merge, difference } from 'lodash-es'

export default {
  provide () {
    return {
      mapper: this.mapper,
      config: this.config
    }
  },
  data () {
    return {}
  },
  props: {
    formData: Object,
    type: String,
    value: String | Number,
    config: Object,
    itemStyle: Object,
    props: Object
  },
  computed: {
    required () {
      let required = false
      this.config.rule && this.config.rule.map(item => {
        if (item.required) {
          required = true
        }
      })
      return required
    },
    mapper () {
      return Object.assign(
        this.props.mapper || {
          label: 'label',
          value: 'value',
          children: 'children'
        },
        this.config.mapper
      )
    },
    style () {
      const itemStyle = cloneDeep(this.itemStyle)
      if (this.config.style) {
        return merge(itemStyle, this.config.style)
      } else {
        return itemStyle
      }
    },
    model: {
      set (val) {
        if (this.config.props && !this.config.props.multiple && Array.isArray(val)) {
          const current = difference(val, this.value)
          if (this.config.join) {
            this.$emit('setValue', this.config._code, this.config.key, current)
          } else {
            this.$emit('setValue', this.config._code, this.config.key, current)
          }
        } else {
          if (this.config.join) {
            this.$emit('setValue', this.config._code, this.config.key, val.join(this.config.join))
          } else {
            this.$emit('setValue', this.config._code, this.config.key, val)
          }
        }
      },
      get () {
        return this.value
      }
    }
  },
  methods: {
    change (value) {
      if (this.config.change) {
        this.config.change(this.config, value, this.formData)
      }
    },
    focus () {
      if (this.config.focus) {
        this.config.focus(this.config, this.value, this.formData)
      }
    },
    blur () {
      if (this.config.blur) {
        this.config.blur(this.config, this.value, this.formData)
      }
    }
  }
}