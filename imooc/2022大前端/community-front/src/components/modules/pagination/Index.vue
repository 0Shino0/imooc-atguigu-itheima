<template>
  <div class="d-flex" :class="{'flex-center': align==='center', 'flex-start': align === 'left', 'flex-end': align === 'right'}">
    <div class="layui-box layui-laypage layui-laypage-default">
      <a href="javascript:;" class="layui-laypage-prev" :class="{'layui-disabled': current === 0}" v-show="showEnd" @click.prevent="home()">
        <i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <a :class="{'layui-disabled': current === 0}" @click.prevent="prev()">
        <i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- current + 2 < pages.length 显示 ... -->
      <!-- current - 2 > 1 显示 ... -->
      <a v-if="pages.length > 5 && (current + 1 - 2) > 1" href="javascript:;" class="layui-disabled">...</a>
      <template v-for="(item,index) in pages">
        <a @click="changeIndex(index)" v-if="(item>=(current + 1 - 2) && item <=(current + 1 + 2)) || (current  < 2 && item <= dist) || (current > pages.length - dist + 1 && item > pages.length - dist)" href="javascript:;" :key="'page' + index" :class="[current === index ? theme : '',current === index ? 'active': '']">{{item}}</a>
      </template>
      <a v-if="pages.length > 5 && (current + 1 + 2) < pages.length" href="javascript:;" class="layui-disabled">...</a>
      <a :class="{'layui-disabled': current === pages.length - 1}" @click.prevent="next()">
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <a href="javascript:;" class="layui-laypage-next" v-show="showEnd" :class="{'layui-disabled': current === pages.length - 1}" @click.prevent="end()">
        <i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第
      <input type="text" class="imooc-input text-center" @keyup.enter="jumpTo" />
      页 共 {{totalPages}} 页
    </div>
    <div v-if="hasSelect">
      <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelect}" @click="changeFav()">
        <div class="layui-select-title">
          <input type="text" placeholder="请选择" readonly v-model="options[optIndex]" class="layui-input layui-unselect" />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd v-for="(item,index) in options" :key="'catalog' + index" @click="chooseFav(item, index)" :class="{'layui-this': index === optIndex}">{{item}}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    align: {
      type: String,
      default: 'center'
    },
    showType: {
      type: String,
      default: 'icon'
    },
    showEnd: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'layui-bg-green'
    },
    hasTotal: {
      type: Boolean,
      default: false
    },
    hasSelect: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    },
    dist: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      isSelect: false,
      optIndex: 0,
      options: [10, 20, 30, 50, 100],
      pages: [],
      limit: 10
    }
  },
  watch: {
    total (newval, oldval) {
      this.initPages()
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.limit)
    }
  },
  mounted () {
    // 初始化分页的长度
    // 设置select的内容
    this.limit = this.size
    this.initPages()
    this.options = _.uniq(_.sortBy(_.concat(this.options, this.size)))
    this.optIndex = this.options.indexOf(this.size)
  },
  methods: {
    initPages () {
      const len = this.totalPages
      // 5 -> [1,2,3,4,5]
      this.pages = _.range(1, len + 1)
    },
    chooseFav (item, index) {
      if (this.optIndex !== index) {
        // 当页面上的limit发生变化之后，调整current数值
        this.$emit('changeCurrent', Math.floor(this.limit * this.current / this.options[index]))
        this.$emit('changeLimit', this.options[index])
      }
      this.optIndex = index
      this.limit = this.options[this.optIndex]
      this.initPages()
    },
    changeFav () {
      this.isSelect = !this.isSelect
    },
    home () {
      if (this.current === 0) return
      this.$emit('changeCurrent', 0)
    },
    end () {
      if (this.pages.length - 1 === this.current) return
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    prev () {
      let cur = 0
      if (this.current === 0) return
      if (this.current - 1 <= 0) {
        cur = 0
      } else {
        cur = this.current - 1
      }
      this.$emit('changeCurrent', cur)
    },
    next () {
      if (this.pages.length - 1 === this.current) return
      let cur = 0
      if (this.current + 1 >= this.pages.length) {
        cur = this.pages.length - 1
      } else {
        cur = this.current + 1
      }
      this.$emit('changeCurrent', cur)
    },
    changeIndex (val) {
      if (val !== this.current) {
        this.$emit('changeCurrent', val)
      }
    },
    jumpTo (event) {
      const result = event.target.value
      let cur = this.current
      if (result > this.total || result < 0) {
        this.$pop('shake', '请输入正确的页码')
      } else {
        cur = result - 1
      }
      if (cur !== this.current) {
        this.$emit('changeCurrent', cur)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    // &:first-child {
    //   border-right: 0;
    // }
    // &:last-child {
    //   border-left: 0;
    // }
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
  .layui-bg-green {
    border-color: #009688;
  }
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.imooc-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 28px;
  line-height: 28px;
}

.layui-input {
  height: 30px;
  line-height: 30px;
}

.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
