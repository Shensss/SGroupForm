<template>
  <div class="sTable">
    <div class="head">
      <slot></slot>
    </div>
    <el-table ref="table"
              :show-header="showHeader"
              :id="id"
              :size="size||'mini'"
              :border="border"
              :height="height"
              @selection-change="handleSelectionChange"
              :header-cell-style="headerCellStyle"
              :data="tableData">
      <el-table-column type="selection"
                       width="55"
                       align="center"
                       v-if="select">
      </el-table-column>
      <el-table-column type="index"
                       :index="calcIndex"
                       align="center"
                       fixed="left"
                       v-if="index">
      </el-table-column>
      <el-table-column v-for="(item,cindex) in columns"
                       :key="cindex"
                       v-bind="item">
        <template slot-scope="scope">
            <span :style="item.style" v-if="!item.type">
               {{ get(scope.row, item.key) || '-' }}
            </span>
          <template v-if="item.type">
            <slot v-if="item.type==='slot'" :name="item.key"></slot>
            <single-tag v-if="singleTag.indexOf(item.type)>=0"
                        :mapper="mergeMapper(item)"
                        v-model="scope.row[item.key]"
                        :config="item">
            </single-tag>
            <group-tag v-if="groupTag.indexOf(item.type)>=0"
                       :mapper="mergeMapper(item)"
                       v-model="scope.row[item.key]"
                       :config="item">
            </group-tag>
            <options-tag v-if="optionsTag.indexOf(item.type)>=0"
                         :mapper="mergeMapper(item)"
                         v-model="scope.row[item.key]"
                         :config="item">
            </options-tag>
            <self-tag v-if="selfTag.indexOf(item.type)>=0"
                      :mapper="mergeMapper(item)"
                      v-model="scope.row[item.key]"
                      :config="item">
              <template :name="'content-'+item._code" :option="item" :data="data" slot-scope="data">
                <slot :name="'content-'+item._code" :option="item" :data="data"></slot>
              </template>
            </self-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column v-if="option&&option.btns.length>0"
                       align="center"
                       fixed="right"
                       :width="option.width"
                       :label="option.name||'操作'">
        <template slot-scope="scope">
          <span :key="index" v-for="(item,index) in option.btns">
            <el-button :key="index"
                       v-if="showFunction(scope.row,item.show)"
                       :icon="item.icon"
                       class="optionBtn"
                       type="text"
                       @click="item.handler(scope.row)">
              {{ item.name }}
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="usePage">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="usePage"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="usePageSize"
                     layout="total,prev, pager, next, sizes, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import SingleTag from '../../s-group-form/src/types/singleTag'
import GroupTag from '../../s-group-form/src/types/groupTag'
import OptionsTag from '../../s-group-form/src/types/optionsTag'
import SelfTag from '../../s-group-form/src/types/selfTag'

export default {
  name: 'SGroupTable',
  components: { SelfTag, OptionsTag, GroupTag, SingleTag },
  data () {
    return {
      singleTag: ['input', 'switch', 'slider', 'timePicker', 'datePicker', 'rate', 'colorPicker', 'inputNumber', 'cascader'],
      groupTag: ['radioButton', 'radio', 'checkbox'],
      optionsTag: ['select'],
      selfTag: ['text', 'button', 'fileView', 'upload', 'number', 'code', 'richText', 'dict', 'treeDict', 'checkTag', 'time', 'selectRange'],
      selectList: [],
      content: '',
      dialogVisible: false,
      currentRow: {}
    }
  },
  props: {
    id: [String, Number],
    showHeader: {
      type: Boolean,
      default: true
    },
    headerCellStyle: {
      type: Object,
      default () {
        return {
          background: '#F6F6F7',
          color: '#8689a3',
          fontSize: '14px'
        }
      }
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
    columns: Array,
    tableData: Array,
    border: {
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
    page: Number,
    total: Number,
    pageSize: Number
  },
  computed: {
    usePage: {
      get () {
        return this.page || 0
      },
      set (pageNumber) {
        this.$emit('changePageNumber', pageNumber)
      }
    },
    usePageSize: {
      get () {
        return this.pageSize
      },
      set (pageSize) {
        this.$emit('changePageSize', pageSize)
      }
    }
  },
  watch: {
    columns () {
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout()
      })
    },
    tableData () {
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout()
      })
    }
  },
  methods: {
    get (data, key) {
      return get(data, key)
    },
    mergeMapper (config) {
      if (config.props && config.props.mapper) {
        return Object.assign(this.mapper, config.props.mapper)
      } else {
        return this.mapper
      }
    },
    showFunction (row, show) {
      if (show === undefined) {
        return true
      } else if (typeof show === 'function') {
        return show(row)
      } else if (typeof show === 'string') {
        try {
          const str = `((row)=>${ show })(row)`
          return eval(str)
        } catch (e) {
          return false
        }
      }
    },
    calcIndex (val) {
      return (((this.usePage || 1) - 1) * (this.usePageSize || 10)) + val + 1
    },
    handleSizeChange (pageSize) {
      this.usePageSize = pageSize
    },
    handleCurrentChange (pageNumber) {
      this.usePage = pageNumber
    },
    handleSelectionChange (selection) {
      this.$emit('selectChange', selection)
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
    content: ',';
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

  .text {
    cursor: pointer;
    font-size: 12px;
    color: #1f70e4 !important;
    text-decoration: underline;
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
