<template>
  <div>
    <Row>
      <i-col span="24">
        <p>请求路径：{{ row.path }} - {{ row.method }} - {{ row.code }}</p>
        <br />
        <p>请求参数：{{ row.param }}</p>
      </i-col>
      <i-col span="24">
        <br />
        <p>Stack:</p>
        <p>{{ row.stack }}</p>
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
  }
}
</script>

<style lang="scss" scoped></style>
