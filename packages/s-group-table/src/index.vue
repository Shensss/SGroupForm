<template>
  <div class="sTable">
    <div class="head" v-if="$slots.default||query">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <template v-if="query">
        <s-group-form
            v-model="formData"
            :form="groupForm"
            :props="queryProps"
            :item-style="queryItemStyle"
        ></s-group-form>
      </template>
    </div>
    <el-table
        ref="table"
        :show-header="showHeader"
        :id="id"
        :size="size"
        :border="border"
        :height="height"
        :span-method="objectSpanMethod"
        v-bind="props"
        @sort-change="sortChange"
        @row-click="rowClick"
        @filter-change="filterChange"
        @selection-change="handleSelectionChange"
        :header-cell-style="headerCellStyle"
        :data="tableData"
    >
      <el-table-column width="45" v-if="props.treeProps"></el-table-column>
      <el-table-column type="selection" width="55" align="center" v-if="select"></el-table-column>
      <el-table-column type="index" :index="calcIndex" align="center" v-if="index"></el-table-column>
      <columns
          v-for="(item,cindex) in columnsUse"
          :key="'c'+cindex"
          :item="item"
          :tableProps="props"
          :mergeMapper="mergeMapper"
          v-model="tableData"
          @changeRow="(row)=>$emit('changeRow',row)"
      >
        <slot :slot="item.key" slot-scope="{row,config}" v-for="(item) in columnsUse.filter(item=>item.type==='slot')">
          <slot :name="item.key" :row="row" :config="config"></slot>
        </slot>
      </columns>
      <el-table-column
          v-if="option&&option.btns.length>0"
          align="center"
          fixed="right"
          :width="option.width"
          :label="option.name||'操作'"
      >
        <template slot-scope="scope">
          <span :key="index" v-for="(item,index) in option.btns">
            <el-button
                :key="index"
                v-if="showFunction(scope.row,item.show)"
                :icon="item.icon"
                class="optionBtn"
                type="text"
                @click="item.handler(scope.row)"
            >{{ item.name }}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="usePage">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :background="pageConfig.background"
          :current-page="usePage"
          :page-sizes="pageConfig.pageSizes"
          :page-size="usePageSize"
          :layout="pageConfig.layout"
          :total="pageConfig.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import {transformToTree} from "../../utils";
import Columns from "./columns";

