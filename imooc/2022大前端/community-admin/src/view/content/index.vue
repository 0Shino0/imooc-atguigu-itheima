<template>
  <div>
    <Card>
      <tables
        ref="tables"
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-row-edit="handleRowEdit"
        @on-row-remove="handleRowRemove"
        @on-selection-change="handleSelect"
        @searchEvent="handleSearch"
      />
      <Row type="flex" justify="space-between" align="middle">
        <Col class="ctrls">
          <Button @click="handleDeleteBatch()">批量删除</Button>
          <Button @click="handleSetBatch()">批量设置</Button>
          <Button style="margin: 10px 0;" type="primary" @click="exportExcel">
            <Icon type="md-download"></Icon>导出表格
          </Button>
        </Col>
        <Page
          :total="total"
          :current="page"
          :page-size="limit"
          :page-size-opts="pageArr"
          show-elevator
          show-sizer
          show-total
          @on-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
        />
      </Row>
    </Card>
    <EditModel
      :isShow="showEdit"
      :item="currentItem"
      @editEvent="handleItemEdit"
      @changeEvent="handleChangeEvent"
    ></EditModel>
    <BatchSet
      :isShow="showSet"
      @editEvent="handleItemSet"
      @changeEvent="handleSetChangeEvent"
    ></BatchSet>
  </div>
</template>

