<template>
  <!-- 上传头像 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </label>
        <input
          id="pic"
          type="file"
          name="file"
          accept="image/png, image/gif, image/jpg"
          @change="upload"
        />
        <img :src="pic" />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'
export default {
  name: 'pic-upload',
  data () {
    return {
      // 判断 userInfo & pic 是否存在
      pic:
        this.$store.state.userInfo && this.$store.state.userInfo.pic
          ? this.$store.state.userInfo.pic
          : '/img/bear-200-200.jpg',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      // 上传图片的之后 -> uploadImg
      uploadImg(formData).then((res) => {
        if (res.code === 200) {
          this.pic = res.data
          // 更新用户基本资料 -> updateUserInfo
          updateUserInfo({ pic: this.pic }).then((res) => {
            if (res.code === 200) {
              // 修改全局的 store 内的用户基础信息
              let user = this.$store.state.userInfo
              this.$set(this.$store.state.userInfo, 'pic', this.pic)
              this.$store.commit('setUserInfo', user)
              this.$alert('图片上传成功')
            }
          })
          document.getElementById('pic').value = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#pic {
  display: none;
}
</style>
