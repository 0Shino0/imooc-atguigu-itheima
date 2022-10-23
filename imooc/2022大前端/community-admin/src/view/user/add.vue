<template>
  <div>
    <Modal
      v-model="showStatus"
      title="添加用户信息"
      @on-ok="ok"
      @on-cancel="cancel"
      :loading="loading"
    >
      <Form
        :model="localItem"
        :label-width="80"
        :rules="ruleValidate"
        ref="table"
      >
        <FormItem label="登录名" prop="username">
          <Input
            prefix="md-mail"
            v-model="localItem.username"
            placeholder="请输入登录名"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            prefix="md-lock"
            v-model="localItem.password"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
        <FormItem label="角色" prop="roles">
          <Select v-model="localItem.roles" multiple>
            <Option
              v-for="(item, index) in roles"
              :value="item.role"
              :key="'roles-' + index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="用户昵称" prop="name">
          <Input
            prefix="md-person"
            v-model="localItem.name"
            placeholder="请输入用户昵称"
          ></Input>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input
            v-model="localItem.mobile"
            placeholder="请输入用户手机号"
          ></Input>
        </FormItem>
        <FormItem label="是否禁用">
          <RadioGroup v-model="localItem.status">
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否是VIP">
          <RadioGroup v-model="localItem.isVip">
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="用户积分" prop="favs">
          <Input v-model="localItem.favs" style="width: 120px;"></Input>
        </FormItem>
        <FormItem label="所在城市">
          <Input
            prefix="md-pin"
            v-model="localItem.location"
            placeholder="请输入用户所在城市"
          ></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="localItem.status">
            <Radio label="0">男</Radio>
            <Radio label="1">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="个性签名">
          <Input
            type="textarea"
            v-model="localItem.regmark"
            placeholder="请输入用户个性签名"
          ></Input>
        </FormItem>
        <!-- <FormItem label="标签">
          <Select v-model="formatTags" multiple>
            <Option
              v-for="(item,index) in tagsList"
              :value="item.tagName"
              :key="'editTags-' + index"
            >{{ item.tagName }}</Option>
          </Select>
        </FormItem>-->
      </Form>
    </Modal>
  </div>
</template>
<script>
import { userDispatch } from '@/api/admin'
const favPassCheck = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户积分'))
  }
  if (!/^[1-9]\d*$/.test(value)) {
    callback(new Error('请输入正确的数值'))
  }
  const result = parseInt(value)
  if (result % 10 === 0) {
    callback()
  } else {
    callback(new Error('请输入可以除以10的整数'))
  }
}
const userNamePassCheck = (rule, value, callback) => {
  userDispatch.use('check', { username: value }).then((res) => {
    if (res.code === 200) {
      const data = res.data
      if (data === 1) {
        // 校验通过
        callback()
      } else if (data === 0) {
        // 校验失败
        callback(new Error('用户名冲突！请更换！'))
      }
    }
  })
}
const mobileCheck = (rule, value, callback) => {
  if (/^1[3456789]\d{9}$/.test(value)) {
    callback()
  } else {
    callback(new Error('请检查手机格式！'))
  }
}

const rolesCheck = (rule, value, callback) => {
  if (value.length === 0) {
    callback(new Error('请选择用户角色!'))
  } else {
    callback()
  }
}

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {}
    },
    roles: {
      type: Array,
      default: () => []
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
  data() {
    return {
      loading: true,
      showStatus: false,
      tagsList: [],
      localItem: {
        name: '',
        username: '',
        password: '',
        roles: ['user'],
        status: '0',
        favs: 100,
        gender: '',
        location: '',
        mobile: '',
        regmark: '用户很懒，什么都没有留下~',
        isVip: '0'
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          {
            type: 'string',
            min: 4,
            message: '昵称长度至少为4位',
            trigger: 'change'
          },
          {
            type: 'string',
            max: 16,
            message: '昵称长度不能超过16位',
            trigger: 'change'
          }
        ],
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { type: 'email', message: '请检查邮箱格式', trigger: 'blur' },
          { validator: userNamePassCheck, trigger: 'blur' }
        ],
        roles: [{ validator: rolesCheck, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码长度至少为6位',
            trigger: 'change'
          },
          {
            type: 'string',
            max: 20,
            message: '密码长度不能超过20位',
            trigger: 'change'
          }
        ],
        favs: [
          // { required: true, message: '请输入用户积分', trigger: 'blur' },
          { validator: favPassCheck, trigger: 'change' }
        ],
        mobile: [{ validator: mobileCheck, trigger: 'blur' }]
      }
    }
  },
  mounted() {},
  methods: {
    ok() {
      this.$refs.table.validate((valid) => {
        if (valid) {
          this.loading = false
          this.$emit('changeEvent', false)
          this.$emit('editEvent', { ...this.localItem })
          setTimeout(() => {
            this.$refs.table.resetFields()
          }, 0)
          this.$Message.info('添加成功！')
        } else {
          this.loading = false
          this.$nextTick(() => (this.loading = true))
          this.$Message.error('请检查输入数据')
        }
      })
    },
    cancel() {
      this.$refs.table.resetFields()
      this.$emit('changeEvent', false)
      this.$Message.info('取消编辑！')
    }
  }
}
</script>
