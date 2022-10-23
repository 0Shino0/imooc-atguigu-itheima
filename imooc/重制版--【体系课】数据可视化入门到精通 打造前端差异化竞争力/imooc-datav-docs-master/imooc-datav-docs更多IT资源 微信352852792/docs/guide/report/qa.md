# 常见问题

## vue create 失败

npm 安装有可能会导致失败，建议加上淘宝镜像：

```bash
vue create imooc-datav-report-dev --registry=https://registry.npm.taobao.org
```

## ECharts 绘图后没有图像

ECharts 绘图后没有任何报错，但是没有图像。可以检查容器是否设置了宽高。因为 ECharts 不会设置默认宽高，如果容器没有设置宽高，则不会展示：

```html
<div id="total-orders-chart" :style="{ width: '100%', height: '100%' }" />
```