<script>
import Tables from '_c/tables'
import EditModel from './index/edit'
import BatchSet from './index/batchSet'
import {
  getList,
  deletePostById,
  updatePostById,
  updatePostBatchById
} from '@/api/content'
import dayjs from 'dayjs'
export default {
  name: 'content_management',
  components: {
    Tables,
    EditModel,
    BatchSet
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      option: {},
      showEdit: false,
      showSet: false,
      currentIndex: 0,
      currentItem: {},
      selection: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          hidden: true
        },
        {
          title: '标题',
          key: 'title',
          minWidth: 400,
          ellipsis: true,
          tooltip: true,
          search: {
            type: 'input'
          }
        },
        {
          title: '创建时间',
          key: 'created',
          width: 200,
          align: 'center',
          // 方法二：使用 render 方法结构化数据
          render: (h, params) => {
            return h('div', [
              h('span', dayjs(params.row.created).format('YYYY-MM-DD HH:mm:ss'))
            ])
          },
          search: {
            type: 'date'
          }
        },
        {
          title: '作者',
          key: 'user',
          width: 120,
          align: 'center',
          // 方法二：使用 render 方法结构化数据
          render: (h, params) => {
            return h('div', [h('span', params.row.uid.name)])
          },
          search: {
            type: 'input'
          }
        },
        {
          title: '分类',
          key: 'catalog',
          width: 100,
          align: 'center',
          render: (h, params) => {
            const catalog = params.row.catalog
            let result = ''
            switch (catalog) {
              case 'ask':
                result = '提问'
                break
              case 'advise':
                result = '建议'
                break
              case 'discuss':
                result = '交流'
                break
              case 'share':
                result = '分享'
                break
              case 'logs':
                result = '动态'
                break
              case 'notice':
                result = '公告'
                break
              default:
                result = '全部'
            }
            return h('div', [h('span', result)])
          },
          search: {
            type: 'select',
            options: [
              {
                key: '提问',
                value: 'ask'
              },
              {
                key: '建议',
                value: 'advise'
              },
              {
                key: '交流',
                value: 'discuss'
              },
              {
                key: '分享',
                value: 'share'
              },
              {
                key: '公告',
                value: 'notice'
              }
            ]
          }
        },
        {
          title: '积分',
          key: 'fav',
          width: 100,
          align: 'center',
          hidden: true
        },
        {
          title: '标签',
          key: 'tags',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', params.row.tags.map((o) => o.name).join(',') || '')
            ])
          },
          search: {
            type: 'input'
          }
        },
        {
          title: '是否结束',
          key: 'isEnd',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [h('span', params.row.isEnd === '0' ? '否' : '是')])
          },
          search: {
            type: 'radio'
          }
        },
        {
          title: '阅读记数',
          key: 'reads',
          width: 100,
          align: 'center',
          hidden: true
        },
        {
          title: '回答记数',
          key: 'answer',
          width: 100,
          align: 'center',
          hidden: true
        },
        {
          title: '状态',
          key: 'status',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Tag', {
                class: 'test',
                props: {
                  color: params.row.status === '0' ? 'success' : 'error'
                },
                domProps: {
                  innerHTML: params.row.status === '0' ? 'on' : 'off'
                }
              })
            ])
          },
          search: {
            type: 'radio'
          }
        },
        {
          title: '是否置顶',
          key: 'isTop',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  color: '#19be6b',
                  type: params.row.isTop === '1' ? 'md-checkmark' : '',
                  size: 20
                }
              })
            ])
          },
          search: {
            type: 'radio'
          }
        },
        {
          title: '设置',
          key: 'settings',
          slot: 'action',
          fixed: 'right',
          width: 160,
          align: 'center',
          hidden: true
        }
      ],
      pageArr: [10, 20, 30, 50, 100],
      tableData: []
    }
  },
  methods: {
    handleDeleteBatch() {
      // 批量进行删除
      if (this.selection.length === 0) {
        this.$Message.info('请选择需要删除的数据！')
        return
      }
      const msg = this.selection.map((o) => o.title).join(',')
      this.$Modal.confirm({
        title: '确定删除吗？',
        content: `删除${msg}的文章吗？`,
        onOk: () => {
          const arr = this.selection.map((o) => o._id)
          deletePostById(arr).then((res) => {
            // this.tableData.splice(index, 1)
            this.tableData = this.tableData.filter(
              (item) => !arr.includes(item._id)
            )
            this.$Message.success('删除成功！')
            //  this._getList()
          })
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    handleSetBatch() {
      // 批量进行删除
      if (this.selection.length === 0) {
        this.$Message.info('请选择需要删除的数据！')
        return
      }
      // 批量进行设置 -> vip, 禁言, 角色
      this.showSet = true
    },
    handleSelect(selection) {
      this.selection = selection
    },
    handleChangeEvent(value) {
      this.showEdit = value
    },
    handleSetChangeEvent(value) {
      this.showSet = value
    },
    handleItemEdit(item) {
      updatePostById(item).then((res) => {
        if (res.code === 200) {
          console.log('更新成功')
          // this.tableData[this.currentIndex] = item
          this.tableData.splice(this.currentIndex, 1, item)
        }
      })
      this.showEdit = false
    },
    // 批量设置模态框
    handleItemSet(settings) {
      const msg = this.selection.map((o) => o.title).join(',')
      this.$Modal.confirm({
        title: '确定修改吗？',
        content: `修改${msg}的文章吗`,
        onOk: () => {
          const arr = this.selection.map((o) => o._id)
          updatePostBatchById({ ids: arr, settings }).then((res) => {
            // this.tableData.splice(index, 1)
            this.tableData.map((item) => {
              if (arr.includes(item._id)) {
                for (var keys of Object.keys(settings)) {
                  item[keys] = settings[keys]
                }
              }
            })
            this.$Message.success('批量设置成功！')
            //  this._getList()
          })
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    handleRowEdit(row, index) {
      this.showEdit = true
      this.currentIndex = index
      this.currentItem = { ...row }
    },
    handleRowRemove(row, index) {
      this.$Modal.confirm({
        title: '确定删除文章吗？',
        content: `删除第${index + 1}条数据，文章标题："${row.title}"的文章吗`,
        onOk: () => {
          deletePostById(row._id)
            .then((res) => {
              if (res.code === 200) {
                this.$Message.info('成功删除！')
                this.tableData = this.tableData.filter(
                  (item) => item._id !== row._id
                )
              }
            })
            .catch((err) => {
              this.$Message.info('删除失败！原因：' + err)
            })
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    handleSearch(value) {
      // 判断是否有新的查询内容的传递，把分页数据归0
      this.option = {}
      this.page = 1
      // if (
      //   (typeof this.option.search !== 'undefined' &&
      //     value.search !== this.option.search) ||
      //   this.option === {}
      // ) {
      //   this.page = 1 // 从1开始
      // }
      if (value.item === 'tags') {
        value.item = 'tag'
      }
      this.option[value.item] = value.search
      this._getList()
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    onPageChange(page) {
      this.page = page
      this._getList()
    },
    onPageSizeChange(size) {
      this.limit = size
      this._getList()
    },
    _getList() {
      getList({
        page: this.page - 1,
        limit: this.limit,
        ...this.option
      }).then((res) => {
        // 方法一： -> 修改getList接口
        // const data = res.data
        // data.forEach((item) => {
        //   if (item.status === 0) {
        //     item.status = '打开回复'
        //   } else {
        //     item.status = '禁止回复'
        //   }
        // })
        this.tableData = res.data
        this.total = res.total
      })
    }
  },
  mounted() {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
.ctrls {
  button {
    margin-right: 10px;
  }
}
</style>
