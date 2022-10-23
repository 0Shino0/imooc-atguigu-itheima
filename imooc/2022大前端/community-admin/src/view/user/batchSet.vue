<template>
  <div>
    <Modal
      v-model="showStatus"
      title="批量设置"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Form :model="localItem" :label-width="80" ref="table">
        <FormItem label="角色">
          <Select v-model="localItem.roles" multiple>
            <Option
              v-for="(item, index) in roles"
              :value="item.role"
              :key="'roles-' + index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否禁用">
          <RadioGroup v-model="localItem.status">
            <Radio label>不设置</Radio>
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否是VIP">
          <RadioGroup v-model="localItem.isVip">
            <Radio label>不设置</Radio>
            <Radio label="0">否</Radio>
            <Radio label="1">是</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    isShow() {
      this.showStatus = this.isShow
    }
  },
  data() {
    return {
      showStatus: false,
      localItem: {
        status: '',
        isVip: '',
        roles: ['user']
      }
    }
  },
  methods: {
    ok() {
      // this.$refs.table.resetFields()
      this.$emit('changeEvent', false)
      const result = {}
      for (var key of Object.keys(this.localItem)) {
        if (this.localItem[key] !== '') {
          result[key] = this.localItem[key]
        }
      }
      this.$emit('editEvent', result)
      this.$Message.info('设置成功！')
    },
    cancel() {
      this.$refs.table.resetFields()
      this.$emit('changeEvent', false)
      this.$Message.info('取消设置！')
    }
  }
}
</script>
