<template>
  <div>
    <Modal
      v-model="showStatus"
      title="批量设置"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Form :model="localItem" :label-width="80" ref="table">
        <FormItem label="分类">
          <Select v-model="localItem.catalog">
            <Option
              v-for="(item, index) in catalogs"
              :value="item.value"
              :key="'catalog-' + index"
              >{{ item.key }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="标签">
          <Select v-model="localItem.tags" multiple>
            <Option
              v-for="(item, index) in tags"
              :value="item._id"
              :key="'tags-' + index"
              >{{ item.tagName }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否结束">
          <RadioGroup v-model="localItem.isEnd">
            <Radio label>不设置</Radio>
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="关闭评论">
          <RadioGroup v-model="localItem.status">
            <Radio label>不设置</Radio>
            <Radio label="0">打开回复</Radio>
            <Radio label="1">关闭回复</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否置顶">
          <RadioGroup v-model="localItem.isTop">
            <Radio label>不设置</Radio>
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getTags } from '@/api/content'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow() {
      this.showStatus = this.isShow
    }
  },
  data() {
    return {
      showStatus: false,
      roles: ['super_admin', 'admin', 'user'],
      tags: [],
      localItem: {
        catalog: '',
        status: '',
        isEnd: '',
        isTop: '',
        tags: []
      },
      catalogs: [
        {
          key: '提问',
          value: 'ask'
        },
        {
          key: '建议',
          value: 'advise'
        },
        {
          key: '分享',
          value: 'share'
        },
        {
          key: '动态',
          value: 'logs'
        },
        {
          key: '公告',
          value: 'notice'
        }
      ]
    }
  },
  mounted() {
    getTags({ page: 0, limit: 1000 }).then((res) => {
      this.tags = res.data
    })
  },
  methods: {
    ok() {
      // this.$refs.table.resetFields()
      this.$emit('changeEvent', false)
      const result = {}
      for (var key of Object.keys(this.localItem)) {
        const tags = []
        if (key === 'tags' && this.localItem.tags.length > 0) {
          this.tags.map((o) => {
            if (this.localItem.tags.includes(o._id)) {
              tags.push({
                class: o.tagClass,
                name: o.tagName
              })
            }
          })
          this.localItem[key] = tags
        }
        if (this.localItem[key] !== '') {
          result[key] = this.localItem[key]
        }
      }
      this.$emit('editEvent', result)
      this.$Message.info('设置成功！')
    },
    cancel() {
      this.$refs.table.resetFields()
      this.$emit('changeEvent', false)
      this.$Message.info('取消设置！')
    }
  }
}
</script>
