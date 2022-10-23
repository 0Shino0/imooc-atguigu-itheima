<template>
  <img alt="Vue logo" src="@/assets/img/logo1.png" />
  <div class="test"></div>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss" scoped>
.test {
  background: url("@/assets/img/logo1.png") no-repeat center center;
  width: 100px;
  height: 100px;
  background-size: contain;
}
</style>