<template>
  <MenuHeader />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import MenuHeader from './components/MenuHeader.vue';
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>