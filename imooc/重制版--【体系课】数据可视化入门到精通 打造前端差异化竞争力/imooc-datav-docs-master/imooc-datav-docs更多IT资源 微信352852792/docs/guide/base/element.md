# Element-UI 入门

## 简介

- 饿了么开源组件库
- github 4w+ star

> 访问[官网](https://element.eleme.cn/#/zh-CN/component/installation)
>
## 基本用法

1. 初始化项目

```bash
vue create element-test
```

2. 安装
```bash
npm i element-ui -S
```

3. Vue 插件

```js
import ElementUI from 'element-ui'

Vue.use(ElementUI)
```

4. 引用样式

```js
import 'element-ui/lib/theme-chalk/index.css'
```

5. element-ui 案例

```html
<template>
  <div id="app">
    <el-button @click="show">点我</el-button>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    show() {
      this.$message.success('Toast from element-ui')
    }
  }
}
</script>
```

## 按需加载

对项目进行打包：
```bash
npm run build
```

发现 vendors 库高达 789KB
```bash
-rw-r--r--  1 sam  staff   789518 10 27 20:40 chunk-vendors.cd583f5b.js
```

这是由于我们未使用按需加载，所以对 element-ui 进行全量打包的结果，按需加载的用法如下：

1. 安装 babel-plugin-component

```bash
npm install babel-plugin-component -D
```

2. 修改 babel.config.js：
```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

3. 按需引入 Button 和 Message

```js
import { Button, Message } from 'element-ui'

Vue.component(Button.name, Button)
Vue.prototype.$message = Message
```

:::tip
style 引用可以去掉
:::

重新构建，vendors 体积减小到 113KB
```bash
-rw-r--r--  1 sam  staff  113282 10 27 20:50 chunk-vendors.3d7d02b2.js
```

## 插件引用

可以通过 element 插件快速集成 element-ui
```bash
vue add element
```

## 表单基本用法

1. el-form 容器，通过 model 绑定数据
2. el-form-item 容器，通过 label 绑定标签
3. 表单组件通过 v-model 绑定 model 中的数据

```html
<template>
  <div id="app">
    <el-form inline :model="data">
      <el-form-item label="审批人">
        <el-input v-model="data.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="data.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      data: {
        user: 'sam',
        region: '区域二'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.data)
    }
  }
}
</script>
```

## 表单校验基本用法

1. 定义校验规则，可以绑定到 el-form 或 el-form-item
```js
data() {
  const userValidator = (rule, value, callback) => {
    if (value.length > 3) {
      callback()
    } else {
      callback(new Error('用户名长度必须大于3'))
    }
  }
  return {
    data: {
      user: 'sam',
      region: '区域二'
    },
    rules: {
      user: [
        { required: true, trigger: 'change', message: '用户名必须录入' },
        { validator: userValidator, trigger: 'change' }
      ]
    }
  }
}
```

2. 指定 el-form-item 的 prop 属性
```html
<el-form-item label="审批人" prop="user">
  <el-input v-model="data.user" placeholder="审批人" clearable></el-input>
</el-form-item>
```

### 表单校验相关属性

- hide-required-asterisk：隐藏必录标识
- inline-message：验证消息是否在一行显示

## 表单校验高级用法

### 用法一：动态改变校验规则

1. rules 只包含一个校验规则
```js
{
  rules: {
      user: [
        { required: true, trigger: 'change', message: '用户名必须录入' },
      ]
  }
}
```

2. 动态添加 rules

```js
addRule() {
    const userValidator = (rule, value, callback) => {
      if (value.length > 3) {
        this.inputError = ''
        this.inputValidateStatus = ''
        callback()
      } else {
        callback(new Error('用户名长度必须大于3'))
      }
    }
    const newRule = [
      ...this.rules.user,
      { validator: userValidator, trigger: 'change' }
    ]
    this.rules = Object.assign({}, this.rules, { user: newRule })
}
```

### 用法二：手动控制校验状态

::: tip
- validate-status：验证状态，枚举值，共四种：
    - success：验证成功
    - error：验证失败
    - validating：验证中
    - (空)：未验证
- error：自定义错误提示
:::

1. 设置 el-form-item 属性
```html
<el-form-item
  label="用户名"
  prop="user"
  :error="error"
  :validate-status="status"
>
<!-- ... -->
</el-form-item>
```

2. 自定义 status 和 error
```js
showError() {
  this.status = 'error'
  this.error = '用户名输入有误'
},
showSuccess() {
  this.status = 'success'
  this.error = ''
},
showValidating() {
  this.status = 'validating'
  this.error = ''
}
```

## 表单属性解析

- label-position：标签位置，枚举值，left 和 top
- label-width：标签宽度
- label-suffix：标签后缀
- inline：行内表单
- disabled: 设置整个 form 中的表单组件全部 disabled，优先级低于表单组件自身的 disabled

```js
/* el-input 源码 */
inputDisabled() {
  return this.disabled || (this.elForm || {}).disabled;
}
```

- size：设置表单组件尺寸

```js
/* el-input */
inputSize() {
  return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
},
_elFormItemSize() {
  return (this.elFormItem || {}).elFormItemSize;
}
/* el-form-item */
elFormItemSize() {
  return this.size || this._formSize;
},
_formSize() {
  return this.elForm.size;
}
```

## 案例
```html
<template>
  <div id="app">
    <el-form
        :model="data"
        style="width: 500px"
        label-position="left"
        label-width="100px"
        label-suffix="："
        :inline="false"
        :rules="rules"
        :disabled="false"
        status-icon
        validate-on-rule-change
        hide-required-asterisk
        :inline-message="false"
    >
      <el-form-item
          label="用户名"
          prop="user"
          :error="error"
          :validate-status="status"
      >
        <el-input v-model="data.user" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="data.region" placeholder="活动区域" style="width:100%">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addRule">添加校验规则</el-button>
        <el-button @click="showError">错误状态</el-button>
        <el-button @click="showSuccess">正确状态</el-button>
        <el-button @click="showValidating">验证状态</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        data: {
          user: 'sam',
          region: '区域二'
        },
        error: '',
        status: '',
        rules: {
          user: [
            { required: true, trigger: 'change', message: '用户名必须录入' }
          ]
        }
      }
    },
    methods: {
      /* eslint-disable */
      onSubmit() {
        console.log(this.data)
      },
      addRule() {
        const userValidator = (rule, value, callback) => {
          if (value.length > 3) {
            this.inputError = ''
            this.inputValidateStatus = ''
            callback()
          } else {
            callback(new Error('用户名长度必须大于3'))
          }
        }
        const newRule = [
          ...this.rules.user,
          { validator: userValidator, trigger: 'change' }
        ]
        this.rules = Object.assign({}, this.rules, { user: newRule })
      },
      showError() {
        this.status = 'error'
        this.error = '用户名输入有误'
      },
      showSuccess() {
        this.status = 'success'
        this.error = ''
      },
      showValidating() {
        this.status = 'validating'
        this.error = ''
      }
    }
  }
</script>
```
