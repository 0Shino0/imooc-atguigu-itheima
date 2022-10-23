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
      ></tables>
      <Row type="flex" justify="space-between" align="middle">
        <i-col class="ctrls">
          <Button @click="handleDeleteBatch()">批量删除</Button>
          <Button @click="handleSetBatch()">批量设置</Button>
        </i-col>
        <i-col>
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
        </i-col>
      </Row>
    </Card>
    <BatchSet
      :isShow="showSet"
      :users="users"
      @editEvent="handleItemSet"
      @changeEvent="handleSetChangeEvent"
    ></BatchSet>
  </div>
</template>

<script>
import { commentsDispatch } from '@/api/admin'
import Tables from '_c/tables'
import BatchSet from './batchSet'
import Expand from './expand.vue'
import More from './more.vue'
import dayjs from 'dayjs'
export default {
  name: 'menu_management', // => 等价于notCache
  components: {
    Tables,
    BatchSet
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      option: {},
      showSet: false,
      currentIndex: 0,
      currentItem: {},
      columns: [
        {
          type: 'expand',
          key: 'stack',
          width: 50,
          render: (h, params) => {
            return h(Expand, {
              props: {
                row: params.row
              }
            })
          },
          hidden: true
        },
        {
          type: 'selection',
          width: 60,
          align: 'center',
          hidden: true
        },
        {
          title: '文章标题',
          key: 'tid',
          minWidth: 160,
          search: {
            type: 'input'
          },
          render: (h, params) => {
            const name = params.row.tid
              ? params.row.tid.title
              : '无标题，请核查！'
            return h('div', name)
          }
        },
        {
          title: '文章作者',
          key: 'uid',
          align: 'center',
          minWidth: 120,
          search: {
            type: 'input'
          },
          render: (h, params) => {
            const name = params.row.uid
              ? params.row.uid.name
              : '无用户昵称，请核查！'
            return h('div', name)
          }
        },
        {
          title: '评论用户',
          key: 'cuid',
          align: 'center',
          minWidth: 120,
          search: {
            type: 'input'
          },
          render: (h, params) => {
            const name = params.row.cuid
              ? params.row.cuid.name
              : '无评论用户昵称，请核查！'
            return h('div', name)
          }
        },
        {
          title: '回复内容',
          key: 'content',
          minWidth: 240,
          search: {
            type: 'input'
          },
          render: (h, params) => {
            return h(More, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '是否显示',
          key: 'status',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  color: params.row.status === '1' ? '#19be6b' : '#ed4014',
                  type: params.row.status === '1' ? 'md-checkmark' : 'md-close',
                  size: 20
                }
              })
            ])
          },
          search: {
            type: 'radio',
            options: [
              {
                key: '全部',
                value: ''
              },
              {
                key: '否',
                value: '0'
              },
              {
                key: '是',
                value: '1'
              }
            ]
          }
        },
        {
          title: '是否采纳',
          key: 'isBest',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  color: '#19be6b',
                  type: params.row.isBest === '1' ? 'md-checkmark' : '',
                  size: 20
                }
              })
            ])
          },
          search: {
            type: 'radio',
            options: [
              {
                key: '全部',
                value: ''
              },
              {
                key: '否',
                value: '0'
              },
              {
                key: '是',
                value: '1'
              }
            ]
          }
        },
        {
          title: '创建时间',
          key: 'created',
          align: 'center',
          minWidth: 180,
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
          title: '设置',
          key: 'settings',
          slot: 'action',
          hidden: true,
          fixed: 'right',
          width: 100,
          align: 'center',
          options: ['delete']
        }
      ],
      pageArr: [10, 20, 30, 50, 100],
      tableData: [],
      selection: []
    }
  },
  computed: {
    users() {
      const arr = this.selection.reduce((obj, item) => {
        return {
          ...obj,
          [item.cuid._id]: item.cuid.name
        }
      }, {})
      return arr
    }
  },
  mounted() {
    this.option = { item: 'status', search: '1' }
    this._getList()
  },
  methods: {
    handleDeleteBatch() {
      // 批量进行删除
      if (this.selection.length === 0) {
        this.$Message.info('请选择需要删除的数据！')
        return
      }
      const msg = this.selection.map((o) => o.content).join(',')
      this.$Modal.confirm({
        title: '确定删除吗？',
        content: `删除${msg}的评论`,
        onOk: () => {
          const arr = this.selection.map((o) => o._id)
          commentsDispatch.use('delete', { ids: arr }).then((res) => {
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
        this.$Message.info('请选择需要设置的数据！')
        return
      }
      // 批量进行设置 -> vip, 禁言, 角色
      this.showSet = true
    },
    handleSelect(selection) {
      this.selection = selection
    },
    handleSetChangeEvent(value) {
      this.showSet = value
    },
    // 批量设置模态框
    handleItemSet(settings) {
      const num = this.selection.length
      let msg = `设置${num}评论吗？`
      if (settings.forbit === '1' && settings.users.length > 0) {
        const users = []
        settings.users.forEach((item) => {
          users.push(this.users[item])
        })
        msg = `确定设置${users.join(',')}用户禁止发言吗？`
      }
      // const msg = this.selection.map((o) => o.cuid.name).join(',')
      this.$Modal.confirm({
        title: '确定修改？',
        content: msg,
        onOk: () => {
          const arr = this.selection.map((o) => o._id)
          if (settings.forbit !== '1') {
            delete settings.users
            commentsDispatch
              .use('batch', { ids: arr, settings })
              .then((res) => {
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
          } else {
            userDispatch
              .use('batch', { ids: arr, settings: { status: '1' } })
              .then((res) => {
                // this.tableData.splice(index, 1)
                this.tableData = this.tableData.map((item) => {
                  if (arr.includes(item._id)) {
                    for (var keys of Object.keys(settings)) {
                      item[keys] = settings[keys]
                    }
                  }
                })
                this.$Message.success('批量设置成功！')
                //  this._getList()
              })
          }
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    handleRowEdit(row, index) {
      this.currentIndex = index
      this.currentItem = { ...row }
    },
    handleRowRemove(row, index) {
      this.$Modal.confirm({
        title: '确定删除用户吗？',
        content: `删除${row.name}的用户`,
        onOk: () => {
          userDispatch.use('delete', row._id).then((res) => {
            this.tableData.splice(index, 1)
            this.$Message.success('删除成功！')
          })
        },
        onCancel: () => {
          this.$Message.info('取消操作！')
        }
      })
    },
    handleSearch(value) {
      // 判断是否有新的查询内容的传递，把分页数据归0
      if (
        (typeof this.option.search !== 'undefined' &&
          value.search !== this.option.search) ||
        this.option === {}
      ) {
        this.page = 1 // 从1开始
      }
      this.option = value
      // if (value.search === '') {
      //   this.option = {}
      // } else {
      //   this.option[value.item] = value.search
      // }
      this._getList()
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
      commentsDispatch
        .use('get', {
          page: this.page - 1,
          limit: this.limit,
          options: this.option
        })
        .then((res) => {
          this.tableData = res.data
          this.total = res.total
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ctrls {
  button {
    margin-top: 10px;
    margin-right: 10px;
  }
}
</style>
