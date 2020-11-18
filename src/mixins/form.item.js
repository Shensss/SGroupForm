import utils from '../utils'

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
    value: String | Number,
    config: Object,
    itemStyle: Object,
    props: Object
  },
  computed: {
    mapper () {
      return Object.assign(
        this.props.mapper || {
          label: 'label',
          value: 'value',
          children: 'children'
        },
        this.config.mapper || {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      )
    },
    style () {
      const itemStyle = utils.lodash.cloneDeep(this.itemStyle)
      if (this.config.style) {
        return utils.lodash.merge(itemStyle, this.config.style)
      } else {
        return itemStyle
      }
    },
    model: {
      set (val) {
        if (this.config.props && !this.config.props.multiple && Array.isArray(val)) {
          const current = utils.lodash.difference(val, this.value)
          this.$emit('setValue', this.config.key, current)
        } else {
          this.$emit('setValue', this.config.key, val)
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
        this.config.change(this.config, value)
      }
    },
    focus () {
      if (this.config.focus) {
        this.config.focus(this.config, this.value)
      }
    },
    blur () {
      if (this.config.blur) {
        this.config.blur(this.config, this.value)
      }
    }
  }
}
