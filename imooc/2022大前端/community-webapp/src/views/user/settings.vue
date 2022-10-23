<template>
  <div>
    <my-header title="修改设置"></my-header>
    <div class="container">
      <div class="wrapper">
        <div class="img">
          <label for="img">
            <img :src="form.pic" alt />
            <i></i>
          </label>
          <input type="file" class="none" id="img" accept=".gif, .jpg, .png" @change="getFile" />
          <svg-icon icon="camera" class="upload"></svg-icon>
        </div>
      </div>
      <mt-field label="账号" placeholder="请输入邮箱" v-model="form.username"></mt-field>
      <mt-field label="昵称" placeholder="请输入昵称" v-model="form.name"></mt-field>
      <mt-field label="城市" placeholder="请输入城市" v-model="form.location"></mt-field>
      <mt-cell title="性别" @click.native="showAction()">
        <span>
          {{ form.gender && (form.gender === '0' ? '男' : '女') }}
          <svg-icon icon="arrow-right"></svg-icon>
        </span>
      </mt-cell>
      <mt-field
        class="cell-title"
        label="个人签名"
        placeholder="介绍一下你吧"
        type="textarea"
        rows="3"
        v-model="form.regmark"
      ></mt-field>
      <mt-actionsheet :actions="genderAction" v-model="sheetVisible"></mt-actionsheet>
      <div class="ctrls">
        <mt-button type="primary" size="large" @click="submit()">确定</mt-button>
        <mt-button type="default" size="large" @click="$router.back()">取消</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { uploadImg } from '../../api/content'

export default {
  name: 'settings',
  data () {
    return {
      form: {
        username: '',
        name: '',
        gender: '',
        location: '',
        regmark: '',
        pic: ''
      },
      sheetVisible: false,
      imgFile: '',
      genderAction: []
    }
  },
  mounted () {
    const { userInfo } = this.$store.state.user
    Object.keys(this.form).forEach(key => {
      this.form[key] = userInfo[key]
    })
    this.genderAction = [
      {
        name: '男',
        value: '0',
        method: this.setGender
      },
      {
        name: '女',
        value: '1',
        method: this.setGender
      }
    ]
  },
  methods: {
    ...mapActions({
      updateUserInfoX: 'user/updateUserInfoX'
    }),
    setGender (obj) {
      this.form.gender = obj.value
    },
    showAction () {
      this.sheetVisible = true
    },
    getFile (e) {
      const img = e.target.files[0]
      if (img.size > 3145728) {
        this.$Toast('请选择3M以内的图片！')
        return
      }
      this.$Loading.show()
      const form = new FormData()
      form.append('file', img, img.name)
      uploadImg(form).then(res => {
        this.$Loading.close()
        if (res.code === 200) {
          this.form.pic = res.data
        } else {
          this.$Toast('图片上传失败！')
        }
      })
    },
    submit () {
      this.$Loading.show('修改中...')
      this.updateUserInfoX(this.form).then(res => {
        this.$Loading.close()
        this.$Toast(res.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // padding-top: $header-height + 10;
  padding: $header-height + 10 30px 30px;
}
.divider {
  height: 24px;
  background: #f6f6f6;
  width: 100vw;
  margin-left: -30px;
}
.wrapper {
  text-align: center;
}
.img {
  margin: 40px 0;
  text-align: center;
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  img {
    border-radius: 50%;
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
  }
  i {
    display: inline-block;
    width: 200px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    z-index: 50;
    left: 50%;
    margin-left: -100px;
  }
  .none {
    display: none;
  }
  .upload {
    position: absolute;
    bottom: 10px;
    left: 50%;
    color: #fff;
    font-size: 40px;
    margin-left: -20px;
    z-index: 100;
  }
}
.ctrls {
  padding: 0 30px;
  margin-top: 60px;
  button {
    margin-bottom: 30px;
  }
}
</style>
