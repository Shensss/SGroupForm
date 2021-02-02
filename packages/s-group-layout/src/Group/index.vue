<template>
  <div ref="box"
       class="sl-group"
       :class="{border}"
       @dblclick.stop="setting">
    <template v-if="edit&&border">
      <div v-for="index in cols*rows"
           :key="index"
           :class="{active:active.indexOf(index)>=0}"
           class="sl-item"
           @click="pickItem(index)">
        <span class="sl-index">{{ index }}</span>
      </div>
    </template>
    <layout v-if="edit&&border"
            class="view"
            :cols="cols"
            :rows="rows"
            :option="option">
      <slot></slot>
    </layout>
    <slot v-if="!edit&&!border"></slot>
  </div>
</template>

<script>

export default {
  name: 'Group',
  provide() {
    return {
      changeHeight: this.changeHeight
    }
  },
  props: {
    cols: {
      default: 5,
      type: [String, Number, String]
    },
    rows: {
      default: 5,
      type: [String, Number, String]
    },
    gap: {
      type: [Array, Number, String],
      default: 0
    },
    option: {
      type: Array,
      default() {
        return []
      }
    },
    edit: Boolean
  },
  data() {
    return {
      border: false,
      rowStartArr: [],
      rowEndArr: [],
      colStartArr: [],
      colEndArr: [],
      rowStart: 1,
      rowEnd: 1,
      colStart: 1,
      colEnd: 1,
      type: 0,
      active: [],
      current: 0
    }
  },
  mounted() {
    if (this.edit) {
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          this.type = 1
        } else {
          this.type = 0
        }
      })
      document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
          this.buildResult()
        }
      })
    }
  },
  methods: {
    changeHeight(el, height) {
      const currentOption = this.option[Array.prototype.indexOf.call(this.$refs.box.children, el)]
      const style = currentOption.split('/')
      style[2] = height
      el.style = 'grid-area:' + style.join('/')
    },
    setting(e) {
      if (!this.edit) return
      this.current = Array.prototype.indexOf.call(this.$refs.box.children, e.target)
      if (this.current >= 0) this.border = !this.border
      if (this.border) {
        this.rowStart = 1
        this.rowEnd = 1
        this.colStart = 1
        this.colEnd = 1
        this.active = []
        this.rowStartArr = []
        this.rowEndArr = []
        this.colStartArr = []
        this.colEndArr = []
      }
    },
    pickItem(index) {
      if (this.type) {
        this.pickRange(index)
        this.calcActive(this.rowStart, this.rowEnd, this.colStart, this.colEnd)
      }
    },
    indexToRowCol(index) {
      const rowNum = index % this.cols === 0 ? index / this.cols : (Math.floor(index / this.cols) + 1)
      const colNum = index % this.rows === 0 ? this.cols : (index % this.cols === 0 ? this.cols : index % this.cols)
      return {
        rowNum: Number(rowNum),
        colNum: Number(colNum)
      }
    },
    indexRange(index) {
      const { rowNum, colNum } = this.indexToRowCol(index)
      return {
        rowStart: rowNum,
        colStart: colNum,
        rowEnd: rowNum + 1,
        colEnd: colNum + 1
      }
    },
    pickRange(index) {
      const { rowStart, colStart, rowEnd, colEnd } = this.indexRange(index)
      this.rowStartArr.push(rowStart)
      this.rowEndArr.push(rowEnd)
      this.colStartArr.push(colStart)
      this.colEndArr.push(colEnd)
      this.rowStart = Math.min.apply(null, this.rowStartArr)
      this.rowEnd = Math.max.apply(null, this.rowEndArr)
      this.colStart = Math.min.apply(null, this.colStartArr)
      this.colEnd = Math.max.apply(null, this.colEndArr)
    },
    calcActive(rowStart, rowEnd, colStart, colEnd) {
      const active = []
      for (let i = rowStart; i < rowEnd; i++) {
        for (let j = colStart; j < colEnd; j++) {
          active.push((i - 1) * this.cols + j)
        }
      }
      this.active = active
    },
    buildResult() {
      this.border = false
      this.$emit('change', this.current, [this.rowStart, this.colStart, this.rowEnd, this.colEnd].join('/'))
    }
  }
}
</script>
<style lang="scss" scoped>
.border {
  counter-reset: step;

  .view {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .item {
    background-color: rgba(red, 0.2);
    border: 1px solid red;
    box-sizing: border-box;
  }

  .sl-item {
    background-color: rgba(#19caad, 0.2);
    border: 1px solid rgba(#19caad, 0.4);

    &.active {
      border-color: #ca5719;

      .sl-index {
        background-color: rgba(#ca5719, 0.2);
        border-color: #ca5719;
      }
    }

    .sl-index {
      float: left;
      padding: 0 5px;
      font-size: 12px;
      font-weight: bold;
      background-color: rgba(#19caad, 0.2);
      border-right: 1px solid rgba(#19caad, 0.4);
      border-bottom: 1px solid rgba(#19caad, 0.4);
      transform: scale(0.5);
      transform-origin: top left;
    }
  }

  & > * {
    position: relative;
    box-sizing: border-box;
  }
}
</style>
