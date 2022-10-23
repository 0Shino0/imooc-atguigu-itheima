# 项目介绍

## 简介

toimc社区项目是toimc团队为[《大前端》]([https://class.imooc.com/sale/webfullstack?mc_marking=1eb5ce0be2ada8da4a6387b391f00b92&mc_channel=syzcjj1](https://class.imooc.com/sale/webfullstack?mc_marking=1eb5ce0be2ada8da4a6387b391f00b92&mc_channel=syzcjj1))课程打造的完整的通用社区项目，项目包含[toimc社区-Web前端]([https://git.imooc.com/class-70/toimc-front](https://git.imooc.com/class-70/toimc-front))、[toimc社区-内容管理平台]([https://git.imooc.com/class-70/toimc-admin](https://git.imooc.com/class-70/toimc-admin))、[toimc社区-数据后台接口]([https://git.imooc.com/class-70/toimc-api](https://git.imooc.com/class-70/toimc-admin))、[toimc社区-Webapp]([https://git.imooc.com/class-70/toimc-webapp](https://git.imooc.com/class-70/toimc-webapp))、[toimc社区-小程序(wxapp)]([https://git.imooc.com/class-70/toimc-wxapp](https://git.imooc.com/class-70/toimc-wxapp))

本项目为[toimc社区-Web前端]([https://git.imooc.com/class-70/toimc-front](https://git.imooc.com/class-70/toimc-front))，采用Vue3.0+Layui，通过完整的通用社区业务闭环，实践企业级开发流程(需求-设计-开发-部署-自动化)，渐进式前端学习路径，走向全栈开发。



**项目演示地址**： [http://front.dev.toimc.com:22500/](http://front.dev.toimc.com:22500/)  

或扫描二维码

![](http://img.windrise.com.cn/562c0cf7-2e1c-408c-874e-3540a694cd5b.png)

项目效果展示：

![](http://img.windrise.com.cn/107f4695-b11f-4421-a936-8ff61ae71f3d.png)



## 项目亮点

1. 前端工程化落地实践
2. 缺陷管理（代码质量）
3. 版本控制流程全GET
4. JWT鉴权设计，HTTPS、加密解密概念
5. 接口Mock+真实接口开发
6. 常用中间件封装（redis、mongo数据库、websocket、axios）
7. 组件化进阶（Vue插件、自定义组件）



## 核心模块

### 登录鉴权

* JWT登录设计
* 登录输入校验
* 用户密码bcrypt加密与解密
* 封装Axios请求
* Vue自定义组件
* SVG图片验证码及Redis缓存机制
* 注册接口Mock及对接
* 代码格式化及Prettier配置![](http://img.windrise.com.cn/abbdd643-c6df-470c-ada4-1c2ba179e257.jpg)



### 首页设计

* 前端项目依赖升级解决方案
* 前端项目版本控制
* 需求分析、接口设计
* 响应式原理
* 长列表筛选、排序、异步加载
* Axios拦截器及取消重复请求
* vue路由监听
* 代码质量之ESLint规则扩展
* 侧栏设计：温馨提醒、广告、友链
* 自定义全局filter、directives
* Nuxt.js服务端渲染
  ![](http://img.windrise.com.cn/107f4695-b11f-4421-a936-8ff61ae71f3d.png)



### 个人中心

* 栅格系统及Flex布局
* 头像图片上传、静态资源访问
* 自定义IconFont图标库
* Sass译进阶设计通用工具类
* 签到倒计时dayjs库
* VueRouter路由守卫用户状态维护
* 签到榜Tabs切换交互
* 多级子路由交互
* 确认邮件跳转页面（node-mailer）![](http://img.windrise.com.cn/d81e94c3-5375-4af1-a660-ee82493ed79f.jpg)



### 发贴编辑

* 自定义富文本编辑器
* 编辑预览
* 文章管理由权限控制
* 按钮级权限控制
* 动态路由设计
* 创建项目容器化配置Dockerfile
* 添加路由404页面
  ![](http://img.windrise.com.cn/4b2d49f1-dbe1-437b-91c6-30ac54338d0e.jpg)



### 实时、历史消息、服务端渲染

* Websocket客户端、服务端
* Websocket断线重连
* 历史消息缓存
* 实时消息通知
* Vue-CLI配置解读



## 项目进阶体系

![](http://img.windrise.com.cn/7598b4d5-a68b-4753-b2eb-db76f2d23715.png)



## 项目开发指南

> 基础环境： Node.js 8.9 或更高版本 (推荐 8.11.0+)

### 从Git仓库拉取代码 

```
git clone https://git.imooc.com/class-70/toimc-front.git
```

### 安装依赖

```
npm install
```

### 运行服务

```
npm run server
```

项目需配合[toimc社区-数据后台接口]([https://git.imooc.com/class-70/toimc-api](https://git.imooc.com/class-70/toimc-admin))的后台接口服务，等待服务运行起来后访问：http://localhost:3001

### 构建项目代码

```
npm run build
```

### 格式化代码

```
npm run lint
```
