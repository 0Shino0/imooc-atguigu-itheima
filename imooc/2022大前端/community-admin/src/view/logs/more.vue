<template>
  <div>
    <Row type="flex" align="middle">
      <i-col class="overtext" span="18">{{ row.content }}</i-col>
      <i-col span="6">
        <a @click="more()" style="padding-left:6px;">更多>></a>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    more() {
      this.$Modal.info({
        title: '详情',
        // content: JSON.stringify(this.row.param),
        render: (h, params) => {
          return h('Input', {
            props: {
              // disabled: true,
              type: 'textarea',
              value: JSON.stringify(this.row.param, null, 2),
              rows: 16
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.overtext {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
