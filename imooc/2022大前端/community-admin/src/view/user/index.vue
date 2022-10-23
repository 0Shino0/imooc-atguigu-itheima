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
      >
        <template v-slot:table-header>
          <Button @click="handleAddUser" class="search-btn" type="primary">
            <Icon type="md-person-add" />&nbsp;&nbsp;新增用户
          </Button>
        </template>
      </tables>
      <Row type="flex" justify="space-between" align="middle">
        <Col class="ctrls">
          <Button @click="handleDeleteBatch()">批量删除</Button>
          <Button @click="handleSetBatch()">批量设置</Button>
          <Button style="margin: 10px 0;" type="primary" @click="exportExcel">
            <Icon type="md-download"></Icon>导出表格
          </Button>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </Card>
    <EditModel
      :isShow="showEdit"
      :item="currentItem"
      :roles="roles"
      @editEvent="handleItemEdit"
      @changeEvent="handleChangeEvent"
    ></EditModel>
    <AddModel
      :isShow="showAdd"
      :roles="roles"
      @editEvent="handleItemAdd"
      @changeEvent="handleAddChangeEvent"
    ></AddModel>
    <BatchSet
      :isShow="showSet"
      :roles="roles"
      @editEvent="handleItemSet"
      @changeEvent="handleSetChangeEvent"
    ></BatchSet>
  </div>
</template>

<script>
import { userDispatch, roleDispatch } from '@/api/admin'
import Tables from '_c/tables'
import EditModel from './edit'
import AddModel from './add'
import BatchSet from './batchSet'
import dayjs from 'dayjs'
export default {
  name: 'menu_management', // => 等价于notCache
  components: {
    Tables,
    EditModel,
    AddModel,
    BatchSet
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      option: {},
      roles: [],
      showEdit: false,
      showAdd: false,
      showSet: false,
      currentIndex: 0,
      currentItem: {},
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          hidden: true
        },
        {
          title: '用户昵称',
          key: 'name',
          minWidth: 140,
          search: {
            type: 'input'
          }
        },
        {
          title: '登录名',
          key: 'username',
          minWidth: 160,
          search: {
            type: 'input'
          }
        },
        {
          title: '角色',
          key: 'roles',
          align: 'center',
          minWidth: 160,
          render: (h, params) => {
            const roleNames = params.row.roles
              .map((o) => this.roleNames[o])
              .join(',')
            return h('div', [h('span', roleNames)])
          },
          search: {
            type: 'select',
            options: [
              {
                key: '超级管理员',
                value: 'super_admin'
              },
              {
                key: '管理员',
                value: 'admin'
              },
              {
                key: '普通用户',
                value: 'user'
              }
            ]
          }
        },
        {
          title: '积分',
          key: 'favs',
          align: 'center',
          hidden: true,
          minWidth: 80
        },
        {
          title: '是否禁用',
          key: 'status',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h('span', params.row.status === '0' ? '否' : '是')
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
          title: '是否是VIP',
          key: 'isVip',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            return h('div', [h('span', params.row.isVip === '0' ? '否' : '是')])
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
          align: 'center'
        }
      ],
      pageArr: [10, 20, 30, 50, 100],
      tableData: [],
      selection: []
    }
  },
  computed: {
    roleNames() {
      const tmp = {}
      this.roles.forEach((item) => {
        tmp[item.role] = item.name
      })
      return tmp
    }
  },
  mounted() {
    this._getList()
    this._getRoleNames()
  },
  methods: {
    handleDeleteBatch() {
      // 批量进行删除
      if (this.selection.length === 0) {
        this.$Message.info('请选择需要删除的数据！')
        return
      }
      const msg = this.selection.map((o) => o.username).join(',')
      this.$Modal.confirm({
        title: '确定删除用户吗？',
        content: `删除${msg}的用户`,
        onOk: () => {
          const arr = this.selection.map((o) => o._id)
          userDispatch.use('delete', { ids: arr }).then((res) => {
            // this.tableData.splice(index, 1)
            this.tableData.filter((item) => !arr.includes(item._id))
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
    handleAddUser() {
      this.showAdd = true
    },
    handleChangeEvent(value) {
      this.showEdit = value
    },
    handleAddChangeEvent(value) {
      this.showAdd = value
    },
    handleSetChangeEvent(value) {
      this.showSet = value
    },
    // 添加模态框
    handleItemAdd(item) {
      userDispatch.use('add', item).then((res) => {
        if (res.code === 200) {
          // this.tableData[this.currentIndex] = item
          this.tableData.splice(0, 0, res.data)
        }
      })
    },
    // 编辑模态框
    handleItemEdit(item) {
      userDispatch.use('update', item).then((res) => {
        if (res.code === 200) {
          // this.tableData[this.currentIndex] = item
          this.tableData.splice(this.currentIndex, 1, item)
        } else {
          this.$Message.error(res.msg)
        }
      })
      this.showEdit = false
    },
    // 批量设置模态框
    handleItemSet(settings) {
      const msg = this.selection.map((o) => o.username).join(',')
      this.$Modal.confirm({
        title: '确定修改用户吗？',
        content: `修改${msg}的用户`,
        onOk: () => {
          const arr = this.selection.map((o) => o._id)
          userDispatch.use('batch', { ids: arr, settings }).then((res) => {
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
        title: '确定删除用户吗？',
        content: `删除${row.name}的用户`,
        onOk: () => {
          userDispatch.use('delete', { ids: [row._id] }).then((res) => {
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
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      })
    },
    _getList() {
      userDispatch
        .use('get', {
          page: this.page - 1,
          limit: this.limit,
          option: this.option
        })
        .then((res) => {
          this.tableData = res.data
          this.total = res.total
        })
    },
    _getRoleNames() {
      roleDispatch.use('roles').then((res) => {
        if (res.code === 200) {
          this.roles = res.data
        }
      })
    }
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
