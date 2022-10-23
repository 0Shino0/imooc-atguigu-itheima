<script setup lang="ts">
  import { useCounterStore } from './store'

  const store = useCounterStore()
</script>

<template> hello pinia vite prettier eslint: {{ store.count }} </template>

<style></style>
