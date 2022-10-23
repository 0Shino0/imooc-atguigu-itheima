<template>
  <li class="list-box" @click="showDetail(item._id)">
    <div class="list-head">
      <div class="title">
        <span class="type" :class="['type-'+item.catalog]">{{item.catalog | catalogFilter}}</span>
        <span class="ellipsis">{{item.title}}</span>
      </div>
    </div>
    <div class="author">
      <div class="inline-block" @click.stop="showUser(item.uid._id)">
        <img class="head" :src="item.uid.pic || '/img/bear-200-200.jpg'" alt />
        <span class="name">{{item.uid.name || '未知用户'}}</span>
        <i class="vip" v-show="item.uid.isVip !== '0'">VIP{{item.uid.isVip}}</i>
      </div>
    </div>
    <div class="list-body">
      <div class="info">{{item.content}}</div>
      <img class="fmt" :src="item.snapshot" v-show="item.snapshot" />
    </div>
    <div class="list-footer">
      <div class="left">
        <span class="reply-num">{{item.answer}} 回复</span>
        <span class="timer">{{item.created | moment}}</span>
      </div>
    </div>
  </li>
</template>

<script>
const CATALOG_TYPE = {
  share: '分享',
  ask: '提问',
  discuss: '讨论',
  advise: '建议'
}
export default {
  name: 'list-item',
  props: ['item'],
  methods: {
    showUser (id) {
      this.$emit('on-show-user', id)
    },
    showDetail (id) {
      this.$emit('on-show-detail', id)
    }
  },
  filters: {
    catalogFilter (v) {
      return CATALOG_TYPE[v]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './listitem.scss';
</style>
