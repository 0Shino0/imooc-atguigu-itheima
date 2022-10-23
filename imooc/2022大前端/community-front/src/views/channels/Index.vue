<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <imooc-top></imooc-top>
        <imooc-list></imooc-list>
      </div>
      <div class="layui-col-md4">
        <imooc-tips></imooc-tips>
        <imooc-sign></imooc-sign>
        <imooc-hotlist></imooc-hotlist>
        <imooc-ads></imooc-ads>
        <imooc-links></imooc-links>
      </div>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import List from '@/components/contents/List'
import Top from '@/components/contents/Top'
export default {
  name: 'index',
  components: {
    'imooc-tips': Tips,
    'imooc-sign': Sign,
    'imooc-hotlist': HotList,
    'imooc-ads': Ads,
    'imooc-links': Links,
    'imooc-list': List,
    'imooc-top': Top
  }
}
</script>

<style lang="scss" scoped>
</style>
