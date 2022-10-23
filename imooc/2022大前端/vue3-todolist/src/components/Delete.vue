<template>
  <ul class="list-group">
    <li
      class="list-group-item d-flex align-item-center justify-content-between"
      v-for="item in deletes"
      :key="item.id"
    >
      {{ item.text }}
    </li>
  </ul>
  <button
    class="btn btn-danger float-right mt-4"
    type="button"
    @click="clear(TodoItemState.DELETE)"
  >
    清除所有
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { utils } from '@/common/utils'

export default defineComponent({
  setup () {
    const {
      clear,
      TodoItemState
    } = utils()
    return {
      clear,
      TodoItemState
    }
  },
  computed: {
    ...mapGetters(['deletes'])
  }
})
</script>

<style scoped>
</style>
