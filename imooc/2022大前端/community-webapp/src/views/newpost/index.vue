<template>
  <div class="container01">
    <my-header title="新增帖子" :hasBack="true" :zIndex="1000"></my-header>
    <div class="container02">
      <input type="text" placeholder="请输入帖子标题" v-model="title" />
      <div class="line"></div>
      <textarea placeholder="请输入帖子内容" v-model="content"></textarea>
      <div class="img-container">
        <div v-for="(item, index) in fileList" :key="index" class="img-box"
          :style="{ background: 'url(' + item + ') no-repeat center' }"
        >
          <span class="delete-img" @click="deleteImg(index)">x</span>
        </div>
        <button class="add-img" @click="chooseImg">+</button>
      </div>
      <div class="line"></div>
      <div class="flex-between" @click="showCatalog=true">
        <span>发帖类型</span><span class="grey">{{ catalog.value }} ></span>
      </div>
      <div class="line"></div>
      <div class="flex-between" @click="showFavs=true">
        <span>奖励积分</span><span class="grey">{{ favs.value }} ></span>
      </div>
      <button class="submit" @click="submit" :style="{ background: isValidate ? '#02D199' : '#CCCCCC' }">
        发布
      </button>
    </div>
    <mt-popup v-model="showCatalog" popup-transition="popup-fade" style="width:100%">
      <mt-picker :slots="slots01" valueKey="value" @change="onValuesChange01"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showFavs" popup-transition="popup-fade" style="width:100%">
      <mt-picker :slots="slots02" valueKey="value" @change="onValuesChange02"></mt-picker>
    </mt-popup>
    <input type="file" id="imgField" @change="getFile" accept="image/png, image/jpeg, image/jpg" style="display:none" />
  </div>
</template>

<script>
import { uploadImg, addPost } from '../../api/content'
import { getMyCount } from '../../api/user'

// 把图片地址拼装成标签
const generateImageTag = imgList => {
  let tagStr = ''
  imgList.forEach(item => {
    tagStr += '<br /><img src="' + item + '" style="max-width:90%;" /><br />'
  })
  return tagStr
}

export default {
  name: 'newpost',
  data () {
    return {
      title: '',
      content: '',
      showCatalog: false,
      showFavs: false,
      fileList: [],
      slots01: [
        {
          values: [
            { key: '', value: '请选择' },
            { key: 'ask', value: '提问' },
            { key: 'share', value: '分享' },
            { key: 'discuss', value: '讨论' },
            { key: 'advise', value: '建议' }
          ],
          textAlign: 'center'
        }
      ],
      slots02: [
        {
          values: [
            { key: '', value: '请选择' }
          ],
          textAlign: 'center'
        }
      ],
      catalog: {},
      favs: {}
    }
  },
  mounted () {
    getMyCount({ // 去后台查询用户积分
      reqFavs: 1
    }).then(res => {
      const countFavs = res.countFavs
      if (countFavs < 20) {
        this.$Toast('您的积分少于 20 ，无法发帖！')
        return
      }
      const tempFavs = [20, 50, 80, 200, 500]
      tempFavs.forEach(item => {
        if (item <= countFavs) {
          this.slots02[0].values.push({ key: item, value: item + '积分' })
        }
      })
    })
  },
  methods: {
    chooseImg () {
      document.getElementById('imgField').click()
    },
    deleteImg (index) {
      this.fileList.splice(index, 1)
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
          this.fileList.push(res.data)
        } else {
          this.$Toast(res.msg)
        }
      })
    },
    onValuesChange01 (picker, values) {
      this.catalog = values[0]
    },
    onValuesChange02 (picker, values) {
      this.favs = values[0]
    },
    submit () {
      if (!this.isValidate) {
        return
      }
      this.$Loading.show()
      addPost({
        title: this.title,
        catalog: this.catalog.key,
        fav: this.favs.key,
        content: (this.content + generateImageTag(this.fileList))
      }).then(res => {
        this.$Loading.close()
        if (res.code === 200) {
          Object.assign(this.$data, this.$options.data.call(this)) // 清空当前页面的数据
          this.$Toast('发帖成功！')
          this.$router.back()
        } else {
          this.$Toast(res.msg)
        }
      })
    }
  },
  computed: {
    isValidate () {
      if (this.title && this.content && this.catalog.key && this.favs.key) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
@import '../../assets/styles/flex.css';

input, textarea {
  border: 0;
  width: 100%;
  outline: none;
}
textarea {
  height: 200px;
}
.container01 {
  padding-top: 100px;
}
.container02 {
  padding: 20px;
}
.line {
  margin: 20px 0;
  height: 1px;
  background-color: #DDDDDD;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color:rgba(204,204,204,1);
}
.img-container {
  display: flex;
}
.img-box {
  width: 160px;
  height: 160px;
  margin-right: 20px;
  text-align: right;
}
.delete-img {
  width:48px;
  height:48px;
  opacity:0.48;
}
.add-img {
  width: 160px;
  height: 160px;
  border: 0;
  color: #CCCCCC;
  font-size: 50px;
  font-family: cursive;
}
.grey {
  color: #999999;
}
.submit {
  margin-top: 200px;
  width: 100%;
  height: 80px;
  border: 0;
  color: #FFFFFF;
  border-radius:8px;
}
</style>
