<template>
  <view class="container">
    <u-form :model="form" ref="uForm" label-width="0">
      <u-form-item prop="title">
        <u-input v-model="form.title" placeholder="请输入帖子标题" clearable></u-input>
      </u-form-item>
      <u-form-item prop="content">
        <u-input v-model="form.content" placeholder="请输入帖子内容" type="textarea"></u-input>
      </u-form-item>

      <view class="upload-img">
        <view class="prev">设置封面图片:</view>
        <u-upload ref="uUpload" :file-list="fileList" action="#" :auto-upload="false" @on-list-change="uploadImg" multiple :max-size="5 * 1024 * 1024" max-count="1" />
      </view>
      <u-form-item :label-position="labelPosition" label="发贴类型" label-width="140" prop="catalog">
        <u-input class="right-text" type="select" :select-open="show1" v-model="form.catalog" placeholder="请选择发贴类型" @click="show1=true"></u-input>
        <u-select v-model="show1" :list="list" @confirm="confirmType"></u-select>
      </u-form-item>
      <!-- </view> -->
      <u-form-item label="奖励积分" label-width="140" prop="fav">
        <u-input class="right-text" type="select" :select-open="show" v-model="form.fav" placeholder="请选择奖励积分" @click="show=true"></u-input>
        <u-select v-model="show" :list="tempFavs" @confirm="confirmFav"></u-select>
      </u-form-item>
    </u-form>
    <view class="btn">
      <u-button size="default" type="primary" @click="addPost" hover-class="none">发布</u-button>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
import { authNav } from '@/common/checkAuth'
export default {
  components: {},
  data: () => ({
    show: false,
    show1: false,
    form: {
      title: '',
      content: '',
      catalog: '',
      fav: '',
      snapshot: ''
    },
    rules: {
      title: [
        {
          required: true,
          message: '请输入标题',
          // 可以单个或者同时写两个触发验证方式
          trigger: ['blur']
        }
      ],
      content: [
        {
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        }
      ],
      catalog: [
        {
          required: true,
          message: '请选择发贴类型',
          // 触发器可以同时用blur和change
          trigger: ['change', 'blur']
        }
      ],
      fav: [
        {
          required: true,
          message: '请选择积分',
          trigger: ['change', 'blur']
        }
      ]
    },
    list: [
      {
        value: '',
        label: '请选择'
      },
      {
        value: 'ask',
        label: '提问'
      },
      {
        value: 'share',
        label: '分享'
      },
      {
        value: 'discuss',
        label: '讨论'
      },
      {
        value: 'advise',
        label: '建议'
      }
    ],
    listIndex: 0,
    tempFavs: [
      {
        label: '请选择',
        value: ''
      },
      {
        label: '20',
        value: 20
      },
      {
        label: '30',
        value: 30
      },
      {
        label: '50',
        value: 50
      },
      {
        label: '100',
        value: 100
      }
    ],
    favIndex: 0,
    fileList: [],
    disabledButton: true
  }),
  computed: {
  },
  methods: {
    ...mapMutations(['setPage']),
    confirmType (e) {
      const index = this.list.findIndex(item => item.value === e[0].value)
      this.listIndex = index
      this.form.catalog = e[0].label
    },
    confirmFav (e) {
      const index = this.tempFavs.findIndex(item => item.value === e[0].value)
      this.favIndex = index
      this.form.fav = e[0].label
    },
    async uploadImg (lists, name) {
      if (lists.length > 0) {
        const res = await this.$u.api.uploadImg(lists[0].url)
        if (res.statusCode === 401) {
          await authNav('登录已失效，图片上传失败，请登录后重传！')
          this.$refs.uUpload.clear()
        }
        if (res.statusCode === 200) {
          const { data } = res
          const { code, msg, data: url } = JSON.parse(data)
          if (code === 200) {
            this.form.snapshot = url
          }
          uni.showToast({
            icon: 'none',
            title: msg,
            duration: 2000
          })
        }
      }
    },
    addPost () {
      this.$refs.uForm.validate(async valid => {
        if (valid) {
          const data = {
            ...this.form,
            catalog: this.list[this.listIndex].value,
            fav: this.tempFavs[this.favIndex].value
          }
          const { code, msg, data: res } = await this.$u.api.addPost(data)
          // console.log('🚀 ~ file: post.vue ~ line 157 ~ addPost ~ res', res)
          if (code === 200 && res._id) {
            uni.showToast({
              icon: 'none',
              title: msg,
              duration: 2000
            })
            uni.navigateBack()
          } else {
            // 内容审核提示
            if (code === 500 && /内容安全/.test(msg)) {
              uni.showModal({
                title: '注意文明用语',
                content: '发布内容没有通过内容审核，请检查后重新提效',
                showCancel: false,
                success: function (res) {
                  console.log(res)
                }
              })
              return
            }
            uni.showToast({
              icon: 'none',
              title: msg,
              duration: 2000
            })
          }
        } else {
          console.log('验证失败')
        }
      })
    }
  },
  onReady () {
    this.$refs.uForm.setRules(this.rules)
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 32rpx;
}

::v-deep .edit-post {
  position: relative;
  textarea {
    max-height: 400rpx;
  }
  .u-clear-icon {
    position: absolute;
    right: 10rpx;
    bottom: 30rpx;
  }
}

.btn {
  margin-top: 60rpx;
}

::v-deep .right-text {
  .u-input__input {
    text-align: end;
    padding-right: 15rpx;
  }
}

.prev {
  padding: 15rpx 0 30rpx;
}
</style>
