# 前端框架搭建

## 项目初始化

::: tip
[查看](https://github.com/PanJiaChen/vue-element-admin) vue-element-admin 源码
:::

```bash
git clone https://github.com/PanJiaChen/vue-element-admin
cd vue-element-admin
npm i
npm run dev
```

## 项目精简

- 删除 src/views 下的源码，保留：
    - dashboard：首页
    - error-page：异常页面
    - login：登录
    - redirect：重定向
- 对 src/router/index 进行相应修改
- 删除 src/router/modules 文件夹
- 删除 src/vendor 文件夹

:::warning
如果是线上项目，建议将 components 的内容也进行清理，以免影响访问速度，或者直接[使用](https://github.com/PanJiaChen/vue-admin-template) vue-admin-template 构建项目，课程选择 vue-element-admin 初始化项目，是因为 vue-element-admin 实现了登录模块，包括 token 校验、网络请求等，可以简化我们的开发工作
:::

## 项目配置

通过 src/settings.js 进行全局配置：

- title：站点标题，进入某个页面后，格式为：
```bash
页面标题 - 站点标题
```
- showSettings：是否显示右侧悬浮配置按钮
- tagsView：是否显示页面标签功能条
- fixedHeader：是否将头部布局固定
- sidebarLogo：菜单栏中是否显示LOGO
- errorLog：默认显示错误日志的环境

## 源码调试

如果需要进行源码调试，需要修改 vue.config.js：

```js
config
  // https://webpack.js.org/configuration/devtool/#development
  .when(process.env.NODE_ENV === 'development',
    config => config.devtool('cheap-source-map')
  )
```

将 cheap-source-map 改为 source-map，如果希望提升构建速度可以改为 eval

> 通常建议开发时保持 eval 配置，以增加构建速度，当出现需要源码调试排查问题时改为 source-map

## 项目结构

- api：接口请求
- assets：静态资源
- components：通用组件
- directive：自定义指令
- filters：自定义过滤器
- icons：图标组件
- layout：布局组件
- router：路由配置
- store：状态管理
- styles：自定义样式
- utils：通用工具方法
    - auth.js：token 存取
    - permission.js：权限检查
    - request.js：axios 请求封装
    - index.js：工具方法
- views：页面
- permission.js：登录认证和路由跳转
- settings.js：全局配置
- main.js：全局入口文件
- App.vue：全局入口组件
