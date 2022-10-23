<template>
  <div>
    <ul class="fly-list">
      <li v-for="item in items" :key="item._id">
        <template v-if="item.uid">
          <!-- todo -->
          <a
            class="fly-avatar"
            :to="{ name: 'home', params: { uid: item.uid ? item.uid._id : '' } }"
            link
          >
            <img :src="item.uid ? item.uid.pic : '/img/header.jpg'" alt="贤心" />
          </a>
          <h2>
            <a class="layui-badge">{{ item.catalog }}</a>
            <!-- todo -->
            <router-link :to="{ name: 'detail', params: { tid: item._id } }">{{
              item.title
            }}</router-link>
          </h2>
          <div class="fly-list-info">
            <!-- todo -->
            <a :to="{ name: 'home', params: { uid: item.uid._id } }" link>
              <cite>{{ item.uid.name }}</cite>
              <!--<i class="iconfont icon-renzheng" title="认证信息：XXX"></i>-->
              <i v-if="item.uid.isVip !== '0'" class="layui-badge fly-badge-vip">{{
                'VIP' + item.uid.isVip
              }}</i>
            </a>
            <span>{{ formatDate(item.created) }}</span>

            <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">
              <i class="iconfont icon-kiss"></i>
              {{ item.fav }}
            </span>
            <span v-show="item.status !== '0'" class="layui-badge fly-badge-accept layui-hide-xs"
              >已结</span
            >
            <span class="fly-list-nums">
              <i class="iconfont icon-pinglun1" title="回答"></i>
              {{ item.answer }}
            </span>
          </div>
          <div v-show="item.tags.length > 0 && item.tags[0].name !== ''" class="fly-list-badge">
            <span
              v-for="(tag, index) in item.tags"
              :key="'tag' + index"
              class="layui-badge"
              :class="tag.class"
              >{{ tag.name }}</span
            >
          </div>
        </template>
      </li>
    </ul>
    <div v-show="isShow" style="text-align: center">
      <div v-if="!isEnd" class="laypage-main">
        <a class="laypage-next" @click.prevent="more()">更多求解</a>
      </div>
      <div v-else class="nomore gray">没有更多了</div>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '@/utils/formatDate'

  import { defineComponent } from 'vue'

  // moment.extend(relativeTime)

  // import _ from 'lodash'
  export default defineComponent({
    name: 'ListItem',
    props: {
      lists: {
        default: () => [],
        type: Array
      },
      isShow: {
        default: true,
        type: Boolean
      },
      isEnd: {
        default: false,
        type: Boolean
      }
    },
    emits: ['nextpage'],
    setup(props, { emit }) {
      // console.log('setup -> props', props)
      const more = () => {
        emit('nextpage')
      }
      return {
        more,
        formatDate
      }
    },
    computed: {
      items() {
        this.lists.map((item) => {
          switch (item.catalog) {
            case 'ask':
              item.catalog = '提问'
              break
            case 'share':
              item.catalog = '分享'
              break
            case 'logs':
              item.catalog = '动态'
              break
            case 'notice':
              item.catalog = '公告'
              break
            case 'advise':
              item.catalog = '建议'
              break
            case 'discuss':
              item.catalog = '交流'
              break
          }
        })
        return this.lists
      }
    }
  })
</script>

<style lang="scss" scoped>
  .nomore {
    font-size: 16px;
    padding: 30px 0;
  }
</style>
