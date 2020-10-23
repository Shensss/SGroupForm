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
      this.$PubSub.publish('form-item-change', { config: this.config, value: val })
    },
    focus () {
      this.$PubSub.publish('form-item-focus', this.config)
    },
    blur () {
      this.$PubSub.publish('form-item-blur', this.config)
    }
  }
}
