<template>
  <div>
    <Card>
      <tables
        ref="tables"
        v-model="tableData"
        :columns="columns"
        @on-row-edit="handleRowEdit"
        @on-row-remove="handleRowRemove"
      />
      <Row
        type="flex"
        justify="space-between"
        align="middle"
        style="margin-top:10px"
      >
        <Button type="primary" @click="addTag()">新建标签</Button>
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
    <AddModel
      :isShow="isShow"
      :isEdit="isEdit"
      @addEvent="handleItemAdd"
      :item="currentItem"
      @changeEvent="handleChangeEvent"
    ></AddModel>
  </div>
</template>

<script>
import Tables from '_c/tables'
import AddModel from './tags/add'
import { getTags, removeTag, addTag, updateTag } from '@/api/content'
export default {
  name: 'content_management',
  components: {
    Tables,
    AddModel
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      isShow: false,
      isEdit: false,
      currentIndex: 0,
      currentItem: {},
      columns: [
        {
          title: '序号',
          key: 'sort',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [h('span', params.index + 1)])
          }
        },
        {
          title: '名称',
          key: 'tagName'
        },
        {
          title: '类名',
          key: 'tagClass',
          align: 'center'
        },
        {
          title: '设置',
          slot: 'action',
          align: 'center',
          key: 'settings'
        }
      ],
      pageArr: [10, 20, 30, 50, 100],
      tableData: []
    }
  },
  methods: {
    addTag() {
      this.isEdit = false
      this.isShow = true
    },
    handleChangeEvent(value) {
      this.currentItem = {}
      this.isEdit = false
      this.isShow = value
    },
    handleItemAdd(item) {
      if (!this.isEdit) {
        addTag(item).then((res) => {
          if (res.code === 200) {
            console.log('添加成功')
            this.page = 1
            this.limit = 10
            this._getTags()
          }
        })
      } else {
        updateTag(item).then((res) => {
          if (res.code === 200) {
            console.log('更新成功')
            this.page = 1
            this.limit = 10
            this._getTags()
          }
        })
      }
      this.currentItem = {}
      this.isEdit = false
      this.isShow = false
    },
    onPageChange(page) {
      this.page = page
      this._getTags()
    },
    onPageSizeChange(size) {
      this.limit = size
      this._getTags()
    },
    handleRowEdit(row, index) {
      this.isShow = true
      this.isEdit = true
      this.currentIndex = index
      this.currentItem = { ...row }
    },
    handleRowRemove(row, index) {
      this.$Modal.confirm({
        title: '确定删除吗？',
        content: `删除标签"${row.tagName}"吗`,
        onOk: () => {
          removeTag(row._id)
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
    _getTags() {
      getTags({ page: this.page - 1, limit: this.limit }).then((res) => {
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
    this._getTags()
  }
}
</script>

<style></style>
