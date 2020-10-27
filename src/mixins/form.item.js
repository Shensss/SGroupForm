import utils from '../utils'

export default {
  data () {
    return {
      logic: ['&&', '||', '!', '=', '!=', '===', '==']
    }
  },
  props: {
    value: String | Number,
    config: Object,
    itemStyle: Object
  },
  computed: {
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
        this.$emit('setValue', this.config.key, val)
      },
      get () {
        return this.value
      }
    }
  },
  methods: {
    change (val) {
      if (this.config.change) {
        this.config.change(this.config, val)
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
