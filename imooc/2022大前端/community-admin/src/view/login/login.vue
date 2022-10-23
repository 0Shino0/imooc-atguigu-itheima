<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form
            :loading="loading"
            @on-success-valid="handleSubmit"
          ></login-form>
          <p class="login-tip">欢迎来到imooc社区</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { menuDispatch } from '@/api/admin'
import communityRoutes from '@/router/community'
import _import from '@/libs/_import'
import { resetRouter } from '@/router'
import { filterRoutes, getRoutesName, localSave } from '@/libs/util'
import routes from '@/router/routers'

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit(options) {
      this.loading = true
      this.handleLogin(options).then((res) => {
        console.log('handleSubmit -> res', res)
        this.loading = false
        if (res.code === 200) {
          const roles = res.data.roles
          if (roles.includes('super_admin')) {
            // 说明是超级管理用户
            resetRouter()
            const newRoutes = communityRoutes
            this.$router.addRoutes(newRoutes)
            // 设置store中的router规则
            this.$store.commit('setRouters', newRoutes.concat(routes))
            this.$router.push({
              name: this.$config.homeName
            })
            return
          }
          // 用户登录成功之后，获取菜单数据
          menuDispatch.use('route').then((res) => {
            if (res.code === 200) {
              const routesData = res.data
              localSave('routes', res.data)
              const routesName = getRoutesName(routesData)
              const newRoutes = filterRoutes(communityRoutes, routesName)
              // const newRoutes = communityRoutes.filter((item) => routesName.includes(item.name))
              // 动态设置路由
              // addRoutes
              newRoutes.map((item) => {
                if (typeof item.component === 'string') {
                  item.component = _import(item.component)
                }
                if (item.children && item.children.length > 0) {
                  item.children.map((i) => {
                    if (typeof i.component === 'string') {
                      i.component = _import(i.component)
                    }
                  })
                }
              })
              resetRouter()
              this.$router.addRoutes(newRoutes)
              // 设置store中的router规则
              this.$store.commit('setRouters', newRoutes.concat(routes))
              this.$router.push({
                name: this.$config.homeName
              })
            }
          })
        } else {
          this.$Message.error(res.msg)
        }
        // this.getUserInfo().then((res) => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
      })
    }
  }
}
</script>

<style></style>