export default {
  name: 'SGroupTable',
  components: {Columns},
  data() {
    return {
      selectList: [],
      content: '',
      dialogVisible: false,
      currentRow: {},
      formData: {},
      scrollTimer: null,
      activeScroll: true
    }
  },
  props: {
    id: [String, Number],
    spanKey: {
      type: Array,
      default: () => []
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default: () => ({
        rowKey: '_rowKey'
      })
    },
    loopConfig: {
      type: Object,
      default: () => {
        return {
          loop: false,
          plus: 1
        }
      }
    },
    headerCellStyle: {
      type: Object,
      default() {
        return {
          background: '#F6F6F7',
          color: '#8689a3',
          fontSize: '14px'
        }
      }
    },
    mapper: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    },
    queryProps: {
      type: Object,
      default() {
        return {}
      }
    },
    queryItemStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    columns: Array,
    value: Array,
    border: {
      type: Boolean,
      default: true
    },
    query: {
      type: Boolean,
      default: true
    },
    index: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'readonly'
    },
    select: {
      type: Boolean,
      default: false
    },
    option: Object,
    height: [String, Number],
    size: {
      type: String,
      default: 'small'
    },
    pageConfig: {
      type: Object,
      default() {
        return {
          page: 0,
          total: 0,
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          layout: 'total,prev, pager, next, sizes, jumper',
          background: true
        }
      }
    }
  },
  computed: {
    tableData: {
      get() {
        this.value.map((item, index) => {
          item._rowKey = index
        })
        return cloneDeep(this.value)
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    groupForm() {
      return this.columns && this.columns.filter(item => item.isQuery)
    },
    columnsUse() {
      this.columns.map(item => {
        if (this.type === 'readonly') {
          this.setRead(item)
        }
        if (item.type === 'columns') {
          item.columns.map(scol => {
            if (this.type === 'readonly') {
              this.setRead(scol)
            }
            if (!scol.type) {
              scol.type = 'text'
            }
          })
        }
        if (!item.type) {
          item.type = 'text'
        }
      })
      return this.columns
    },
    usePage: {
      get() {
        return this.pageConfig.page || 0
      },
      set(pageNumber) {
        this.$emit('changePageNumber', pageNumber)
      }
    },
    usePageSize: {
      get() {
        return this.pageConfig.pageSize
      },
      set(pageSize) {
        this.$emit('changePageSize', pageSize)
      }
    },
    spanCol() {
      const indexArr = []
      this.spanKey.map(key => {
        const index = this.columns.findIndex(item => item.key === key)
        if ((this.index && !this.select) || (!this.index && this.select)) {
          indexArr.push(index + 1)
        }
        if (this.index && this.select) {
          indexArr.push(index + 2)
        }
        if (!this.index && !this.select) {
          indexArr.push(index)
        }
      })
      return indexArr
    }
  },
  watch: {
    columns: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$refs.table && this.$refs.table.doLayout()
        })
      }
    },
    tableData() {
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout()
      })
    }
  },
  mounted() {
    this.initLoop()
  },
  methods: {
    get,
    initLoop() {
      if (!this.loopConfig.loop) return
      const table = this.$refs.table
      const divData = table.bodyWrapper
      const ing = () => {
        if (this.activeScroll) {
          divData.scrollTop += this.loopConfig.plus
        }
        if (Math.abs(divData.clientHeight + divData.scrollTop - divData.scrollHeight) < 1 && divData.scrollTop > 0) {
          setTimeout(() => {
            divData.scrollTop = 0
          }, 500)
        }
        requestAnimationFrame(ing)
      }
      ing()
      divData.onmouseenter = () => {
        this.activeScroll = false
      }
      divData.onmouseleave = () => {
        this.activeScroll = true
      }
    },
    setRead(item) {
      let readType = item.type
      switch (item.type) {
        case 'input':
        case 'inputNumber':
        case 'number':
          readType = 'text'
          break
        case 'timePicker':
          item.props = Object.assign({
            format: item.props ? (item.props.format || 'HH:mm:ss') : 'HH:mm:ss'
          }, item.props || {})
          readType = 'time'
          break
        case 'datePicker':
          item.props = Object.assign({
            format: item.props ? (item.props.format || 'HH:mm:ss') : 'yyyy-MM-dd'
          }, item.props || {})
          readType = 'time'
          break
        case 'checkTag':
          item.props = Object.assign({}, item.props)
          item.props.readonly = true
          break
        case 'radio':
        case 'select':
        case 'checkbox':
        case 'switch':
          readType = 'dict'
          break
        case 'cascader':
          readType = 'treeDict'
          break
        case 'upload':
          readType = 'fileView'
          item.props = Object.assign({}, item.props)
          item.props.remove = false
          break
        case 'code':
          item.props = Object.assign({}, item.props)
          item.props.readonly = true
          break
        case 'richText':
          item.props = Object.assign({}, item.props)
          item.props.readonly = true
          break
        case 'slider':
          item.props = Object.assign({}, item.props)
          item.props.disabled = true
          break
        case 'colorPicker':
          item.props = Object.assign({}, item.props)
          item.props.disabled = true
          break
      }
      item.type = readType
    },
    mergeMapper(config) {
      if (config.props && config.props.mapper) {
        return Object.assign(this.mapper, config.props.mapper)
      } else {
        return this.mapper
      }
    },
    showFunction(row, show) {
      if (show === undefined) {
        return true
      } else if (typeof show === 'function') {
        return show(row)
      } else if (typeof show === 'string') {
        try {
          const str = `((row)=>${show})(row)`
          return eval(str)
        } catch (e) {
          return false
        }
      }
    },
    calcIndex(val) {
      return (((this.usePage || 1) - 1) * (this.usePageSize || 10)) + val + 1
    },
    handleSizeChange(pageSize) {
      this.usePageSize = pageSize
    },
    handleCurrentChange(pageNumber) {
      this.usePage = pageNumber
    },
    handleSelectionChange(selection) {
      this.$emit('selectChange', selection)
    },
    sortChange(data) {
      this.$emit('sortChange', data)
    },
    rowClick(data) {
      this.$emit('rowClick', data)
    },
    filterChange(data) {
      this.$emit('filterChange', data)
    },
    calcSpanObj() {
      const spanObj = []
      this.spanKey.map((key, index) => {
        const data = cloneDeep(this.tableData)
        let group = []
        data.map(item => {
          if (index >= 1) {
            let bkey = key
            let bvalue = item[key]
            for (let i = 0; i < index; i++) {
              bkey += this.spanKey[index - 1 - i]
              bvalue += item[this.spanKey[index - 1 - i]]
            }
            item[bkey] = bvalue
            group.push(bvalue)
          } else {
            group.push(item[key])
          }
        })
        const arr = []
        group = [...new Set(group)]
        group.map(item => {
          const obj = {}
          obj.qqqqq = item
          if (index >= 1) {
            let bkey = key
            for (let i = 0; i < index; i++) {
              bkey += this.spanKey[index - 1 - i]
            }
            obj[bkey] = 0
          } else {
            obj[key] = 0
          }
          arr.push(obj)
        })
        const treeAll = cloneDeep(data).concat([...new Set(arr)])
        let bkey = key
        for (let i = 0; i < index; i++) {
          bkey += this.spanKey[index - 1 - i]
        }
        const treeData = transformToTree(cloneDeep(treeAll), {
          children: 'children',
          idKey: 'qqqqq',
          pIdKey: bkey,
          label: 'name'
        })
        spanObj.push(treeData)
      })
      return spanObj
    },
    objectSpanMethod({rowIndex, columnIndex}) {
      const spanObj = this.calcSpanObj()
      const rowIndexArr = []
      const lengthArr = []
      let result = {}
      const index = this.spanCol.indexOf(columnIndex)
      if (index >= 0) {
        spanObj[index].map((item, index) => {
          if (item.children) {
            lengthArr.push(item.children.length)
          }
        })
        let sum = 0
        lengthArr.map((length, index) => {
          rowIndexArr.push(sum)
          sum = sum + length
        })
        if (rowIndexArr.indexOf(rowIndex) >= 0) {
          result = {
            rowspan: lengthArr[rowIndexArr.indexOf(rowIndex)],
            colspan: 1
          }
        } else {
          result = {
            rowspan: 0,
            colspan: 0
          }
        }
        if (columnIndex === this.spanCol[index]) {
          return result
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sTable {
  .head {
    margin-bottom: 20px;
  }

  ::v-deep .el-table__fixed {
    background-color: #fff;
  }

  ::v-deep .el-table__fixed-right {
    background-color: #fff;
  }

  .dict:not(:last-child):after {
    content: ",";
  }

  .remove {
    cursor: pointer;
  }

  .link {
    color: #1f70e4 !important;
    text-decoration: none;
    font-size: 12px;
  }

  .download {
    color: #1f70e4 !important;
    font-size: 12px;
    cursor: pointer;
  }

  .optionBtn {
    padding: 0 3px;
  }

  ::v-deep .el-table {
    background-color: transparent;

    tr {
      background-color: transparent;

      td {
        font-size: 12px;
        padding: 12px 0;
      }
    }
  }

  .page {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }

  .tips {
    margin-bottom: 15px;

    span {
      color: #1f70e4;
      margin: 5px;
    }
  }
}
</style>
