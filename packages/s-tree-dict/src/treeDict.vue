<template>
  <div class="text">
    <div class="text">
      <template v-if="props.multiple">
        <span :key="index" v-for="(item,index) in labels">
          {{ item.join('/') }}
          <template v-if="index!==labels.length-1">{{ separator }}</template>
        </span>
      </template>
      <template v-else>{{ labels.join(separator) }}</template>
    </div>
  </div>
</template>

<script>
import find from 'lodash-es/find'

export default {
  name: 'sTreeDict',
  data () {
    return {
      labels: []
    }
  },
  props: {
    value: {
      type: [String, Number, Array],
      default: ''
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    separator: {
      type: String,
      default: ','
    },
    mapper: {
      type: Object,
      default () {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    },
    props: Object
  },
  watch: {
    value () {
      this.init()
    },
    options () {
      this.init()
    }
  },
  filters: {
    lastFilter (labels) {

    }
  },
  methods: {
    init () {
      this.labels = []
      if (this.props && this.props.multiple) {
        this.value.map(value => {
          this.getLabel(this.options, value, 0)
        })
        // const labels = this.labels
        let index = 0
        const labels = []
        this.value.map(item => {
          const length = item.length
          const itemData = this.labels.slice(index, index += length)
          if (itemData.length > 0) {
            labels.push(itemData)
          }
        })
        this.labels = labels
        if (!this.showAllLevels) {
          this.labels = this.labels.map(item => {
            return item.slice(-1)
          })
        }
      } else {
        this.getLabel(this.options, this.value, 0)
        if (!this.showAllLevels) {
          this.labels = this.labels.slice(-1)
        }
      }
    },
    getLabel (option, data, index) {
      if (option) {
        if (data[index] !== undefined || data[index] === 0) {
          const is = find(option, (item) => item[this.mapper.value] == data[index])
          if (is) {
            this.labels.push(is[this.mapper.label])
            index = index + 1
            this.getLabel(is[this.mapper.children], data, index)
          }
        }
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.text {
}
</style>
