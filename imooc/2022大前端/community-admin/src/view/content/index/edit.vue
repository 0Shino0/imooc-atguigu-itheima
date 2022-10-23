<template>
  <div>
    <Modal
      v-model="showStatus"
      title="编辑文章属性"
      @on-ok="ok"
      @on-cancel="cancel"
      :loading="loading"
    >
      <Form :model="localItem" :rules="rules" :label-width="80" ref="table">
        <FormItem label="标题" prop="title">
          <Input v-model="localItem.title" placeholder="请输入文章标题"></Input>
        </FormItem>
        <FormItem label="分类">
          <Select v-model="localItem.catalog">
            <Option value="ask">提问</Option>
            <Option value="advise">建议</Option>
            <Option value="discuss">讨论</Option>
            <Option value="share">分享</Option>
            <Option value="logs">动态</Option>
            <Option value="notice">公告</Option>
          </Select>
        </FormItem>
        <FormItem label="是否结束">
          <RadioGroup v-model="localItem.isEnd">
            <Radio label="0">未结束</Radio>
            <Radio label="1">已结贴</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="回复状态">
          <RadioGroup v-model="localItem.status">
            <Radio label="0">打开回复</Radio>
            <Radio label="1">禁止回复</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否置顶">
          <RadioGroup v-model="localItem.isTop">
            <Radio label="0">未置顶</Radio>
            <Radio label="1">已置顶</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="帖子积分">
          <Slider v-model="formatFav" show-input :step="10"></Slider>
        </FormItem>
        <FormItem label="标签">
          <Select v-model="formatTags" multiple>
            <Option
              v-for="(item, index) in tagsList"
              :value="item.tagName"
              :key="'editTags-' + index"
              >{{ item.tagName }}</Option
            >
          </Select>
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
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    item(newval, oldval) {
      this.localItem = newval
    },
    isShow() {
      this.showStatus = this.isShow
    }
  },
  computed: {
    formatFav: {
      get() {
        return parseInt(this.localItem.fav)
      },
      set(value) {
        this.localItem.fav = value
      }
    },
    formatTags: {
      get() {
        return this.localItem.tags.map((o) => o.name)
      },
      set(value) {
        const arr = this.tagsList.filter(
          (item) => value.indexOf(item.tagName) !== -1
        )
        this.localItem.tags = arr.map((o) => {
          return {
            class: o.tagClass,
            name: o.tagName
          }
        })
        // this.localItem.tags.push()
      }
    }
  },
  data() {
    return {
      loading: true,
      showStatus: false,
      tagsList: [],
      localItem: {
        tid: '',
        uid: '',
        title: '',
        content: '',
        created: '',
        catalog: '',
        fav: 0,
        isEnd: '0',
        reads: 0,
        answer: 0,
        status: '0',
        isTop: '0',
        sort: 'created',
        tags: []
      },
      rules: {
        title: [{ required: true, message: '标题不得为空！', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this._getTags()
  },
  methods: {
    _getTags() {
      getTags().then((res) => {
        if (res.code === 200) {
          this.tagsList = res.data
        }
      })
    },
    ok() {
      // this.$emit('editEvent', this.localItem)
      // this.$Message.info('编辑成功！')
      this.$refs.table.validate((valid) => {
        if (valid) {
          this.loading = false
          this.$emit('changeEvent', false)
          this.$emit('editEvent', this.localItem)
          this.$Message.info('编辑成功！')
        } else {
          this.loading = false
          this.$nextTick(() => (this.loading = true))
          this.$Message.error('请检查输入数据')
        }
      })
    },
    cancel() {
      this.$emit('changeEvent', false)
      this.$Message.info('取消编辑！')
    }
  }
}
</script>
