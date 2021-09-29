<template>
  <div>
    <h1>This is detail page</h1>
    <el-button type="text" @click="handleConfirm">确定</el-button>
    <keep-alive>
      <el-table
        ref="multipleTable"
        :data="tableData[pager.page - 1]"
        tooltip-effect="dark"
        style="width: 100%"
        @select="handleSelect"
        @select-all="handleSelectAll">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </keep-alive>
    <el-pagination
      :page-size="pager.pageSize"
      :total="pager.total"
      :current-page.sync="pager.page"
      background
      layout="prev,pager,next,total,jumper"
      @current-change="handleCurrPageChange">
    </el-pagination>
  </div>
</template>

<script>
import { isNavRoute } from '@/router/index'
import store from '@/utils/store'

export default {
  name: 'Detail',
  data () {
    return {
      txt: '',
      pager: {
        pageSize: 4,
        total: 7,
        page: 1
      },
      tableData: [[{
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }, {
        id: 4,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }], [{
        id: 5,
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }, {
        id: 6,
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }, {
        id: 7,
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        selected: false
      }]]
    }
  },
  beforeRouteLeave (to, from, next) {
    from.meta.keepAlive = !isNavRoute(to.name)
    next()
  },
  methods: {
    handleConfirm () {
      let sels = []
      this.tableData.forEach((pageData) => {
        pageData.forEach((item) => {
          if (item.selected) {
            sels.push(JSON.parse(JSON.stringify(item)))
          }
        })
      })
      store.setData('sels', sels)
      this.$router.back()
    },

    handleSelect (selection, row) {
      const currPage = this.pager.page
      const currTable = this.tableData[currPage - 1]

      const sel = currTable.find((item) => item.id === row.id)
      sel.selected = !sel.selected
    },

    handleSelectAll () {
      const currPage = this.pager.page
      const currTable = this.tableData[currPage - 1]

      currTable.forEach((item) => {
        item.selected = !item.selected
      })
      console.log(currTable)
    },

    handleCurrPageChange (page) {
      const table = this.$refs['multipleTable']
      const currTable = this.tableData[page - 1]
      console.log('handleCurrPageChange', page, currTable)
      currTable.forEach((item) => table.toggleRowSelection(item, item.selected))
    }
  }
}
</script>
