# 组件库初始化

## 项目初始化

```bash
npm init -y
```

## rollup配置

对于 rollup 入门可以参考我在慕课网发布的系列手记：

- 第一篇：[10分钟快速入门rollup.js](https://www.imooc.com/article/262083)
- 第二篇：[10分钟快速进阶rollup.js](https://www.imooc.com/article/263597)
- 第三篇：[10分钟快速精通rollup.js——Vue.js源码打包原理深度分析](https://www.imooc.com/article/264074)

课程将直接进入实战环节

::: tip
为什么要入门 rollup？
- React 用 rollup 打包
- Vue 用 rollup 打包
:::

### rollup 开发模式

```bash
rollup -wc rollup.config.dev.js
```

### rollup 构建模式

```bash
rollup -wc rollup.config.prod.js
```

### rollup 按需加载

直接引用使用的组件即可，这样在 build 时不会将整个组件库打包

> 注意：需要 babel 支持，参考：https://element.eleme.cn/#/zh-CN/component/quickstart

## eslint 配置

eslint 初始化

```bash
npm i -D eslint
./node_modules/.bin/eslint --init
```

配置 eslint 脚本

```json
{
  "lint": "eslint"
}
```

> 注：eslint 无需全局安装

## npm 发布

```bash
npm login
npm publish
```

::: tip
如果使用 @group/npmName 这种发布时，请注意是否有 @group 发布权限，如果没有，可以创建 @group 后再发布，建议个人用户不要用 @group/npmName 这种格式 
:::

## 组件库调试

本地调试

```bash
npm link
npm link imooc-datav-libs
```
